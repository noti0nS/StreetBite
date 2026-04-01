using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;

namespace StreetBite.Api.Views.Requests;

public sealed record ComandaUpdateRequest(
    string Status,
    string MetodoDePagamento) : IValidation
{
    public Result Validate()
    {
        if (string.IsNullOrWhiteSpace(Status))
        {
            return Result.Fail("Status da comanda deve ser informado.");
        }

        if (string.IsNullOrWhiteSpace(MetodoDePagamento))
        {
            return Result.Fail("Método de pagamento deve ser informado.");
        }

        return Result.Ok();
    }
}
