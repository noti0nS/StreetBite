using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreetBite.Core.Entities;

namespace StreetBite.Infra.Data.Configurations;

public sealed class ItemConfiguration : BaseEntityConfiguration<Item>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Item> builder)
    {
        builder.ToTable("itens");

        builder.Property(x => x.Quantidade)
            .IsRequired();

        builder.Property(x => x.PrecoUnitario)
            .HasPrecision(18, 2);

        builder.HasOne(x => x.Produto)
            .WithMany(x => x.Itens)
            .HasForeignKey("produto_id")
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Comanda)
            .WithMany(x => x.Itens)
            .HasForeignKey("comanda_id")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
