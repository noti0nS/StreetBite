using StreetBite.Core.Enums;

namespace StreetBite.Api.Views.DTOs;

public record ProductViewDTO
(
    int Id,
    string Nome,
    decimal Preco,
    ECategorias Categoria,
    string? Descricao
);
