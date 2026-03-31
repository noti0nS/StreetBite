using System.Net;
using System.Text.Json.Serialization;

namespace StreetBite.Api.Views.Responses;

public class PagedApiResponse<T> : ApiResponse<T> where T : class, new()
{
    [JsonConstructor]
    public PagedApiResponse(
        T result,
        string message,
        int currentPage,
        int totalRecords,
        int pageSize = ApiConstants.DefaultPageSize) : base(result, message)
    {
        CurrentPage = currentPage;
        TotalRecords = totalRecords;
        PageSize = pageSize;
    }

    public PagedApiResponse(
        string errorMessage,
        HttpStatusCode code = HttpStatusCode.InternalServerError) : base(errorMessage, code)
    {

    }

    public static PagedApiResponse<T> Empty(string message) => new(new(), message, 1, 0);

    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalRecords { get; set; } = ApiConstants.DefaultPageSize;
    public int TotalPages
        => TotalRecords == 0 ? 0 : (int)Math.Ceiling((double)TotalRecords / PageSize);
}
