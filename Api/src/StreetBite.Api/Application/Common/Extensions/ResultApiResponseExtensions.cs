using StreetBite.Api.Views.Responses;
using StreetBite.Core.Models;

namespace StreetBite.Api.Application.Common.Extensions;

public static class ResultApiResponseExtensions
{
    public static IResult ToApiResponse(this Result result)
        => result.Success
            ? TypedResults.Ok(ApiResponse<object>.Success())
            : TypedResults.Json(ApiResponse<object>.Fail(result.Message!, result.StatusCode), statusCode: (int)result.StatusCode);

    public static IResult ToApiResponse<T>(this Result<T> result)
        => result.Success
            ? TypedResults.Ok(ApiResponse<T?>.Success(result.Data))
            : TypedResults.Json(ApiResponse<T?>.Fail(result.Message!, result.StatusCode), statusCode: (int)result.StatusCode);

    public static IResult ToHttpResult(this Result result)
    {
        if (result.Success) return TypedResults.Ok(ApiResponse<object>.Success());
        return TypedResults.Json(ApiResponse<object>.Fail(result.Message!, result.StatusCode), statusCode: (int)result.StatusCode);
    }

    public static IResult ToHttpResult<T>(this Result<T> result)
    {
        if (result.Success) return TypedResults.Ok(ApiResponse<T?>.Success(result.Data));
        return TypedResults.Json(ApiResponse<T?>.Fail(result.Message!, result.StatusCode), statusCode: (int)result.StatusCode);
    }
}