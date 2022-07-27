import { createStore } from 'solid-js/store'

import { useStore } from '~/store'
import Form from '~/components/Form/Form'
import TextInput from '~/components/Form/TextInput'
import NavLink from '~/components/NavBar/NavLink'

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

	return (
		<div class='auth-page'>
			<div class='container page'>
				<div class='row'>
					<div class='col-md-6 offset-md-3 col-xs-12'>
						<h1 class='text-xs-center' textContent='Sign up' />
						<p class='text-xs-center'>
							<NavLink route='login'>Have an account?</NavLink>
						</p>
						<Form
							buttonText='Sign Up'
							submitFn={() => register(state.username, state.email, state.password)}
						>
							<TextInput
								placeholder='Username'
								value={state.username}
								onChange={(event: { target: HTMLInputElement }) =>
									setState({ username: event.target.value })
								}
							/>
							<TextInput
								placeholder='Email'
								value={state.email}
								onChange={(event: { target: HTMLInputElement }) =>
									setState({ email: event.target.value })
								}
							/>
							<TextInput
								placeholder='Password'
								type='password'
								value={state.password}
								onChange={(event: { target: HTMLInputElement }) =>
									setState({ password: event.target.value })
								}
							/>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
