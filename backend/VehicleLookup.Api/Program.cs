using VehicleLookup.Application.Interfaces;
using VehicleLookup.Application.Services;
using VehicleLookup.Infrastructure.ExternalApis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<INhtsaClient, NhtsaClient>(client =>
{
    client.BaseAddress = new Uri("https://vpic.nhtsa.dot.gov/api/");
});

builder.Services.AddScoped<IVehicleService, VehicleAppService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Vehicle API V1");
    c.RoutePrefix = string.Empty; 
});

app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();