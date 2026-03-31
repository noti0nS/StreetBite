using StreetBite.Api.Views.Responses;

namespace StreetBite.Api.Application.Common.Extensions;

internal static class ApiResponseExtensions
{
    public static IValueHttpResult<ApiResponse<T>> ToValueHttpResult<T>(this ApiResponse<T> response)
    {
        if (response.IsSuccess) return TypedResults.Ok(response);
        return TypedResults.Json(response, statusCode: (int)response.Code);
    }

    //public static IValueHttpResult<PagedApiResponse<List<T>>> ToValueHttpResult<T>(this PagedApiResponse<List<T>> response)
    //{
    //    if (response.IsSuccess) return TypedResults.Ok(response);
    //    return TypedResults.Json(response, statusCode: (int)response.Code);
    //}

    public static IResult ToHttpResult<T>(this ApiResponse<T> response)
    {
        if (response.IsSuccess) return TypedResults.Ok(response);
        return TypedResults.Json(response, statusCode: (int)response.Code);
    }
}