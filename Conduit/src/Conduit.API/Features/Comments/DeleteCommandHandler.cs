using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Comments;

public class DeleteCommandHandler : IRequestHandler<DeleteCommand>
{
    private readonly AppDbContext _appDbContext;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public DeleteCommandHandler(
        AppDbContext appDbContext,
        ICurrentUserAccessor currentUserAccessor)
    {
        _appDbContext = appDbContext;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext.Articles
            .Include(a => a.Comments)
            .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if (article is null)
        {
            throw new ResourceNotFoundException(nameof(article));
        }

        var comment = article.Comments.FirstOrDefault(x => x.Id == request.Id);
        if (comment == null)
        {
            throw new ResourceNotFoundException(nameof(comment));
        }

        if(_currentUserAccessor.UserId is null || comment.AuthorId != _currentUserAccessor.UserId)
        {
            throw new PermissionException();
        }

        article.Comments.Remove(comment);
        await _appDbContext.SaveChangesAsync(cancellationToken);
    }
}
