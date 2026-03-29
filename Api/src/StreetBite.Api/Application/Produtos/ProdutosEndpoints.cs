namespace StreetBite.Api.Application.Produtos;

public static class ProdutosEndpoints
{
    private const string TodoMessage = "todo: not implemented yet";

    public static RouteGroupBuilder MapProdutosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/produtos").WithTags("Produtos");

        group.MapPost("", AdicionarProduto);
        group.MapGet("", ListarProdutos);
        group.MapGet("/{id:long}", ObterProdutoPorId);
        group.MapPatch("/{id:long}", AtualizarProduto);
        group.MapDelete("/{id:long}", RemoverProduto);

        return group;
    }

    private static IResult AdicionarProduto() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ListarProdutos() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ObterProdutoPorId(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult AtualizarProduto(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult RemoverProduto(long id) => TypedResults.Ok(new { message = TodoMessage });
}
