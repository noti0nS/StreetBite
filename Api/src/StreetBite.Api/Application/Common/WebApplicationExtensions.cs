using StreetBite.Api;

namespace StreetBite.Api.Application.Common;

public static class WebApplicationExtensions
{
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
