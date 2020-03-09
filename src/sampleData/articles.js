export default (articlesCount = 1) =>
  JSON.stringify({
    articles: [
      {
        title: 'How to train your dragon',
        slug: 'how-to-train-your-dragon-5w7g2y',
        body: 'Very carefully.',
        createdAt: '2020-02-02T00:01:12.697Z',
        updatedAt: '2020-02-02T00:01:12.697Z',
        tagList: ['training', 'dragons'],
        description: 'Ever wonder how?',
        author: {
          username: 'jihchi',
          bio: null,
          image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
          following: false,
        },
        favorited: false,
        favoritesCount: 3,
      },
    ],
    articlesCount: articlesCount,
  });
