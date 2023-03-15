using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Articles;

public class DeleteCommandHandler : IRequestHandler<DeleteCommand>
{
    private readonly AppDbContext _appDbContext;

    public DeleteCommandHandler(AppDbContext appDbContext)
	{
        _appDbContext = appDbContext;
    }

    public async Task Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext.Articles
                   .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if (article is null)
        {
            throw new ResourceNotFoundException(nameof(Article));
        }

        _appDbContext.Articles.Remove(article);
        await _appDbContext.SaveChangesAsync(cancellationToken);
    }
}
