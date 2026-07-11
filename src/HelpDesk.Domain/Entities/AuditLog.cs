using System;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class AuditLog : BaseEntity
    {
        public Guid? UserId { get; set; }
        public virtual User? User { get; set; }
        public string Action { get; set; } = string.Empty;
        public string EntityType { get; set; } = string.Empty;
        public Guid? EntityId { get; set; }
        public string? Changes { get; set; }
        public string? IPAddress { get; set; }
        public string? UserAgent { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
