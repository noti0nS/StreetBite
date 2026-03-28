namespace StreetBite.Api.Application.Clientes;

public static class ClientesEndpoints
{
    public static RouteGroupBuilder MapClientesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/clientes").WithTags("Clientes");
        return group;
    }
}
