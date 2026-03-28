using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreetBite.Core.Entities;

namespace StreetBite.Infra.Data.Configurations;

public sealed class ProdutoConfiguration : BaseEntityConfiguration<Produto>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Produto> builder)
    {
        builder.ToTable("produtos");

        builder.Property(x => x.Nome)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Preco)
            .HasPrecision(18, 2);

        builder.Property(x => x.Categoria)
            .HasConversion<string>()
            .IsRequired();
    }
}
