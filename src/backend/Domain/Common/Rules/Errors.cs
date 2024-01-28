namespace Conduit.Domain.Common;

static class Errors
{
    public static Error ValueIsInvalid(string entityName, string propertyName)
    {
        return new(
            errorCode: $"{entityName.ToLower()}.{propertyName.ToLower()}.value.is.invalid",
            message: $"{propertyName} is invalid"
        );
    }

    public static Error ValueIsRequired(string entityName, string propertyName)
    {
        return new(
            errorCode: $"{entityName.ToLower()}.{propertyName.ToLower()}.value.is.required",
            message: $"{propertyName} is required"
        );
    }

    public static Error NotFound(string? id = null)
    {
        string forId = id == null ? "" : $" for Id '{id}'";

        return new(
            errorCode: "record.not.found",
            message: $"Record not found{forId}"
        );
    }
}
