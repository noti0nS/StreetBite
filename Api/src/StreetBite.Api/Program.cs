using Microsoft.EntityFrameworkCore;
using StreetBite.Api.Application.Clientes;
using StreetBite.Api.Application.Comandas;
using StreetBite.Api.Application.Enderecos;
using StreetBite.Api.Application.Itens;
using StreetBite.Api.Application.Produtos;
using StreetBite.Infra.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<StreetBiteDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () => new { Message = "OK" });

app.MapClientesEndpoints();
app.MapProdutosEndpoints();
app.MapComandasEndpoints();
app.MapEnderecosEndpoints();
app.MapItensEndpoints();

app.Run();
