using Microsoft.EntityFrameworkCore;

namespace StreetBite.Infra.Data;

public sealed class StreetBiteDbContext(DbContextOptions<StreetBiteDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(StreetBiteDbContext).Assembly);
    }
}
