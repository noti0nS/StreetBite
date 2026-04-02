using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StreetBite.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDescricaoFieldProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "produtos",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "produtos");
        }
    }
}
