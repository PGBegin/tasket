using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class InitialCreate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Venue",
                table: "Tasks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Venue",
                table: "Tasks",
                type: "TEXT",
                nullable: true);
        }
    }
}
