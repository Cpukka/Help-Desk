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
                    .Include(t => t.CreatedBy)
                    .Include(t => t.AssignedTo)
                    .OrderByDescending(t => t.CreatedAt)
                    .Select(t => new
                    {
                        t.Id,
                        t.Title,
                        t.Description,
                        Status = t.Status.ToString(),
                        Priority = t.Priority.ToString(),
                        t.CreatedAt,
                        AssignedTo = t.AssignedTo != null ? t.AssignedTo.FirstName + " " + t.AssignedTo.LastName : "Unassigned",
                        CreatedBy = t.CreatedBy.FirstName + " " + t.CreatedBy.LastName
                    })
                    .ToListAsync();

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
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
    }
}
