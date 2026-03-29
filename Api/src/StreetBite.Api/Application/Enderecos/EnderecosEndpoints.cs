namespace StreetBite.Api.Application.Enderecos;

public static class EnderecosEndpoints
{
    private const string TodoMessage = "todo: not implemented yet";

    public static RouteGroupBuilder MapEnderecosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/enderecos").WithTags("Enderecos");

        group.MapPost("", AdicionarEndereco);
        group.MapGet("", ListarEnderecos);
        group.MapGet("/{id:long}", ObterEnderecoPorId);
        group.MapPatch("/{id:long}", AtualizarEndereco);
        group.MapDelete("/{id:long}", RemoverEndereco);

        return group;
    }

    private static IResult AdicionarEndereco() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ListarEnderecos() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ObterEnderecoPorId(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult AtualizarEndereco(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult RemoverEndereco(long id) => TypedResults.Ok(new { message = TodoMessage });
}
