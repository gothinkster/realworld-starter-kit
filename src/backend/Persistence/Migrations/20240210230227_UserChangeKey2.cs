using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conduit.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UserChangeKey2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                schema: "Conduit",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Id",
                schema: "Conduit",
                table: "Users",
                type: "TEXT",
                nullable: true,
                defaultValue: "");

            migrationBuilder.Sql("update Users set Id = (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                schema: "Conduit",
                table: "Users",
                nullable: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                schema: "Conduit",
                table: "Users",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                schema: "Conduit",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                schema: "Conduit",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                schema: "Conduit",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Id",
                schema: "Conduit",
                table: "Users");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                schema: "Conduit",
                table: "Users",
                column: "Email");
        }
    }
}
