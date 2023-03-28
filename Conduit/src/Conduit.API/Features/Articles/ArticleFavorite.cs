using Conduit.API.Features.Users;

namespace Conduit.API.Features.Articles;

public class ArticleFavorite
{
    public int ArticleId { get; set; }
    public Article? Article { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; } 
}
