using System;
using System.Collections.Generic;
using HelpDesk.Domain.Common;

namespace HelpDesk.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public bool IsEmailVerified { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        
        public Guid? DepartmentId { get; set; }
        public virtual Department? Department { get; set; }
        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; } = null!;
        
        public virtual ICollection<Ticket> CreatedTickets { get; set; } = new List<Ticket>();
        public virtual ICollection<Ticket> AssignedTickets { get; set; } = new List<Ticket>();
        public virtual ICollection<TicketComment> Comments { get; set; } = new List<TicketComment>();
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
