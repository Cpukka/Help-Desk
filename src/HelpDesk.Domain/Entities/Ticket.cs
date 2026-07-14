using System;
using HelpDesk.Domain.Common;
using HelpDesk.Domain.Enums;

namespace HelpDesk.Domain.Entities
{
    public class Ticket : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TicketStatus Status { get; set; }
        public Priority Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public SLAStatus? SLAStatus { get; set; }
        public DateTime? SLAThreshold { get; set; }
        public bool IsEscalated { get; set; }
        public int EscalationLevel { get; set; }
        
        // Foreign keys only - no navigation properties
        public Guid CreatedById { get; set; }
        public Guid? AssignedToId { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? SubCategoryId { get; set; }
    }
}
