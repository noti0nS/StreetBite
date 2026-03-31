using StreetBite.Core.Models;

namespace StreetBite.Core.Abstractions;

public interface IValidation
{
    public Result Validate();
}
