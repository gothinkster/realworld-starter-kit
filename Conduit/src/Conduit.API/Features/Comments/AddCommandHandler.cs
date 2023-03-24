using AutoMapper;
using Conduit.API.Common.Exceptions;
using Conduit.API.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Conduit.API.Features.Comments;

public class AddCommandHandler : IRequestHandler<AddCommand, CommentResponse>
{
    private readonly AppDbContext _appDbContext;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly CommentResponseBuilder _responseBuilder;

    public AddCommandHandler(
        AppDbContext appDbContext,
        ICurrentUserAccessor currentUserAccessor,
        CommentResponseBuilder responseBuilder)
    {
        _appDbContext = appDbContext;
        _currentUserAccessor = currentUserAccessor;
        _responseBuilder = responseBuilder;
    }

    public async Task<CommentResponse> Handle(AddCommand request, CancellationToken cancellationToken)
    {
        var article = await _appDbContext.Articles
                     .FirstOrDefaultAsync(x => x.Slug == request.Slug, cancellationToken);

        if (article == null)
        {
            throw new ResourceNotFoundException(nameof(article));
        }

        var author = await _appDbContext.Users.FirstAsync(p => p.Id == _currentUserAccessor.GetCurrentUserId(), cancellationToken);

        var comment = new Comment
        {
            Author = author,
            Body = request.Payload.Comment.Body,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        article.Comments.Add(comment);

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return _responseBuilder.Build(comment);
    }
}
