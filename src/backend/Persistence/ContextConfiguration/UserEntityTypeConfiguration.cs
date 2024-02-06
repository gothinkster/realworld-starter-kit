using Conduit.Domain.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Conduit.Persistence.ContextConfiguration;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .ToTable(name: "Users", schema: "Conduit")
            .HasKey(u => u.Id);

        builder
            .Property(u => u.Id)
            .UsePropertyAccessMode(PropertyAccessMode.Property)
            .HasColumnName(nameof(User.Email));
        builder
            .Ignore(u => u.Email);
        builder
            .OwnsOne(
                u => u.Username,
                name =>
                {
                    name.Property(name => name.Value)
                        .HasColumnName(nameof(User.Username));

                    name.HasIndex(name => new { name.Value })
                        .IsUnique();
                }
            );
        builder
            .Property(u => u.Image)
            .IsRequired();
        builder
            .Property(u => u.Bio)
            .IsRequired();
        builder
            .Property(u => u.HashedPassword)
            .IsRequired();
    }
}
