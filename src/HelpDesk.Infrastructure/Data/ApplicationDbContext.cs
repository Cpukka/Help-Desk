using Microsoft.EntityFrameworkCore;
using HelpDesk.Domain.Entities;

namespace HelpDesk.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketComment> TicketComments { get; set; }
        public DbSet<TicketAttachment> TicketAttachments { get; set; }
        public DbSet<TicketHistory> TicketHistory { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // RolePermission - Composite Primary Key
            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            // Comment out the problematic relationships for now
            // Department - Manager relationship (commented out)
            // modelBuilder.Entity<Department>()
            //     .HasOne(d => d.Manager)
            //     .WithMany()
            //     .HasForeignKey(d => d.ManagerId)
            //     .OnDelete(DeleteBehavior.SetNull);

            // Ticket relationships (commented out)
            // modelBuilder.Entity<Ticket>()
            //     .HasOne(t => t.CreatedBy)
            //     .WithMany(u => u.CreatedTickets)
            //     .HasForeignKey(t => t.CreatedById)
            //     .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<Ticket>()
            //     .HasOne(t => t.AssignedTo)
            //     .WithMany(u => u.AssignedTickets)
            //     .HasForeignKey(t => t.AssignedToId)
            //     .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<Ticket>()
            //     .HasOne(t => t.Department)
            //     .WithMany(d => d.Tickets)
            //     .HasForeignKey(t => t.DepartmentId)
            //     .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
