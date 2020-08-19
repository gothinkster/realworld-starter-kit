import { articleList } from './articleList';
import { defaultArticles } from '../../store/reducers/shared';
import assert from 'assert';
import { renderHelper } from '../../tests/helpers';

describe('Article List', () => {
  it('Should Render', () => {
    const host = document.createElement('div');
    host.articles = defaultArticles;
    renderHelper(articleList, host);
  });

  it('Should handle event', () => {
    let storedIndex = 0;

    const host = document.createElement('div');
    host.articles = { loading: false, list: [], page: 0, pageAmount: 5 };

    articleList.onPageLinkClick.connect(host, 'onPageLinkClick');

    let target = renderHelper(articleList, host);
    target.addEventListener('PageLinkClick', ({ detail: { index } }) => (storedIndex = index));

    target.getElementsByClassName('pagination')[0].getElementsByTagName('li')[2].click();
    expect(storedIndex).toBe(2);
  });

  it('Should render articles', () => {
    const host = document.createElement('div');

    host.articles = {
      loading: false,
      list: [baseArticle(), baseArticle(), baseArticle()],
      page: 0,
      pageAmount: 5,
    };

    const target = renderHelper(articleList, host);

    expect(host.getElementsByTagName('home-article').length).toBe(3);
  });
});

function baseArticle() {
  return {
    title: 'Test',
    slug: 'test-673m6k',
    body: 'Test 2',
    createdAt: '2020-08-16T20:05:05.928Z',
    updatedAt: '2020-08-16T20:05:05.928Z',
    tagList: [],
    description: 'Test 1',
    author: {
      username: 'TestingCypress',
      bio: null,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1024px-SNice.svg.png',
      following: false,
    },
    favorited: false,
    favoritesCount: 0,
  };
}
