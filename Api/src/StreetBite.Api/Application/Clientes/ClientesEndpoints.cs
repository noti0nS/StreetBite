namespace StreetBite.Api.Application.Clientes;

public static class ClientesEndpoints
{
    private const string TodoMessage = "todo: not implemented yet";

    public static RouteGroupBuilder MapClientesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/clientes").WithTags("Clientes");

        group.MapPost("", AdicionarCliente);
        group.MapGet("", ListarClientes);
        group.MapGet("/{id:long}", ObterClientePorId);
        group.MapPatch("/{id:long}", AtualizarCliente);
        group.MapDelete("/{id:long}", RemoverCliente);

        return group;
    }

    private static IResult AdicionarCliente() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ListarClientes() => TypedResults.Ok(new { message = TodoMessage });

    private static IResult ObterClientePorId(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult AtualizarCliente(long id) => TypedResults.Ok(new { message = TodoMessage });

    private static IResult RemoverCliente(long id) => TypedResults.Ok(new { message = TodoMessage });
}
