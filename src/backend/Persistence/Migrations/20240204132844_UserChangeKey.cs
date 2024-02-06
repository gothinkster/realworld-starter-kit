using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conduit.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UserChangeKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "Conduit",
                table: "Users",
                newName: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                schema: "Conduit",
                table: "Users",
                newName: "Id");
        }
    }
}
