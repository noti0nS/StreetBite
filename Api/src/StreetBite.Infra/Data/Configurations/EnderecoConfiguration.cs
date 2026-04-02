using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreetBite.Core.Entities;

namespace StreetBite.Infra.Data.Configurations;

public sealed class EnderecoConfiguration : BaseEntityConfiguration<Endereco>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Endereco> builder)
    {
        builder.ToTable("enderecos");

        builder.Property(x => x.Cep);
        builder.Property(x => x.Street)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Number);

        builder.HasOne(x => x.Cliente)
            .WithMany(x => x.Enderecos)
            .HasForeignKey("cliente_id")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
