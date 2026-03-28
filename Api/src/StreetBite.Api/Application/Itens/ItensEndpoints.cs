namespace StreetBite.Api.Application.Itens;

public static class ItensEndpoints
{
    public static RouteGroupBuilder MapItensEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/itens").WithTags("Itens");
        return group;
    }
}
