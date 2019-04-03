using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecordBill.Domain;

namespace RecordBill.EFRepository.ModelConfig
{
    internal sealed class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(e => e.ID);
            builder.Property(e => e.CreateTime)
                .IsRequired();
            builder.Property(e => e.UpdateTime)
                .IsRequired();
            builder.Property(e => e.Account)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(32);
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50);
            builder.Property(e => e.WeChatOpenID);
        }
    }
}
