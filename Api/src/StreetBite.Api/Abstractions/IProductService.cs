using StreetBite.Api.Views.DTOs;
using StreetBite.Api.Views.Requests;
using StreetBite.Api.Views.Responses;
using StreetBite.Core.Entities;
using StreetBite.Core.Models;

namespace StreetBite.Api.Abstractions;

public interface IProductService
{
    Task<Result<ProductViewDTO>> AddProductAsync(
        EntityRequest<Produto> request, CancellationToken cancellationToken = default);

    Task<Result<PagedApiResponse<List<ProductViewDTO>>>> ListProductsAsync(
        int currentPage,
        int pageSize,
        CancellationToken cancellationToken = default);

    Task<Result<ProductViewDTO>> GetProductByIdAsync(
        long id, CancellationToken cancellationToken = default);

    Task<Result<ProductViewDTO>> UpdateProductAsync(
        long id, EntityRequest<Produto> request, CancellationToken cancellationToken = default);

    Task<Result> DeleteProductAsync(
        long id, CancellationToken cancellationToken = default);
}
