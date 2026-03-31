using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;
using System.Text.Json.Serialization;

namespace StreetBite.Api.Views.Requests;

public sealed class EntityRequest<T> : IValidation
    where T : IValidation
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public long Id { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public T? Data { get; set; }

    public Result Validate()
    {
        if (Id == default && Data is null)
        {
            return Result.Fail("Id ou Data devem ser informados.");
        }

        return Data?.Validate() ?? Result.Ok();
    }
}
