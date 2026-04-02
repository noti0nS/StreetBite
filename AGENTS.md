# StreetBite – Copilot Instructions

## Project Overview

Food truck management platform for sales, menu, orders, and customers.

- **Backend**: ASP.NET Core / .NET 10, C#, EF Core, PostgreSQL
- **Frontend**: Vanilla HTML + CSS + JS, no build system — served via Live Server

---

## Build & Run Commands

### Backend

All commands run from `Api/`.

```bash
# Run the application
dotnet run --project src/StreetBite.Api/StreetBite.Api.csproj

# Build the API
dotnet build src/StreetBite.Api/StreetBite.Api.csproj

# Run tests when test projects are present
dotnet test
```

The API entrypoint lives in `Api/src/StreetBite.Api/Program.cs`. Shared domain types live in `StreetBite.Core`, and EF Core persistence lives in `StreetBite.Infra`. Local development uses PostgreSQL from `Api/src/StreetBite.Api/appsettings.json`.

### Frontend

Open any `.html` file with Live Server (VS Code extension). The backend CORS config only allows **`http://127.0.0.1:5500`** — use that origin, not `localhost:5500`.

---

## Architecture

```text
Api/src/
├── StreetBite.Api/         HTTP entrypoint, endpoint mappings, API responses, and configuration
│   ├── Application/        Minimal API route groups and shared web setup
│   └── Views/              API response/view models
├── StreetBite.Core/        Domain entities, enums, and shared result models
└── StreetBite.Infra/       EF Core DbContext and entity configurations

FrontEnd/
├── landPage.html           Entry page
├── Pages/Iframes/          Per-feature HTML pages (home, menu, requests, createNewOrder, settings)
├── Scripts/                One JS file per page + service.js (ApiService class) + requests.js
└── Styles/                 One CSS file per page
```

### Core Domain Model

- **Comanda** (order): has many `Item`s, optionally linked to a `Cliente`. Carries `Status`, `MetodoDePagamento`, auto-generated `CodigoPedido`, and computed `Subtotal`.
- **Item**: join between `Comanda` and `Produto`. `PrecoUnitario` is automatically set from `Produto.Preco` when `Produto` is assigned. `GetTotalItem()` = `PrecoUnitario × Quantidade`.
- **Produto**: menu item with `Nome`, `Preco`, and `Categoria` (enum).
- **Cliente**: customer with `Nome`, `Email`/`Telefone`, and a list of `Endereco`.

### Request/Response Flow

Minimal API route groups live under `StreetBite.Api/Application/*` and are wired from `Program.cs`. Shared response models live under `StreetBite.Api/Views/Responses`, and domain operations return `Result` / `Result<T>` from `StreetBite.Core/Models` where appropriate.

### Entity Framework Core Relationships

EF Core mappings live under `StreetBite.Infra/Data/Configurations` and are applied from `StreetBiteDbContext`. Keep relationship and table configuration in those classes instead of scattering mapping rules across the application.

---

## Key Conventions

### Domain Language: Portuguese

All entity names, field names, enum values, service methods, and endpoint paths are in Portuguese. Follow this when adding new code:

- Order/bill → `Comanda`; Product → `Produto`; Customer → `Cliente`; Address → `Endereco`; Item stays `Item`

### Enums

- `EComandaStatus`: `Pendente`, `EmProducao`, `Finalizado`
- `EMetodoPagamento`: `Credito`, `Debito`, `Dinheiro`, `Pix`
- `ECategorias`: `Acompanhamento`, `Bebida`, `Combo`, `Lanche`

### C# / .NET Conventions

Use nullable reference types and implicit usings as configured in the project files. Prefer constructor injection, `sealed` entities where the codebase already does, and extension methods for service registration / pipeline setup (`AddApiServices`, `UseApiConfiguration`, `Map*Endpoints`).

### Frontend API Access

`FrontEnd/Scripts/service.js` exports an `ApiService` class (base URL injected in constructor). Import it with ES module syntax:

```js
import ApiService from "./service.js";
const api = new ApiService("http://localhost:5109");
```

Older/simpler pages call `fetch('http://localhost:5109/api/v1/...')` directly. Prefer `ApiService` for new pages.

### CEP / Address Lookup

`createNewOrder.js` calls `https://opencep.com/v1/{cep}` (external API) to auto-fill street and neighborhood fields from a Brazilian postal code.

### Category Images

Frontend maps `ECategorias` values to static images in `FrontEnd/Imgs/images/eachCategory/` (`bebida.jpg`, `lanche.jpg`, `combo.jpg`, `acompanhamento.jpg`).
