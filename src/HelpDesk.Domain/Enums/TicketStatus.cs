namespace HelpDesk.Domain.Enums
{
    public enum TicketStatus
    {
        New,
        Assigned,
        InProgress,
        OnHold,
        Resolved,
        Closed,
        Reopened,
        Escalated
    }

    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum SLAStatus
    {
        OnTrack,
        AtRisk,
        Breached
    }
}
