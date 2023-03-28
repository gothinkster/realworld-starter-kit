using Conduit.API.Features.Tags;

namespace Conduit.API.Features.Articles;

public class ArticleTag
{
    public int ArticleId { get; set; }
    public Article? Article { get; set; }

    public string TagId { get; set; } = string.Empty;
    public Tag? Tag { get; set; }
}
