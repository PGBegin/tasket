using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class _01Create10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Statuses_StatusNavigationstatus",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_StatusNavigationstatus",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "StatusNavigationstatus",
                table: "Tasks");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_status",
                table: "Tasks",
                column: "status");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks",
                column: "status",
                principalTable: "Statuses",
                principalColumn: "status",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_status",
                table: "Tasks");

            migrationBuilder.AddColumn<int>(
                name: "StatusNavigationstatus",
                table: "Tasks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_StatusNavigationstatus",
                table: "Tasks",
                column: "StatusNavigationstatus");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Statuses_StatusNavigationstatus",
                table: "Tasks",
                column: "StatusNavigationstatus",
                principalTable: "Statuses",
                principalColumn: "status",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
