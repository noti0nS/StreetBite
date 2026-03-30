using StreetBite.Api.Application.Common;
using StreetBite.Api.Application.Comandas;
using StreetBite.Api.Application.Itens;
using StreetBite.Api.Application.Produtos;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApiServices(builder.Configuration);

var app = builder.Build();

app.UseApiConfiguration();

app.MapGet("/", () => new { Message = "OK" });

app.MapProdutosEndpoints();
app.MapComandasEndpoints();
app.MapItensEndpoints();

app.Run();
