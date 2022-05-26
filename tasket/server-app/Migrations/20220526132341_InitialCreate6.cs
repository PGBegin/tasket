using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class InitialCreate6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tasks",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "StartDatetimeScheduled",
                table: "Tasks",
                newName: "startDatetimeScheduled");

            migrationBuilder.RenameColumn(
                name: "StartDatetimeActual",
                table: "Tasks",
                newName: "startDatetimeActual");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "Tasks",
                newName: "shortDescription");

            migrationBuilder.RenameColumn(
                name: "LongDescription",
                table: "Tasks",
                newName: "longDescription");

            migrationBuilder.RenameColumn(
                name: "LatestUpdateUser",
                table: "Tasks",
                newName: "latestUpdateUser");

            migrationBuilder.RenameColumn(
                name: "LatestUpdateDatetime",
                table: "Tasks",
                newName: "latestUpdateDatetime");

            migrationBuilder.RenameColumn(
                name: "EndDatetimeScheduled",
                table: "Tasks",
                newName: "endDatetimeScheduled");

            migrationBuilder.RenameColumn(
                name: "EndDatetimeActual",
                table: "Tasks",
                newName: "endDatetimeActual");

            migrationBuilder.RenameColumn(
                name: "CreateUser",
                table: "Tasks",
                newName: "createUser");

            migrationBuilder.RenameColumn(
                name: "CreateDatetime",
                table: "Tasks",
                newName: "createDatetime");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Tasks",
                newName: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "title",
                table: "Tasks",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "startDatetimeScheduled",
                table: "Tasks",
                newName: "StartDatetimeScheduled");

            migrationBuilder.RenameColumn(
                name: "startDatetimeActual",
                table: "Tasks",
                newName: "StartDatetimeActual");

            migrationBuilder.RenameColumn(
                name: "shortDescription",
                table: "Tasks",
                newName: "ShortDescription");

            migrationBuilder.RenameColumn(
                name: "longDescription",
                table: "Tasks",
                newName: "LongDescription");

            migrationBuilder.RenameColumn(
                name: "latestUpdateUser",
                table: "Tasks",
                newName: "LatestUpdateUser");

            migrationBuilder.RenameColumn(
                name: "latestUpdateDatetime",
                table: "Tasks",
                newName: "LatestUpdateDatetime");

            migrationBuilder.RenameColumn(
                name: "endDatetimeScheduled",
                table: "Tasks",
                newName: "EndDatetimeScheduled");

            migrationBuilder.RenameColumn(
                name: "endDatetimeActual",
                table: "Tasks",
                newName: "EndDatetimeActual");

            migrationBuilder.RenameColumn(
                name: "createUser",
                table: "Tasks",
                newName: "CreateUser");

            migrationBuilder.RenameColumn(
                name: "createDatetime",
                table: "Tasks",
                newName: "CreateDatetime");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Tasks",
                newName: "Id");
        }
    }
}
