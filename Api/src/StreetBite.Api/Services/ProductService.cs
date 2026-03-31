using Microsoft.EntityFrameworkCore;
using StreetBite.Api.Abstractions;
using StreetBite.Api.Views.DTOs;
using StreetBite.Api.Views.Requests;
using StreetBite.Core.Entities;
using StreetBite.Core.Models;
using StreetBite.Infra.Data;

namespace StreetBite.Api.Services;

public sealed class ProductService(StreetBiteDbContext dbContext) : IProductService
{
    public async Task<Result<ProductViewDTO>> AddProductAsync(EntityRequest<Produto> request, CancellationToken cancellationToken = default)
    {
        var produto = new Produto
        {
            Nome = request.Data!.Nome.Trim(),
            Preco = request.Data.Preco,
            Categoria = request.Data.Categoria
        };

        dbContext.Produtos.Add(produto);
        await dbContext.SaveChangesAsync(cancellationToken);

        var addedProduct = new ProductViewDTO(produto.Id, produto.Nome, produto.Preco, produto.Categoria);
        return Result<ProductViewDTO>.Ok(addedProduct);
    }

    public async Task<Result<List<ProductViewDTO>>> ListProductsAsync(CancellationToken cancellationToken = default)
    {
        var products = await dbContext.Produtos
            .AsNoTracking()
            .OrderBy(x => x.Nome)
            .Select(x => new ProductViewDTO(x.Id, x.Nome, x.Preco, x.Categoria))
            .ToListAsync(cancellationToken);

        return Result<List<ProductViewDTO>>.Ok(products);
    }

    public async Task<Result<ProductViewDTO>> GetProductByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        var product = await dbContext.Produtos
            .AsNoTracking()
            .Select(x => new ProductViewDTO(x.Id, x.Nome, x.Preco, x.Categoria))
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (product is null)
            return Result<ProductViewDTO>.Fail("Produto não encontrado.", System.Net.HttpStatusCode.NotFound);

        return Result<ProductViewDTO>.Ok(product);
    }

    public async Task<Result<ProductViewDTO>> UpdateProductAsync(long id, EntityRequest<Produto> request, CancellationToken cancellationToken = default)
    {
        var product = await dbContext.Produtos
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (product is null)
            return Result<ProductViewDTO>.Fail("Produto não encontrado.", System.Net.HttpStatusCode.NotFound);

        product.Nome = request.Data!.Nome.Trim();
        product.Preco = request.Data!.Preco;
        product.Categoria = request.Data!.Categoria;
        product.ModifiedAt = DateTime.UtcNow;

        await dbContext.SaveChangesAsync(cancellationToken);

        var updatedProduct = new ProductViewDTO(product.Id, product.Nome, product.Preco, product.Categoria);
        return Result<ProductViewDTO>.Ok(updatedProduct);
    }

    public async Task<Result> DeleteProductAsync(long id, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Produtos.AnyAsync(x => x.Id == id, cancellationToken))
            return Result.Fail("Produto não encontrado.", System.Net.HttpStatusCode.NotFound);

        await dbContext.Produtos
            .Where(x => x.Id == id)
            .ExecuteDeleteAsync(cancellationToken: cancellationToken);

        return Result.Ok("Produto removido com sucesso.");
    }
}
