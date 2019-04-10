using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecordBill.Domain;

namespace RecordBill.EFRepository.ModelConfig
{
    internal sealed class BillCategoryConfig : IEntityTypeConfiguration<BillCategory>
    {
        public void Configure(EntityTypeBuilder<BillCategory> builder)
        {
            builder.HasKey(e => e.ID);
            builder.Property(e => e.CreateTime)
                .IsRequired();
            builder.Property(e => e.UpdateTime)
                .IsRequired();
            builder.Property(e => e.UserID)
                .IsRequired();
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(20);
            builder.Property(e => e.Index)
                .IsRequired();
        }
    }
}
