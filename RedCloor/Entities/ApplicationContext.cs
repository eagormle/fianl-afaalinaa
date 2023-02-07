using System;
using System.Linq;
using System.Web;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace RedCloorAPI.Models;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    { }
    public DbSet<Order> Orders { get; set; } = null!;

}