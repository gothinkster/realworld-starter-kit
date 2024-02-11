using Conduit.Domain;
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
            .HasConversion(id => id.Value, id => UserId.Create(id))
            .HasColumnName(nameof(User.Id));
        builder
            .OwnsOne(
                u => u.Email,
                userEmail =>
                {
                    userEmail.Property(email => email.Value)
                        .HasColumnName(nameof(User.Email))
                        .IsRequired();

                    userEmail.HasIndex(email => new { email.Value })
                        .IsUnique();
                }
            );
        builder
            .OwnsOne(
                u => u.Username,
                username =>
                {
                    username.Property(name => name.Value)
                        .HasColumnName(nameof(User.Username))
                        .IsRequired();

                    username.HasIndex(name => new { name.Value })
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
