using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;

namespace StreetBite.Api.Views.Requests;

public sealed record ItemRequest(
    long ComandaId,
    long ProdutoId,
    int Quantidade,
    string? Observacao = null) : IValidation
{
    public Result Validate()
    {
        if (ComandaId <= 0)
        {
            return Result.Fail("ComandaId deve ser informado.");
        }

        if (ProdutoId <= 0)
        {
            return Result.Fail("ProdutoId deve ser informado.");
        }

        if (Quantidade <= 0)
        {
            return Result.Fail("Quantidade deve ser maior que zero.");
        }

        return Result.Ok();
    }
}
