using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StreetBite.Core.Entities;

namespace StreetBite.Infra.Data.Configurations;

public sealed class ClienteConfiguration : BaseEntityConfiguration<Cliente>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Cliente> builder)
    {
        builder.ToTable("clientes");

        builder.Property(x => x.Nome)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Email)
            .HasMaxLength(200);

        builder.Property(x => x.Telefone)
            .HasMaxLength(25);
    }
}
