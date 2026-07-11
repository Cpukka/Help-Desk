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

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Find user by email
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Verify password
            var hashedPassword = HashPassword(request.Password, user.Salt);
            if (user.PasswordHash != hashedPassword)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Generate simple token (in production, use JWT)
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
                    Role = user.Role?.Name
                }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // Check if user exists
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email already registered" });
            }

            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return BadRequest(new { message = "Username already taken" });
            }

            // Get default role (Employee)
            var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Employee");
            if (defaultRole == null)
            {
                return BadRequest(new { message = "Default role not found" });
            }

            // Hash password
            var salt = GenerateSalt();
            var passwordHash = HashPassword(request.Password, salt);

            // Create user
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
