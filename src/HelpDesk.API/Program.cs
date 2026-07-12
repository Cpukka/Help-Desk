using HelpDesk.Infrastructure.Data;
using HelpDesk.API.Hubs;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ========================================
// RAILWAY PORT CONFIGURATION
// ========================================
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://*:{port}");
Console.WriteLine($"✅ Running on port: {port}");

// ========================================
// SERVICES
// ========================================
builder.Services.AddControllers();

// Add SignalR
builder.Services.AddSignalR();

// Configure PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    Console.WriteLine("⚠️ Using fallback connection string from environment");
    connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
}
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Help Desk API",
        Version = "v1",
        Description = "Help Desk & IT Service Management System API"
    });
});

// ========================================
// 🚀 CORS - FIXED WITH SetIsOriginAllowed
// ========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
            {
                // Allow localhost for development
                if (origin == "http://localhost:3000" || origin == "https://localhost:3000")
                    return true;
                
                // Allow all Vercel subdomains
                if (origin.EndsWith(".vercel.app"))
                    return true;
                
                // Allow Railway backend URL
                if (origin == "https://help-desk-production-2320.up.railway.app")
                    return true;
                
                return false;
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// ========================================
// PIPELINE - CORRECT ORDER
// ========================================

// 1. Routing
app.UseRouting();

// 2. CORS - Must come after Routing and before Authentication
app.UseCors("AllowFrontend");

// 3. Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// 4. Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Help Desk API V1");
    c.RoutePrefix = "swagger";
});

// 5. Controllers & Hubs
app.MapControllers();
app.MapHub<NotificationHub>("/hubs/notifications");

// ========================================
// ROOT ENDPOINT
// ========================================
app.MapGet("/", () => Results.Ok(new { 
    message = "🎫 Help Desk API is running!",
    version = "v1",
    endpoints = new {
        health = "/health",
        swagger = "/swagger",
        api = "/api"
    },
    documentation = "https://help-desk-production-2320.up.railway.app/swagger",
    timestamp = DateTime.UtcNow
}));

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { 
    status = "Healthy", 
    timestamp = DateTime.UtcNow,
    database = "Neon PostgreSQL"
}));

// ========================================
// STARTUP
// ========================================
Console.WriteLine($"🚀 Help Desk API is running on port: {port}");
Console.WriteLine($"📚 Swagger UI: http://localhost:{port}/swagger");

app.Run();
