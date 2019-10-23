
### Using the hosted API

Simply point your [API requests](https://github.com/gothinkster/realworld/tree/master/api) to
`https://conduit.productionready.io/api` and you're good to go!

### Routing Guidelines

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Uses JWT (store the token in localStorage)
    - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles

# Styles

Instead of having the Bootstrap theme included locally, we recommend loading the precompiled theme
from our CDN (our [header template](#header) does this by default):

```html
<link rel="stylesheet" href="//demo.productionready.io/main.css">
```

Alternatively, if you want to make modifications to the theme, check out the
[theme's repo](https://github.com/gothinkster/conduit-bootstrap-template).
