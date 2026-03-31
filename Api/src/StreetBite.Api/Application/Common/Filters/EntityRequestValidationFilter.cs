using StreetBite.Api.Views.Requests;
using StreetBite.Api.Views.Responses;
using StreetBite.Core.Abstractions;

namespace StreetBite.Api.Application.Common.Filters;

/// <summary>
/// Retrieves the parameter whose inherithes from <seealso cref="BaseRequestWithTable{T}"/> and validates the entity.
/// </summary>
/// <typeparam name="TEntity"></typeparam>
internal class EntityValidationFilter : IEndpointFilter
{
    private static readonly Type _requestType = typeof(EntityRequest<>);

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = (EntityRequest<IValidation>?)context.Arguments.FirstOrDefault(x => x?.GetType()?.IsSubclassOf(_requestType) ?? false);
        if (request is not null)
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