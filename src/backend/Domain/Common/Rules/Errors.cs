namespace Conduit.Domain.Common;

static class Errors
{
    public static Error ValueIsInvalid(string entityName, string propertyName)
    {
        return new()
        {
            ErrorCode = $"{entityName.ToLower()}.{propertyName.ToLower()}.value.is.invalid",
            Message = $"{propertyName} is invalid"
        };
    }

    public static Error ValueIsRequired(string entityName, string propertyName)
    {
        return new()
        {
            ErrorCode = $"{entityName.ToLower()}.{propertyName.ToLower()}.value.is.required",
            Message = $"{propertyName} is required"
        };
    }

    public static Error NotFound(string? id = null)
    {
        string forId = id == null ? "" : $" for Id '{id}'";

        return new()
        {
            ErrorCode = "record.not.found",
            Message = $"Record not found{forId}"
        };
    }
}
