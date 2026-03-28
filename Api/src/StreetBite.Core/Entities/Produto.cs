using StreetBite.Core.Enums;

namespace StreetBite.Core.Entities;

public sealed class Produto : BaseEntity
{
    public ICollection<Item> Itens { get; set; } = [];

    public string Nome { get; set; } = string.Empty;

    public decimal Preco { get; set; }

    public ECategorias Categoria { get; set; }
}
