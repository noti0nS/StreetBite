using StreetBite.Api.Application.Common.Filters;

namespace StreetBite.Api.Application.Comandas;

public static class ComandasEndpoints
{
    private const string TodoMessage = "todo: not implemented yet";

    public static RouteGroupBuilder MapComandasEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/comandas")
            .WithTags("Comandas")
            .AddEndpointFilter<ValidationRequestFilter>();

        group.MapPost("", CriarComanda);
        group.MapGet("", ListarComandas);
        group.MapPatch("/{id:long}", AtualizarComanda);

        return group;
    }

    private static IResult CriarComanda() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ListarComandas() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult AtualizarComanda(long id) => TypedResults.Ok(new { message = TodoMessage });
}
