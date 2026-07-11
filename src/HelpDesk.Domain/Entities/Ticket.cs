using System;
using System.Collections.Generic;
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
        
        public Guid CreatedById { get; set; }
        public virtual User CreatedBy { get; set; } = null!;
        public Guid? AssignedToId { get; set; }
        public virtual User? AssignedTo { get; set; }
        public Guid? DepartmentId { get; set; }
        public virtual Department? Department { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? SubCategoryId { get; set; }
        
        public virtual ICollection<TicketComment> Comments { get; set; } = new List<TicketComment>();
        public virtual ICollection<TicketAttachment> Attachments { get; set; } = new List<TicketAttachment>();
        public virtual ICollection<TicketHistory> History { get; set; } = new List<TicketHistory>();
    }
}
