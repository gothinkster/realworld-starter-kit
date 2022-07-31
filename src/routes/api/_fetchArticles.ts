import { pageSize } from '~/libs/constants';
import * as api from '~/libs/api';

export const fetchArticles = async (search: string, token?: string) => {
  const searchParams = new URLSearchParams(search)

	const tab = searchParams.get('tab') || 'all';
	const page = Number(searchParams.get('page') || 1);
	const extraOptionalParams = ['tag', 'author', 'favorited']

	const endpoint = tab === 'feed' ? 'articles/feed' : 'articles';

	const q = new URLSearchParams();

	q.set('limit', `${pageSize}`);
	q.set('offset', `${(page - 1) * pageSize}`);

	extraOptionalParams.forEach(key => {
		const value = searchParams.get(key)
		if (value) {
			q.set(key, value)
		}
	})

	// FIXME: seems articlesCount not return the total ?
	// it will causing pagination not showing
	const { articles, articlesCount } = await api.get(
		`${endpoint}?${q}`,
		token
	);
  return {
    articles,
    pages: Math.ceil(articlesCount / pageSize)
  }
}