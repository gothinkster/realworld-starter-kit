using Conduit.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Conduit.Persistence.ContextConfiguration;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        ValueConverter<UserEmail?, string> userIdConverter = new(
            v => v!.Value,
            v => new UserEmail(v));

        builder
            .ToTable(name: "Users", schema: "Conduit")
            .HasKey(u => u.Id);

        builder
            .Property(u => u.Id)
            .HasConversion(userIdConverter);
        builder
            .Property(u => u.Username)
            .IsRequired();
        builder
            .Property(u => u.Image)
            .IsRequired();
        builder
            .Property(u => u.Bio)
            .IsRequired();
        builder
            .Property(u => u.HashedPassword)
            .IsRequired();

        builder
            .HasIndex(u => new { u.Username })
            .IsUnique();

    }
}
