using Conduit.API.Common.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Conduit.API.Infrastructure;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

    public ApiExceptionFilterAttribute()
    {
        _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
        {
            { typeof(ValidationException), HandleValidationException },
            { typeof(ResourceNotFoundException), HandleResourceNotFoundException },
        };
    }

    public override void OnException(ExceptionContext context)
    {
        var type = context.Exception.GetType();

        if (_exceptionHandlers.TryGetValue(type, out var action))
        {
            action.Invoke(context);
            context.ExceptionHandled = true;

            return;
        }

        base.OnException(context);
    }

    private void HandleResourceNotFoundException(ExceptionContext context)
    {
        context.Result = new NotFoundResult();
    }

    private void HandleValidationException(ExceptionContext context)
    {
        var exception = (ValidationException)context.Exception;

        var messages = exception.Errors
            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
            .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());

        var details = new ValidationProblemDetails(messages)
        {
            Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1"
        };

        context.Result = new UnprocessableEntityObjectResult(details);
    }
}
