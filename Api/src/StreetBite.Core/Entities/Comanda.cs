using StreetBite.Core.Enums;

namespace StreetBite.Core.Entities;

public sealed class Comanda : BaseEntity
{
    public ICollection<Item> Itens { get; set; } = [];

    public Cliente? Cliente { get; set; }

    public string CodigoPedido { get; set; } = string.Empty;

    public EComandaStatus Status { get; set; }

    public decimal Subtotal { get; set; }

    public EMetodoPagamento MetodoDePagamento { get; set; }
}
