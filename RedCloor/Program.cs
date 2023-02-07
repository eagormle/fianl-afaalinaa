using RedCloorAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Configuration;

var corsapp = "_corsapp";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsapp,
                      policy =>
                      {
                          policy.WithOrigins("*")
                                               .AllowAnyHeader()
                                               .AllowAnyMethod()
                                               .AllowAnyOrigin();

                      });
});

// Add services to the container.


builder.Services.AddControllers();

//builder.Services.AddDbContext<ApplicationContext>(options =>
//options.UseSqlServer(
//    builder.Configuration.GetConnectionString("DefaultConnection"),
//    b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName)));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//connection to ORdersDb on local sqlserer
builder.Services.AddDbContext<ApplicationContext>(options =>
options.UseSqlServer(connectionString));



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddTransient<IOrderRepository, OrderRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsapp);

app.UseAuthorization();

app.MapControllers();

app.Run();
