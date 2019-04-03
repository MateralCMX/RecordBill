using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecordBill.Domain;

namespace RecordBill.EFRepository.ModelConfig
{
    internal sealed class LogConfig : IEntityTypeConfiguration<Log>
    {
        public void Configure(EntityTypeBuilder<Log> builder)
        {
            builder.HasKey(e => e.ID);
            builder.Property(e => e.CreateTime)
                .IsRequired();
            builder.Property(e => e.UpdateTime)
                .IsRequired();
            builder.Property(e => e.Application)
                .IsRequired();
            builder.Property(e => e.Callsite);
            builder.Property(e => e.Exception);
            builder.Property(e => e.Level)
                .IsRequired();
            builder.Property(e => e.Logger);
            builder.Property(e => e.Message)
                .IsRequired();
        }
    }
}
