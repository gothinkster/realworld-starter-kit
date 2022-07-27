import { createComputed } from 'solid-js'
import { Outlet, useParams } from 'solid-app-router'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'
import ArticleList from '~/components/Article/ArticleList'

export default (props: { username: string; routeName: string }) => {
	const params = useParams()
	const { userId } = params

	const [store, { setPage, loadProfile, loadArticles, unfollow, follow }] = useStore()

	createComputed(() => loadProfile(userId.slice(1)))

	const handleClick = (ev: Event) => {
		ev.preventDefault()
		store.profile.following ? unfollow() : follow()
	}

	const handleSetPage = (page: number) => {
		setPage(page)
		loadArticles({})
	}

	const isUser = () => store.currentUser && userId === `@${store.currentUser.username}`

	return (
		<div class='profile-page'>
			<div class='user-info'>
				<div class='container'>
					<div class='row'>
						<div class='col-xs-12 col-md-10 offset-md-1'>
							<img src={store.profile?.image} class='user-img' alt='' />
							<h4 textContent={props.username} />
							<p>{store.profile?.bio}</p>
							{isUser() && (
								<NavLink
									active={false}
									route='/settings'
									class='btn btn-sm btn-outline-secondary action-btn'
								>
									<i class='ion-gear-a' /> Edit Profile Settings
								</NavLink>
							)}
							{store.token && !isUser() && (
								<button
									class='btn btn-sm action-btn'
									classList={{
										'btn-secondary': store.profile?.following,
										'btn-outline-secondary': !store.profile?.following
									}}
									onClick={handleClick}
								>
									<i class='ion-plus-round' /> {store.profile?.following ? 'Unfollow' : 'Follow'}{' '}
									{store.profile?.username}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			<div class='container'>
				<div class='row'>
					<div class='col-xs-12 col-md-10 offset-md-1'>
						<Outlet />

						<ArticleList
							articles={Object.values(store.articles)}
							totalPagesCount={store.totalPagesCount}
							onSetPage={handleSetPage}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
