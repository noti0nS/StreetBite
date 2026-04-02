using Microsoft.AspNetCore.Diagnostics;
using StreetBite.Api.Views.Responses;
using System.Net;

namespace StreetBite.Api.Application.Common.ExceptionHandlers;

internal sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    private const string DefaultErrorMessage = "Ocorreu um erro inesperado ao processar a requisição.";

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (httpContext.Response.HasStarted)
        {
            logger.LogError(
                exception,
                "Unhandled exception occurred after the response started for {Method} {Path}",
                httpContext.Request.Method,
                httpContext.Request.Path);

            return false;
        }

        logger.LogError(
            exception,
            "Unhandled exception while processing {Method} {Path}",
            httpContext.Request.Method,
            httpContext.Request.Path);

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        httpContext.Response.ContentType = "application/json";

        var response = ApiResponse<object>.Fail(DefaultErrorMessage, HttpStatusCode.InternalServerError);
        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }
}
