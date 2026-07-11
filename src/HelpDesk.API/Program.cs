using HelpDesk.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ========================================
// 1. PORT CONFIGURATION FOR CLOUD DEPLOYMENT
// ========================================
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls($"http://*:{port}");
    Console.WriteLine($"🌐 Running on port: {port}");
}

// ========================================
// 2. SERVICES
// ========================================
builder.Services.AddControllers();

// Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Swagger
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
// 3. CORS - Allow Frontend
// ========================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "https://help-desk-psi-ten.vercel.app",
                "https://help-desk-psi-ten.vercel.app/*",
                "https://helpdesk-frontend.up.railway.app"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

var app = builder.Build();

// ========================================
// 4. PIPELINE
// ========================================

// Swagger - Always enabled for API documentation
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Help Desk API V1");
    c.RoutePrefix = "swagger";
});

// HTTPS Redirection - Skip in development or if DISABLE_HTTPS is set
var disableHttps = Environment.GetEnvironmentVariable("DISABLE_HTTPS") == "true";
if (!disableHttps && !app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
else
{
    Console.WriteLine("⚠️ HTTPS redirection is disabled (development mode)");
}

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

// ========================================
// 5. SEED DATABASE (Optional)
// ========================================
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (app.Environment.IsDevelopment())
    {
        // Seed development data
        await DbInitializer.InitializeAsync(dbContext);
    }
}

// ========================================
// 6. STARTUP
// ========================================
var actualPort = Environment.GetEnvironmentVariable("PORT") ?? "5252";
Console.WriteLine($"🚀 Help Desk API is running!");
Console.WriteLine($"📍 URL: http://localhost:{actualPort}");
Console.WriteLine($"📚 Swagger: http://localhost:{actualPort}/swagger");
Console.WriteLine($"🔧 Environment: {app.Environment.EnvironmentName}");

app.Run();