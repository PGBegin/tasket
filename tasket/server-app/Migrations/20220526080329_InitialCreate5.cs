using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_app.Migrations
{
    public partial class InitialCreate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Tasks",
                newName: "StartDatetimeScheduled");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDatetime",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateUser",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDatetimeActual",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDatetimeScheduled",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LatestUpdateDatetime",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LatestUpdateUser",
                table: "Tasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDatetimeActual",
                table: "Tasks",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateDatetime",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "CreateUser",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "EndDatetimeActual",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "EndDatetimeScheduled",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "LatestUpdateDatetime",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "LatestUpdateUser",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "StartDatetimeActual",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "StartDatetimeScheduled",
                table: "Tasks",
                newName: "Date");
        }
    }
}
