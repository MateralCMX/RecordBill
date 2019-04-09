using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecordBill.Domain;

namespace RecordBill.EFRepository.ModelConfig
{
    internal sealed class BillConfig : IEntityTypeConfiguration<Bill>
    {
        public void Configure(EntityTypeBuilder<Bill> builder)
        {
            builder.HasKey(e => e.ID);
            builder.Property(e => e.CreateTime)
                .IsRequired();
            builder.Property(e => e.UpdateTime)
                .IsRequired();
            builder.Property(e => e.Amount)
                .IsRequired()
                .HasColumnType("money");
            builder.Property(e => e.Category)
                .IsRequired()
                .HasMaxLength(20);
            builder.Property(e => e.Contents)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(e => e.RecordDate)
                .IsRequired()
                .HasColumnType("Date");
            builder.Property(e => e.UserID)
                .IsRequired();
        }
    }
}
