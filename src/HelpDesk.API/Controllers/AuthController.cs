using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using HelpDesk.Infrastructure.Data;
using HelpDesk.Domain.Entities;

namespace HelpDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ApplicationDbContext context, ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                _logger.LogInformation($"Login attempt for: {request.Email}");

                var user = await _context.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null)
                {
                    _logger.LogWarning($"User not found: {request.Email}");
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                var hashedPassword = HashPassword(request.Password, user.Salt);
                if (user.PasswordHash != hashedPassword)
                {
                    _logger.LogWarning($"Invalid password for: {request.Email}");
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

                return Ok(new
                {
                    accessToken = token,
                    refreshToken = token,
                    expiresAt = DateTime.UtcNow.AddHours(24),
                    user = new
                    {
                        user.Id,
                        user.Email,
                        user.Username,
                        user.FirstName,
                        user.LastName,
                        user.RoleId,
                        Role = user.Role?.Name ?? "User"
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Login error for: {request.Email}");
                return StatusCode(500, new { message = "An error occurred during login", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                _logger.LogInformation($"Registration attempt for: {request.Email}");

                if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                {
                    return BadRequest(new { message = "Email already registered" });
                }

                if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                {
                    return BadRequest(new { message = "Username already taken" });
                }

                var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Employee");
                if (defaultRole == null)
                {
                    return BadRequest(new { message = "Default role not found" });
                }

                var salt = GenerateSalt();
                var passwordHash = HashPassword(request.Password, salt);

                var user = new User
                {
                    Id = Guid.NewGuid(),
                    Email = request.Email,
                    Username = request.Username,
                    PasswordHash = passwordHash,
                    Salt = salt,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    RoleId = defaultRole.Id,
                    IsActive = true,
                    IsEmailVerified = false,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"User registered successfully: {request.Email}");

                return Ok(new
                {
                    message = "Registration successful",
                    user = new
                    {
                        user.Id,
                        user.Email,
                        user.Username,
                        user.FirstName,
                        user.LastName
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Registration error for: {request.Email}");
                return StatusCode(500, new { message = "An error occurred during registration", error = ex.Message });
            }
        }

        private static string GenerateSalt()
        {
            var saltBytes = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltBytes);
            }
            return Convert.ToBase64String(saltBytes);
        }

        private static string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combined = Encoding.UTF8.GetBytes(password + salt);
                var hash = sha256.ComputeHash(combined);
                return Convert.ToBase64String(hash);
            }
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
