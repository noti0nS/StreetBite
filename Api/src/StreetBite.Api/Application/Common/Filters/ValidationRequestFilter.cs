using StreetBite.Api.Views.Responses;
using StreetBite.Core.Abstractions;

namespace StreetBite.Api.Application.Common.Filters;

/// <summary>
/// Validates any endpoint argument that implements <see cref="IValidation"/>.
/// </summary>
internal class ValidationRequestFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        foreach (var request in context.Arguments.OfType<IValidation>())
        {
            var result = request.Validate();
            if (!result.Success)
            {
                var response = ApiResponse<object>.Error(result.Message!);
                return TypedResults.BadRequest(response);
            }
        }

        return await next.Invoke(context);
    }
}
