namespace StreetBite.Api.Application.Itens;

public static class ItensEndpoints
{
    private const string TodoMessage = "todo: not implemented yet";

    public static RouteGroupBuilder MapItensEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/comandas").WithTags("Itens");

        group.MapPost("/item", AdicionarItem);

        return group;
    }

    private static IResult AdicionarItem() => TypedResults.Ok(new { message = TodoMessage });
}
