using System.Runtime.Serialization;

namespace Conduit.API.Common.Exceptions;

[Serializable]
public class ResourceNotFoundException : Exception
{
    public string ResourceName { get; } = string.Empty;

    public ResourceNotFoundException(string resourceName) : base(CreateMessage(resourceName))
    {
        ResourceName = resourceName;
    }

    public ResourceNotFoundException(string resourceName, Exception? innerException) : base(CreateMessage(resourceName), innerException)
    {
        ResourceName = resourceName;
    }

    protected ResourceNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    private static string CreateMessage(string name) => $"{name} not found.";
}
