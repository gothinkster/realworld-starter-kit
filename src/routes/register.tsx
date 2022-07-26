import { createStore } from 'solid-js/store'

import NavLink from '~/components/NavBar/NavLink'
import ListErrors from '~/components/Form/ListErrors'
import { useStore } from '../store'

type AuthState = {
	username: string
	email: string
	password: string
	inProgress: boolean
	errors?: string[]
}

export default () => {
	const [, { register }] = useStore()
	const [state, setState] = createStore<AuthState>({
		username: '',
		email: '',
		password: '',
		inProgress: false
	})
	const handleSubmit = (e) => {
		e.preventDefault()
		setState({ inProgress: true })
		register(state.username, state.email, state.password)
			.then(() => (location.hash = '/'))
			.catch((errors: string[]) => setState({ errors }))
			.finally(() => setState({ inProgress: false }))
	}

	return (
		<div class='auth-page'>
			<div class='container page'>
				<div class='row'>
					<div class='col-md-6 offset-md-3 col-xs-12'>
						<h1 class='text-xs-center' textContent='Sign up' />
						<p class='text-xs-center'>
							<NavLink route='login'>Have an account?</NavLink>
						</p>
						<ListErrors errors={state.errors} />
						<form onSubmit={handleSubmit}>
							<fieldset class='form-group'>
								<input
									class='form-control form-control-lg'
									type='text'
									placeholder='Username'
									value={state.username}
									onChange={(e) => {
										const t = e.target as HTMLInputElement
										return setState({ username: t.value })
									}}
								/>
							</fieldset>
							<fieldset class='form-group'>
								<input
									class='form-control form-control-lg'
									type='text'
									placeholder='Email'
									value={state.email}
									onChange={(e) => {
										const t = e.target as HTMLInputElement
										return setState({ email: t.value })
									}}
								/>
							</fieldset>
							<fieldset class='form-group'>
								<input
									class='form-control form-control-lg'
									type='password'
									placeholder='Password'
									value={state.password}
									onChange={(e) => {
										const t = e.target as HTMLInputElement
										return setState({ password: t.value })
									}}
								/>
							</fieldset>
							<button
								class='btn btn-lg btn-primary pull-xs-right'
								type='submit'
								disabled={state.inProgress}
								textContent='Sign up'
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
