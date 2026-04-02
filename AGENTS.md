# StreetBite Copilot Instructions

## Project shape

StreetBite is a food-truck management web app with a .NET 10 backend and a static vanilla-JS frontend.

- `Api/src/StreetBite.Api` is the HTTP layer: Minimal APIs, endpoint grouping, request/response mapping, and app startup.
- `Api/src/StreetBite.Core` holds entities, enums, constants, validation contracts, and the `Result`/`Result<T>` model.
- `Api/src/StreetBite.Infra` contains EF Core persistence, fluent configurations, and migrations for PostgreSQL.
- `FrontEnd/` is a browser app served as static files; `streetBite.js` is the shell that loads page HTML and page scripts dynamically.

## Commands

Backend:

```bash
dotnet build Api/src/StreetBite.Api/StreetBite.Api.csproj
dotnet run --project Api/src/StreetBite.Api/StreetBite.Api.csproj
```

Frontend:

```bash
cd FrontEnd
npm install
npx prettier --check .
npx prettier --write Scripts/menu.js
```

Full stack:

```bash
docker compose up --build
```

There is no test project in the current tree, so there is no repo-specific single-test command yet.

## Architecture

- `Program.cs` only wires shared services and maps the feature groups.
- `ProdutosEndpoints` and `ComandasEndpoints` own the route surfaces; item routes live under the comanda group.
- Services return `Result` / `Result<T>` and endpoints translate those into `ApiResponse<T>` or `PagedApiResponse<T>`.
- `ValidationRequestFilter` runs for any endpoint argument implementing `IValidation`.
- `GlobalExceptionHandler` returns a JSON `ApiResponse<object>` for unhandled failures.
- EF Core mappings use fluent configs in `Infra/Data/Configurations`; `BaseEntityConfiguration` defines the shared audit columns.
- Frontend API calls go through `FrontEnd/Scripts/service.js`, which unwraps `data` responses and surfaces wrapped errors.

## Conventions

- Keep domain terms in Portuguese: `Produto`, `Comanda`, `Item`, `Cliente`, `Endereco`.
- Use `I*` for interfaces and keep concrete services/entities sealed where the codebase already does.
- Preserve the `/api/v1/...` route shape and the existing response envelope behavior.
- Product create/update requests from the frontend must be sent as `{ data }` to `/api/v1/produtos`.
- Category values are normalized through `FrontEnd/Scripts/productCategories.js`; do not duplicate that mapping elsewhere.
- `streetBite.js` injects `menu.js` and `requests.js` as ES modules, so page scripts that import helpers must keep `type="module"`.
- Use the `FrontEnd/` path casing exactly.
