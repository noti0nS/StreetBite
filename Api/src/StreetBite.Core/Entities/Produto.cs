using StreetBite.Core.Enums;

namespace StreetBite.Core.Entities;

public sealed class Produto : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public ECategorias Categoria { get; set; }
    public string? Descricao { get; set; }
    public List<Item> Itens { get; set; } = [];
}
