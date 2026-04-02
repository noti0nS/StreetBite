using StreetBite.Core.Models;
using System.Net;
using System.Text.Json.Serialization;

namespace StreetBite.Api.Views.Responses;

public class ApiResponse<T>
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public T? Data { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public string? Message { get; set; }

    [JsonIgnore]
    public bool IsSuccess => Message is null;

    [JsonIgnore]
    public HttpStatusCode Code { get; set; }

    [JsonConstructor]
    public ApiResponse()
    {
        Code = HttpStatusCode.OK;
    }

    internal ApiResponse(T data, string? message)
    {
        Data = data;
        Message = message;
        Code = HttpStatusCode.OK;
    }

    internal ApiResponse(string? message, HttpStatusCode code)
    {
        Message = message;
        Code = code;
    }

    private ApiResponse(T? data, string? message, HttpStatusCode code)
    {
        Data = data;
        Message = message;
        Code = code;
    }


    public static ApiResponse<T> Success() => new(default, null, HttpStatusCode.OK);

    public static ApiResponse<T> Success(T data) => new(data, null, HttpStatusCode.OK);

    public static ApiResponse<T> Fail(string message, HttpStatusCode code = HttpStatusCode.InternalServerError)
        => new(default, message, code);

    public static ApiResponse<T> Error(string message, HttpStatusCode code = HttpStatusCode.InternalServerError)
        => Fail(message, code);
}
