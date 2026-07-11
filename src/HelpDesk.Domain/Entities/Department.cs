using System;
using System.Collections.Generic;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Guid? ManagerId { get; set; }
        // Comment out the navigation property for now
        // public virtual User? Manager { get; set; }
        public virtual ICollection<User> Users { get; set; } = new List<User>();
        public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
