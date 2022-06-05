using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class _01Create12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks",
                column: "status",
                principalTable: "Statuses",
                principalColumn: "status");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks",
                column: "status",
                principalTable: "Statuses",
                principalColumn: "status",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
