using Microsoft.EntityFrameworkCore;
using StreetBite.Infra.Data;

namespace StreetBite.Api.Application.Common;

public static class WebApplicationExtensions
{
    public static async Task MigrateDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<StreetBiteDbContext>();

        await dbContext.Database.MigrateAsync();
    }

    public static WebApplication UseApiConfiguration(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseReDoc(o =>
            {
                o.SpecUrl("/openapi/v1.json");
            });
        }
        else
        {
            app.UseHttpsRedirection();
        }

        app.UseExceptionHandler();
        app.UseCors(ApiConstants.CorsPolicyName);

        return app;
    }
}
