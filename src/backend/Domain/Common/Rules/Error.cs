using System;
using System.Collections.Generic;
using System.Linq;
using CSharpFunctionalExtensions;

namespace Conduit.Domain.Common;

public class Error : ICombine
{
    public IEnumerable<ErrorMessage> Messages { get; private set; }

    public Error(ErrorMessage messages)
        : this(new[] { messages })
    {
    }

    public Error(string errorCode, string message)
        : this(new[] {
            new ErrorMessage {
                ErrorCode = errorCode,
                Message = message }
            })
    {
    }

    public Error(IEnumerable<ErrorMessage> messages)
    {
        Messages = messages;
    }

    public ICombine Combine(ICombine value)
    {
        Error otherError = value as Error ?? throw new ArgumentException($"{nameof(value)} must be of type Error", nameof(value));
        IEnumerable<ErrorMessage> newMessageList =
            Messages.Union(otherError.Messages).ToArray();
        return new Error(newMessageList);
    }
}
