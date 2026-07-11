using System;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class TicketAttachment : BaseEntity
    {
        public Guid TicketId { get; set; }
        public virtual Ticket Ticket { get; set; } = null!;
        public string FileName { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public long FileSize { get; set; }
        public string? ContentType { get; set; }
        public Guid UploadedById { get; set; }
        public virtual User UploadedBy { get; set; } = null!;
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
