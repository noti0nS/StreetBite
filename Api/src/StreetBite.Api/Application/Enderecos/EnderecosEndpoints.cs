namespace StreetBite.Api.Application.Enderecos;

public static class EnderecosEndpoints
{
    public static RouteGroupBuilder MapEnderecosEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/enderecos").WithTags("Enderecos");
        return group;
    }
}
