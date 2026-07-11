using System;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class TicketHistory : BaseEntity
    {
        public Guid TicketId { get; set; }
        public virtual Ticket Ticket { get; set; } = null!;
        public Guid ChangedBy { get; set; }
        public virtual User User { get; set; } = null!;
        public string FieldName { get; set; } = string.Empty;
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
        public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    }
}
