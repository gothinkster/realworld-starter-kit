import { Show } from 'solid-js'
import { useStore } from '~/store'
import NavLink from './NavLink'

export default () => {
	const [store] = useStore()

	return (
		<nav class='navbar navbar-light'>
			<div class='container'>
				<NavLink class='navbar-brand' route='/'>
					{store.appName}
				</NavLink>
				<ul class='nav navbar-nav pull-xs-right'>
					<li class='nav-item'>
						<NavLink class='nav-link' route='/'>
							Home
						</NavLink>
					</li>
					<Show
						when={store.currentUser}
						fallback={
							<>
								<li class='nav-item'>
									<NavLink class='nav-link' route='/login'>
										Sign in
									</NavLink>
								</li>
								<li class='nav-item'>
									<NavLink class='nav-link' route='/register'>
										Sign up
									</NavLink>
								</li>
							</>
						}
					>
						<li class='nav-item'>
							<NavLink class='nav-link' route='/editor'>
								<i class='ion-compose' /> New Post
							</NavLink>
						</li>
						<li class='nav-item'>
							<NavLink class='nav-link' route='/settings'>
								<i class='ion-gear-a' /> Settings
							</NavLink>
						</li>
						<li class='nav-item'>
							<NavLink class='nav-link' route='/profile' href={`@${store.currentUser.username}`}>
								{store.currentUser.username}
							</NavLink>
						</li>
					</Show>
				</ul>
			</div>
		</nav>
	)
}
