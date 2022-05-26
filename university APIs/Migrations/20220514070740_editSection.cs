using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace university_APIs.Migrations
{
    public partial class editSection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseSection",
                table: "Sections",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseSection",
                table: "Sections");
        }
    }
}
