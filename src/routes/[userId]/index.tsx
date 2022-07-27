import { createComputed } from 'solid-js'
import { useParams } from 'solid-app-router'

import { useStore } from '~/store'
import NavLink from '~/components/NavBar/NavLink'

export default () => {
	const { userId } = useParams()

	const [_, { loadArticles }] = useStore()

	createComputed(() => loadArticles({ author: userId.slice(1) }))

	return (
		<div class='articles-toggle'>
			<ul class='nav nav-pills outline-active'>
				<li class='nav-item'>
					<NavLink class='nav-link' active={true} href={`/${userId}`}>
						My Articles
					</NavLink>
				</li>

				<li class='nav-item'>
					<NavLink class='nav-link' active={false} href={`/${userId}/favorites`}>
						Favorited Articles
					</NavLink>
				</li>
			</ul>
		</div>
	)
}
