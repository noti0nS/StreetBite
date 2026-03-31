using StreetBite.Core.Abstractions;
using StreetBite.Core.Models;

namespace StreetBite.Core.Entities;

public abstract class BaseEntity : IValidation
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public virtual Result Validate()
        => Result.Ok();
}
