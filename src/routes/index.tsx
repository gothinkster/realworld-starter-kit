import { useLocation } from 'solid-app-router'
import { createComputed, createMemo, For, Show, Suspense, useTransition } from 'solid-js'

import { useStore } from '~/store'
import NavLink from '~/components/NavLink'
import ArticleList from '~/components/Article/ArticleList'

export default function Home() {
	const [store, { loadArticles, setPage }] = useStore()
	console.log('hi')
	const { token, appName } = store
	const { query } = useLocation()

	const tab = createMemo(() => {
		const search = Object.keys(query).map((key) => [key, query[key]])
		if (!search) return token ? 'feed' : 'all'
		const q = new URLSearchParams(search)
		return q.get('tab')
	}, [query])

	console.log({ tab })

	const [, start] = useTransition()

	const getPredicate = () => {
		switch (tab()) {
			case 'feed':
				return { myFeed: true }
			case 'all':
				return {}
			case undefined:
				return undefined
			default:
				return { tag: tab() }
		}
	}

	const handleSetPage = (page) => {
		start(() => {
			setPage(page)
			loadArticles(getPredicate())
		})
	}

	createComputed(() => loadArticles(getPredicate()))

	return (
		<main>
			<div class='home-page'>
				<div class='banner'>
					<div class='container'>
						<h1 class='logo-font' textContent={appName} />
						<p>A place to share your knowledge.</p>
					</div>
				</div>

				<div class='container page'>
					<div class='row'>
						<div class='col-md-9'>
							<div class='feed-toggle'>
								<ul class='nav nav-pills outline-active'>
									{token && (
										<li class='nav-item'>
											<NavLink class='nav-link' href='?tab=feed' active={tab() === 'feed'}>
												Your Feed
											</NavLink>
										</li>
									)}
									<li class='nav-item'>
										<NavLink class='nav-link' href='?tab=all' active={tab() === 'all'}>
											Global Feed
										</NavLink>
									</li>
									<Show when={tab() !== 'all' && tab() !== 'feed'}>
										<li class='nav-item'>
											<a href='' class='nav-link active'>
												<i class='ion-pound' /> {tab()}
											</a>
										</li>
									</Show>
								</ul>
							</div>

							<ArticleList
								articles={Object.values(store.articles)}
								totalPagesCount={store.totalPagesCount}
								currentPage={store.page}
								onSetPage={handleSetPage}
							/>
						</div>

						<div class='col-md-3'>
							<div class='sidebar'>
								<p>Popular Tags</p>
								<Suspense fallback='Loading tags...'>
									<div class='tag-list'>
										<For each={store.tags as string[]}>
											{(tag) => (
												<a href={`#/?tab=${tag}`} class='tag-pill tag-default'>
													{tag}
												</a>
											)}
										</For>
									</div>
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
