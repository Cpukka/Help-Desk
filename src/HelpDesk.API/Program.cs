using HelpDesk.Infrastructure.Data;
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

// CORS for Vercel
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "https://help-desk-psi-ten.vercel.app",
                "https://help-desk-frontend.vercel.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

var app = builder.Build();

// ========================================
// PIPELINE
// ========================================
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Help Desk API V1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { 
    status = "Healthy", 
    timestamp = DateTime.UtcNow,
    database = "Neon PostgreSQL"
}));

Console.WriteLine($"🚀 Help Desk API is running on port: {port}");
Console.WriteLine($"📚 Swagger UI: http://localhost:{port}/swagger");

app.Run();
