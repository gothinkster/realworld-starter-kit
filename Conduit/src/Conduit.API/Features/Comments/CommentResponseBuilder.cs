using AutoMapper;

namespace Conduit.API.Features.Comments;

public class CommentResponseBuilder
{
    private readonly IMapper _mapper;

    public CommentResponseBuilder(IMapper mapper)
    {
        _mapper = mapper;
    }

    public CommentResponse Build(Comment comment)
    {
        return _mapper.Map<CommentResponse>(comment);
    }

    public CommentsResponse Build(IEnumerable<Comment> comments)
    {
        return _mapper.Map<CommentsResponse>(comments);
    }
}
