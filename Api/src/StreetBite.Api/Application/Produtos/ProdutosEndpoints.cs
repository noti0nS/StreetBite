using StreetBite.Api.Abstractions;
using StreetBite.Api.Application.Common.Extensions;
using StreetBite.Api.Application.Common.Filters;
using StreetBite.Api.Views.Requests;
using StreetBite.Core.Entities;

namespace StreetBite.Api.Application.Produtos;

public static class ProdutosEndpoints
{
    public static RouteGroupBuilder MapProdutosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/produtos")
            .AddEndpointFilter<EntityValidationFilter>()
            .WithTags("Produtos");

        group.MapPost("", AdicionarProduto);
        group.MapGet("", ListarProdutos);
        group.MapGet("/{id:long}", ObterProdutoPorId);
        group.MapPatch("/{id:long}", AtualizarProduto);
        group.MapDelete("/{id:long}", RemoverProduto);

        return group;
    }

    private static async Task<IResult> AdicionarProduto(
        IProductService produtoService, EntityRequest<Produto> request, CancellationToken cancellationToken)
    {
        var result = await produtoService.AddProductAsync(request, cancellationToken);
        if (result.Success)
        {
            return TypedResults.Created($"/api/v1/produtos/{result.Data!.Id}", result.ToApiResponse());
        }
        return result.ToHttpResult();
    }

    private static async Task<IResult> ListarProdutos(IProductService produtoService, CancellationToken cancellationToken)
    {
        var result = await produtoService.ListProductsAsync(cancellationToken);
        return result.ToHttpResult();
    }

    private static async Task<IResult> ObterProdutoPorId(IProductService produtoService, long id, CancellationToken cancellationToken)
    {
        var result = await produtoService.GetProductByIdAsync(id, cancellationToken);
        return result.ToHttpResult();
    }

    private static async Task<IResult> AtualizarProduto(
        IProductService produtoService, long id, EntityRequest<Produto> request, CancellationToken cancellationToken)
    {
        var result = await produtoService.UpdateProductAsync(id, request, cancellationToken);
        return result.ToHttpResult();
    }

    private static async Task<IResult> RemoverProduto(
        IProductService produtoService, long id, CancellationToken cancellationToken)
    {
        var result = await produtoService.DeleteProductAsync(id, cancellationToken);
        if (result.Success)
        {
            return TypedResults.NoContent();
        }
        return result.ToHttpResult();
    }
}
