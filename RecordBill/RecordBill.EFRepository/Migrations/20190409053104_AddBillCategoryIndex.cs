using Microsoft.EntityFrameworkCore.Migrations;

namespace RecordBill.EFRepository.Migrations
{
    public partial class AddBillCategoryIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "BillCategory",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "BillCategory");
        }
    }
}
