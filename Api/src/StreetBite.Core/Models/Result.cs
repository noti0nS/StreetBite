namespace StreetBite.Core.Models;

public class Result
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public string[] Errors { get; set; }

    public Result()
    {
        Success = true;
        Message = string.Empty;
        Errors = [];
    }

    public static Result Ok(string? message = null)
    {
        return new Result
        {
            Success = true,
            Message = message,
            Errors = []
        };
    }

    public static Result Fail(string? message, params string[] errors)
    {
        return new Result
        {
            Success = false,
            Message = message,
            Errors = errors
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
            Errors = []
        };
    }

    public static new Result<T> Fail(string? message, params string[] errors)
    {
        return new Result<T>
        {
            Success = false,
            Message = message,
            Data = default,
            Errors = errors
        };
    }
}
