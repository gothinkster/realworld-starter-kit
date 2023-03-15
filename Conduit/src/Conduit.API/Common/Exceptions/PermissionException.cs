using System.Runtime.Serialization;

namespace Conduit.API.Common.Exceptions
{
    [Serializable]
    public class PermissionException : Exception
    {
        public PermissionException()
        {
        }

        public PermissionException(string? message) : base(message)
        {
        }

        public PermissionException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected PermissionException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
