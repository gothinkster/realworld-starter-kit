using System.Linq;
using Conduit.RestAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Conduit.RestAPI;

class FailedValidationResult : ObjectResult
{
    public FailedValidationResult(ModelStateDictionary modelState)
        : base(CreateErrorModel(modelState))
    {
        StatusCode = StatusCodes.Status422UnprocessableEntity;
    }

    static GenericErrorModel CreateErrorModel(ModelStateDictionary modelState)
    {
        return new GenericErrorModel
        {
            Errors = new()
            {
                Body = modelState.Keys
                    .SelectMany(key => modelState[key]!.Errors
                    .Select(x => $"{key}: {x.ErrorMessage}"))
                    .ToArray()
            }
        };
    }
}
