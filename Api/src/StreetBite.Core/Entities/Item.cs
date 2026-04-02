namespace StreetBite.Core.Entities;

public sealed class Item : BaseEntity
{
    private Produto? _produto;

    public Produto? Produto
    {
        get => _produto;
        set
        {
            _produto = value;
            if (value is not null)
            {
                PrecoUnitario = value.Preco;
            }
        }
    }

    public Comanda? Comanda { get; set; }

    public int Quantidade { get; set; }

    public decimal PrecoUnitario { get; set; } = decimal.Zero;

    public decimal GetTotalItem() => PrecoUnitario * Quantidade;
}
