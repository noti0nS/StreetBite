namespace StreetBite.Api.Application.Comandas;

public static class ComandasEndpoints
{
    public static RouteGroupBuilder MapComandasEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/comandas").WithTags("Comandas");
        return group;
    }
}
