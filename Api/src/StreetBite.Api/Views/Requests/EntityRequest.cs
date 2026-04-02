using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;
using System.Text.Json.Serialization;

namespace StreetBite.Api.Views.Requests;

public record EntityRequest<T>(
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    long Id,
    [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    T? Data
) : IValidation where T : IValidation
{
    public Result Validate()
    {
        if (Id == default && Data is null)
        {
            return Result.Fail("Id ou Data devem ser informados.");
        }

        return Data?.Validate() ?? Result.Ok();
    }
}
