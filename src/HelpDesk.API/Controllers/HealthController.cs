using Microsoft.AspNetCore.Mvc;
using HelpDesk.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HealthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(new 
            { 
                status = "Healthy", 
                timestamp = DateTime.UtcNow,
                message = "Help Desk API is running!"
            });
        }

        [HttpGet("database")]
        public async Task<IActionResult> TestDatabase()
        {
            try
            {
                var roleCount = await _context.Roles.CountAsync();
                var departmentCount = await _context.Departments.CountAsync();
                var permissionCount = await _context.Permissions.CountAsync();

                return Ok(new
                {
                    success = true,
                    message = "Database connection successful!",
                    data = new
                    {
                        roles = roleCount,
                        departments = departmentCount,
                        permissions = permissionCount
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Database connection failed!",
                    error = ex.Message
                });
            }
        }
    }
}
