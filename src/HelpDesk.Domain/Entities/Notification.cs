using System;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class Notification : BaseEntity
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public Guid? ReferenceId { get; set; }
        public DateTime? ReadAt { get; set; }
    }
}
