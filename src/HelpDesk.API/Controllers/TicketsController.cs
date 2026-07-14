using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HelpDesk.Infrastructure.Data;
using HelpDesk.Domain.Entities;
using HelpDesk.Domain.Enums;

namespace HelpDesk.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TicketsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            try
            {
                var tickets = await _context.Tickets
                    .OrderByDescending(t => t.CreatedAt)
                    .Select(t => new
                    {
                        t.Id,
                        t.Title,
                        t.Description,
                        Status = t.Status.ToString(),
                        Priority = t.Priority.ToString(),
                        t.CreatedAt,
                        t.AssignedToId,
                        t.CreatedById,
                        t.DepartmentId
                    })
                    .ToListAsync();

                if (tickets == null || !tickets.Any())
                {
                    return Ok(new List<object>());
                }

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stack = ex.StackTrace });
            }
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            try
            {
                var totalTickets = await _context.Tickets.CountAsync();
                var openTickets = await _context.Tickets
                    .CountAsync(t => t.Status != TicketStatus.Closed && t.Status != TicketStatus.Resolved);
                var closedTickets = await _context.Tickets
                    .CountAsync(t => t.Status == TicketStatus.Closed || t.Status == TicketStatus.Resolved);

                return Ok(new
                {
                    totalTickets,
                    openTickets,
                    closedTickets,
                    responseTime = "2.4h"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicketById(Guid id)
        {
            try
            {
                var ticket = await _context.Tickets
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (ticket == null)
                {
                    return NotFound(new { message = "Ticket not found" });
                }

                return Ok(new
                {
                    ticket.Id,
                    ticket.Title,
                    ticket.Description,
                    Status = ticket.Status.ToString(),
                    Priority = ticket.Priority.ToString(),
                    ticket.CreatedAt,
                    ticket.DueDate,
                    ticket.AssignedToId,
                    ticket.CreatedById
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] CreateTicketRequest request)
        {
            try
            {
                // Get the first user as creator (for testing)
                var user = await _context.Users.FirstOrDefaultAsync();
                if (user == null)
                {
                    return BadRequest(new { message = "No user found" });
                }

                var ticket = new Ticket
                {
                    Id = Guid.NewGuid(),
                    Title = request.Title,
                    Description = request.Description,
                    Status = TicketStatus.New,
                    Priority = request.Priority,
                    CreatedById = user.Id,
                    DepartmentId = request.DepartmentId,
                    DueDate = request.DueDate,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.Tickets.AddAsync(ticket);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Ticket created successfully",
                    ticketId = ticket.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(Guid id, [FromBody] UpdateTicketRequest request)
        {
            try
            {
                var ticket = await _context.Tickets.FindAsync(id);
                if (ticket == null)
                {
                    return NotFound(new { message = "Ticket not found" });
                }

                if (!string.IsNullOrEmpty(request.Title))
                    ticket.Title = request.Title;
                
                if (!string.IsNullOrEmpty(request.Description))
                    ticket.Description = request.Description;
                
                if (request.Status.HasValue)
                    ticket.Status = request.Status.Value;
                
                if (request.Priority.HasValue)
                    ticket.Priority = request.Priority.Value;

                ticket.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Ticket updated successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            try
            {
                var ticket = await _context.Tickets.FindAsync(id);
                if (ticket == null)
                {
                    return NotFound(new { message = "Ticket not found" });
                }

                _context.Tickets.Remove(ticket);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Ticket deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class CreateTicketRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Priority Priority { get; set; } = Priority.Medium;
        public Guid? DepartmentId { get; set; }
        public DateTime? DueDate { get; set; }
    }

    public class UpdateTicketRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public TicketStatus? Status { get; set; }
        public Priority? Priority { get; set; }
    }
}
