namespace StreetBite.Api.Views.DTOs;

public sealed record ItemViewDTO(
    int Id,
    string ProdutoNome,
    string Categoria,
    int Quantidade,
    decimal PrecoUnitario);
