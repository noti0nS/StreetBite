namespace StreetBite.Api.Application.Itens;

public static class ItensEndpoints
{
    private const string TodoMessage = "todo: not implemented yet";

    public static RouteGroupBuilder MapItensEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/comandas").WithTags("Itens");

        group.MapPost("/item", AdicionarItem);
        group.MapGet("/item/{id:long}", ObterItemPorId);
        group.MapGet("/itens", ListarItens);

        return group;
    }

    private static IResult AdicionarItem() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ObterItemPorId(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ListarItens() => TypedResults.Ok(new { message = TodoMessage });
}
