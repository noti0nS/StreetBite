using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;

namespace StreetBite.Api.Views.Requests;

public sealed record ItemUpdateRequest(int Quantidade) : IValidation
{
    public Result Validate()
    {
        if (Quantidade <= 0)
        {
            return Result.Fail("Quantidade deve ser maior que zero.");
        }

        return Result.Ok();
    }
}
