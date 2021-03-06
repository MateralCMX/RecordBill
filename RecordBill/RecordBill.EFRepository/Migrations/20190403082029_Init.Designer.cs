﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RecordBill.EFRepository;

namespace RecordBill.EFRepository.Migrations
{
    [DbContext(typeof(RecordBillDbContext))]
    [Migration("20190403082029_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RecordBill.Domain.Bill", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("money");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Contents")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<DateTime>("CreateTime");

                    b.Property<DateTime>("RecordDate")
                        .HasColumnType("Date");

                    b.Property<DateTime>("UpdateTime");

                    b.Property<Guid>("UserID");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Bill");
                });

            modelBuilder.Entity("RecordBill.Domain.BillCategory", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreateTime");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<DateTime>("UpdateTime");

                    b.Property<Guid>("UserID");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("BillCategory");
                });

            modelBuilder.Entity("RecordBill.Domain.Log", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Application")
                        .IsRequired();

                    b.Property<string>("Callsite");

                    b.Property<DateTime>("CreateTime");

                    b.Property<string>("Exception");

                    b.Property<string>("Level")
                        .IsRequired();

                    b.Property<string>("Logger");

                    b.Property<string>("Message")
                        .IsRequired();

                    b.Property<DateTime>("UpdateTime");

                    b.HasKey("ID");

                    b.ToTable("Log");
                });

            modelBuilder.Entity("RecordBill.Domain.User", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Account")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<DateTime>("CreateTime");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<DateTime>("UpdateTime");

                    b.Property<string>("WeChatOpenID");

                    b.HasKey("ID");

                    b.ToTable("User");
                });

            modelBuilder.Entity("RecordBill.Domain.Bill", b =>
                {
                    b.HasOne("RecordBill.Domain.User", "User")
                        .WithMany("Bills")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RecordBill.Domain.BillCategory", b =>
                {
                    b.HasOne("RecordBill.Domain.User", "User")
                        .WithMany("BillCategories")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
