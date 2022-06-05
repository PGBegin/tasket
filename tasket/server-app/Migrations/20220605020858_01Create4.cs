using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class _01Create4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Statuses_status1",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_status1",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "status1",
                table: "Tasks");

            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "Tasks",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

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
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Statuses_status",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_status",
                table: "Tasks");

            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "status1",
                table: "Tasks",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_status1",
                table: "Tasks",
                column: "status1");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Statuses_status1",
                table: "Tasks",
                column: "status1",
                principalTable: "Statuses",
                principalColumn: "status",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
