using Conduit.API.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class UpdateCommandValidator : AbstractValidator<UpdateCommand>
{
    public UpdateCommandValidator()
	{
        RuleFor(a => a.Payload.Title)
            .OptionalArgument();
    }

}