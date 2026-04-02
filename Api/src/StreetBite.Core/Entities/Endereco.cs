namespace StreetBite.Core.Entities;

public sealed class Endereco : BaseEntity
{
    public Cliente? Cliente { get; set; }

    public int? Cep { get; set; }

    public string Street { get; set; } = string.Empty;

    public int? Number { get; set; }
}
