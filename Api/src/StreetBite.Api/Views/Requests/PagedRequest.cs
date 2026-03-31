using Microsoft.AspNetCore.Mvc;
using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;

namespace StreetBite.Api.Views.Requests;

public record PagedRequest(
    [property: FromHeader(Name = ApiConstants.PageHeaderName)] int CurrentPage = 1,
    [property: FromHeader(Name = ApiConstants.PageSizeHeaderName)] int PageSize = ApiConstants.DefaultPageSize
) : IValidation
{
    public Result Validate()
    {
        if (CurrentPage <= 0)
        {
            return Result.Fail($"{ApiConstants.PageHeaderName} deve ser maior que zero.");
        }

        if (PageSize <= 0)
        {
            return Result.Fail($"{ApiConstants.PageSizeHeaderName} deve ser maior que zero.");
        }

        return Result.Ok();
    }
}
