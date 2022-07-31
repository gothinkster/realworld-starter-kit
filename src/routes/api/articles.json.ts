import type { EndpointHandler } from '@builder.io/qwik-city';
import { components } from '~/libs/api-schema';
import { getSession } from '~/libs/getSession';
import { fetchArticles } from './_fetchArticles';

export const onGet: EndpointHandler<{
	articles: components['schemas']['Article'][]
	pages: number
} | void> = async ({ request }) => {
	// TODO: remove either this file or `_fetchArticles`
	// if the endpoint is called in SSR itself, it might not able to get user
	// - so I extract it into _fetchArticles files
  const { user } = getSession(request.headers.get("cookie"))
	const url = new URL(request.url)
	return await fetchArticles(url.search, user.token)
};
