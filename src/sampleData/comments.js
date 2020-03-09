export default () =>
  JSON.stringify({
    comments: [
      {
        id: 123,
        createdAt: '2020-02-16T04:18:57.852Z',
        updatedAt: '2020-02-16T04:18:57.852Z',
        body: 'this is a good comment',
        author: {
          username: 'Jihchi Lee',
          bio: 'yoyoyoyo',
          image: '',
          following: false,
        },
      },
      {
        id: 456,
        createdAt: '2018-12-28T07:23:23.888Z',
        updatedAt: '2018-12-28T07:23:23.888Z',
        body: 'you never know',
        author: {
          username: 'johnnyjacob',
          bio: null,
          image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
          following: false,
        },
      },
    ],
  });
