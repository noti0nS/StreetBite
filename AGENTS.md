# StreetBite – Copilot Instructions

## Project Overview

Food truck management platform for sales, menu, orders, and customers.

- **Backend**: Spring Boot 3.4.1 / Java 21, Maven, H2 (in-memory, dev) / PostgreSQL (prod)
- **Frontend**: Vanilla HTML + CSS + JS, no build system — served via Live Server

---

## Build & Run Commands

### Backend

All commands run from `Backend/sb_api/`.

```bash
# Run the application
./mvnw spring-boot:run

# Build (skip tests)
./mvnw package -DskipTests

# Run all tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=StreetBiteApplicationTests
```

The app starts on **port 8080**. H2 console is available at `http://localhost:8080/h2-console` (datasource: `jdbc:h2:mem:testdb`, user: `sa`, no password).

### Frontend

Open any `.html` file with Live Server (VS Code extension). The backend CORS config only allows **`http://127.0.0.1:5500`** — use that origin, not `localhost:5500`.

---

## Architecture

```
Backend/sb_api/src/main/java/com/streetbite/streetbite_api/
├── controller/     REST endpoints (@RestController, @RequestMapping("/api/v1/..."))
├── service/        Business logic; injected into controllers via @RequiredArgsConstructor
├── repository/     Spring Data JPA interfaces (extend JpaRepository)
├── model/          JPA entities + DTOs
│   ├── dto/        Request/Response DTOs used across controller↔service boundary
│   └── enums/      ComandaStatusEnum, MetodoDePagamentoEnum, CategoriasEnum
└── security/       WebConfig.java — CORS configuration

FrontEnd/
├── landPage.html           Entry page
├── Pages/Iframes/          Per-feature HTML pages (home, menu, requests, createNewOrder, settings)
├── Scripts/                One JS file per page + service.js (ApiService class) + requests.js
└── Styles/                 One CSS file per page
```

### Core Domain Model

- **Comanda** (order): has many `Item`s, optionally linked to a `Cliente`. Carries `status`, `metodoDePagamento`, auto-generated 4-char alphanumeric `codigoDoPedido`, and computed `subtotal`.
- **Item**: join between `Comanda` and `Produto`. `precoUnitario` is automatically set from `Produto.preco` when `setProduto()` is called. `getTotalItem()` = `precoUnitario × quantidade`.
- **Produto**: menu item with `nome`, `preco`, `categoria` (enum).
- **Cliente**: customer with `nome`, `telefone`, and a list of `Endereco`.

### Request/Response Flow

Controllers accept DTOs (not entities), delegate to Services, which call Repositories. `Produto` endpoints are an exception — they use the entity directly in controller + service.

### Bidirectional JPA Relationships

All bidirectional `@OneToMany`/`@ManyToOne` pairs use `@JsonManagedReference` on the parent side and `@JsonBackReference` on the child side to prevent infinite JSON serialization loops.

---

## Key Conventions

### Domain Language: Portuguese

All entity names, field names, enum values, service methods, and endpoint paths are in Portuguese. Follow this when adding new code:

- Order/bill → `Comanda`; Product → `Produto`; Customer → `Cliente`; Address → `Endereco`; Item stays `Item`

### Enums

- `ComandaStatusEnum`: `PENDENTE`, `EM_PRODUCAO`, `FINALIZADO`
- `MetodoDePagamentoEnum`: `CRÉDITO`, `DÉBITO`, `DINHEIRO`, `PIX`
- `CategoriasEnum`: `ACOMPANHAMENTO`, `BEBIDA`, `COMBO`, `LANCHE`

### Lombok Usage

Entities use `@Data` + `@NoArgsConstructor`. Services/controllers use `@RequiredArgsConstructor` for constructor injection (no `@Autowired`).

### Frontend API Access

`FrontEnd/Scripts/service.js` exports an `ApiService` class (base URL injected in constructor). Import it with ES module syntax:

```js
import ApiService from "./service.js";
const api = new ApiService("http://localhost:8080");
```

Older/simpler pages call `fetch('http://localhost:8080/api/v1/...')` directly. Prefer `ApiService` for new pages.

### CEP / Address Lookup

`createNewOrder.js` calls `https://opencep.com/v1/{cep}` (external API) to auto-fill street and neighborhood fields from a Brazilian postal code.

### Category Images

Frontend maps `CategoriasEnum` values to static images in `FrontEnd/Imgs/images/eachCategory/` (`bebida.jpg`, `lanche.jpg`, `combo.jpg`, `acompanhamento.jpg`).
