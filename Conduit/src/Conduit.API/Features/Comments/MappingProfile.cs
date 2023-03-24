using AutoMapper;

namespace Conduit.API.Features.Comments;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Comment, CommentResponse>()
            .ForCtorParam(nameof(CommentResponse.Comment), o => o.MapFrom(c => c));

        CreateMap<IEnumerable<Comment>, CommentsResponse>()
            .ForCtorParam(nameof(CommentsResponse.Comments), o => o.MapFrom(c => c));

        CreateMap<Comment, CommentResponseData>();
    }
}
