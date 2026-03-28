namespace StreetBite.Api.Application.Produtos;

public static class ProdutosEndpoints
{
    public static RouteGroupBuilder MapProdutosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/produtos").WithTags("Produtos");
        return group;
    }
}
