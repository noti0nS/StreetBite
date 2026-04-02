using System.Net;

namespace StreetBite.Core.Models;

public class Result
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;

    public Result()
    {
        Success = true;
        Message = string.Empty;
    }

    public static Result Ok(string? message = null)
    {
        return new Result
        {
            Success = true,
            Message = message,
        };
    }

    public static Result Fail(string? message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
    {
        return new Result
        {
            Success = false,
            Message = message,
            StatusCode = statusCode
        };
    }
}

public class Result<T> : Result
{
    public T? Data { get; set; }

    public Result() : base()
    {
        Data = default;
    }

    public static Result<T> Ok(T data, string? message = null)
    {
        return new Result<T>
        {
            Success = true,
            Message = message,
            Data = data,
        };
    }

    public static new Result<T> Fail(string? message, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
    {
        return new Result<T>
        {
            Success = false,
            Message = message,
            Data = default,
            StatusCode = statusCode,
        };
    }
}
