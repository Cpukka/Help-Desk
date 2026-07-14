using System;
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
        public Guid RoleId { get; set; }
    }
}
