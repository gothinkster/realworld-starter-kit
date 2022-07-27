import { createComputed, createSignal, For, Show, Suspense, useTransition } from 'solid-js'

import { useStore } from '~/store'
import ArticleList from '~/components/Article/ArticleList'

export default () => {
	const [store, { loadArticles, setPage }] = useStore()
	const { token, appName } = store
	const [tab, setTab] = createSignal(token ? 'feed' : 'all')

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

	const handleSetPage = (page: number) => {
		start(() => {
			setPage(page)
			loadArticles(getPredicate())
		})
	}

	createComputed(() => loadArticles(getPredicate()))

	return (
		<div class='home-page'>
			<div class='banner'>
				<div class='container'>
					<h1 class='logo-font' textContent={appName} />
					<p>A place to share your knowledge.</p>
				</div>
			</div>

			<div class='container page'>
				<div class='row flex-column-reverse flex-md-row'>
					<div class='col-md-9'>
						<div class='feed-toggle'>
							<ul class='nav nav-pills outline-active'>
								{token && (
									<li class='nav-item'>
										<a
											href=''
											class='nav-link'
											classList={{ active: tab() === 'feed' }}
											onClick={() => setTab('feed')}
										>
											Your Feed
										</a>
									</li>
								)}
								<li class='nav-item'>
									<a
										href=''
										class='nav-link'
										classList={{ active: tab() === 'all' }}
										onClick={() => setTab('all')}
									>
										Global Feed
									</a>
								</li>
								<Show when={tab() && tab() !== 'all' && tab() !== 'feed'}>
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
									<For each={store.tags}>
										{(tag) => (
											<a
												href=''
												onclick={() => {
													setTab(tag)
												}}
												class='tag-pill tag-default'
											>
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
	)
}
