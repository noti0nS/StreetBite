using Microsoft.EntityFrameworkCore;
using StreetBite.Api.Abstractions;
using StreetBite.Api.Application.Common.ExceptionHandlers;
using StreetBite.Api.Services;
using StreetBite.Infra.Data;

namespace StreetBite.Api.Application.Common;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddOpenApi();
        services.AddCors(options =>
        {
            options.AddPolicy(ApiConstants.CorsPolicyName, policy =>
                policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        });
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddDbContext<StreetBiteDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
        services.AddScoped<IProductService, ProductService>();

        return services;
    }
}
