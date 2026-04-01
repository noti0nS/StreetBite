namespace StreetBite.Api.Views.DTOs;

public sealed record ComandaViewDTO(
    int ComandaId,
    List<ItemViewDTO> Items,
    string CodigoDoPedido,
    decimal Subtotal,
    string Status,
    DateTime PedidoCriadoEm,
    string MetodoDePagamento);
