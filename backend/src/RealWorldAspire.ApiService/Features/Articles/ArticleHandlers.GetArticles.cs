using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RealWorldAspire.ApiService.Data;
using RealWorldAspire.ApiService.Data.Models;

namespace RealWorldAspire.ApiService.Features.Articles;

public static partial class ArticleHandlers
{
    public static async Task<IResult> GetArticles(
        [AsParameters] GetArticlesRequest request,
        ClaimsPrincipal principal,
        UserManager<AppUser> userManager,
        RealWorldDbContext dbContext)
    {
        const int defaultLimit = 20;
        int offset = request.Offset ?? 0;
        int limit = request.Limit ?? defaultLimit;

        var user = await userManager.GetUserAsync(principal);

        IQueryable<Article> query = dbContext.Articles
                .Include(x => x.Author)
            ;

        if (request.Tag != null)
        {
            query = query.Where(x => x.Tags.Any(t => t.Name == request.Tag));
        }

        if (request.Author != null)
        {
            query = query.Where(x => x.Author.UserName == request.Author);
        }

        if (request.Favorited != null)
        {
            query = query.Where(x => x.FavoritedByUsers.Any(u => u.UserName == request.Favorited));
        }

        var totalCount = await query.CountAsync();

        var articles = await query
            .Include(x => x.Author)
            .OrderByDescending(x => x.CreatedAt)
            .Skip(offset)
            .Take(limit)
            .Select(x => new GetArticlesResponse.Article()
            {
                Slug = x.Slug,
                Title = x.Title,
                Description = x.Description,
                TagList = x.Tags.Select(t => t.Name).ToList(),
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt,
                Favorited = user != null && x.FavoritedByUsers.Any(u => u.Id == user.Id),
                FavoritesCount = x.FavoritedByUsers.Count,
                Author = new GetArticlesResponse.Article.AuthorDto
                {
                    Username = x.Author.UserName,
                    Bio = x.Author.Bio,
                    Image = x.Author.Image,
                    Following = user != null && x.Author.Followers.Any(u => u.FollowerId == user.Id),
                }
            })
            .ToListAsync();

        return TypedResults.Ok(new GetArticlesResponse { Articles = articles, ArticlesCount = totalCount });
    }
}
