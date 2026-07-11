using System;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class TicketComment : BaseEntity
    {
        public Guid TicketId { get; set; }
        public virtual Ticket Ticket { get; set; } = null!;
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public string Content { get; set; } = string.Empty;
        public bool IsInternal { get; set; }
    }
}
