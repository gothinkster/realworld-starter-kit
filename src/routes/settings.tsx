import { useStore } from '../store'
import { createStore } from 'solid-js/store'

import Form from '~/components/Form/Form'
import TextArea from '~/components/Form/TextArea'
import TextInput from '~/components/Form/TextInput'
import { useNavigate } from 'solid-app-router'

type SettingsState = {
	image: string
	username: string
	bio: string
	email: string
	password: string
	updatingUser?: boolean
}

export default () => {
	const navigate = useNavigate()

	const [store, { logout, updateUser }] = useStore()
	const [state, setState] = createStore<SettingsState>({
		image: store.currentUser.image || '',
		username: store.currentUser.username,
		bio: store.currentUser.bio || '',
		email: store.currentUser.email,
		password: ''
	})
	const updateState = (field: keyof SettingsState) => (ev: { target: HTMLInputElement }) =>
		setState(field, ev.target.value)

	const submitForm = () => {
		const user = Object.assign({}, state)
		if (!user.password) delete user.password
		if (!user.image) delete user.image
		setState({ updatingUser: true })
		return updateUser(user)
	}

	const logoutFn = async () => {
		await logout()
		navigate('/')
	}

	return (
		<div class='settings-page'>
			<div class='container page'>
				<div class='row'>
					<div class='col-md-6 offset-md-3 col-xs-12'>
						<h1 class='text-xs-center'>Your Settings</h1>
						<Form
							buttonText='Update Settings'
							submitFn={submitForm}
							postSubmitFn={async () => setState({ updatingUser: false })}
							redirect={`@${state.username}`}
						>
							<TextInput
								placeholder='URL of profile picture'
								value={state.image}
								onChange={updateState('image')}
								disabled={state.updatingUser}
							/>
							<TextInput
								placeholder='Your Name'
								value={state.username}
								onChange={updateState('username')}
								disabled={state.updatingUser}
							/>
							<TextArea
								value={state.bio}
								disabled={state.updatingUser}
								onChange={updateState('bio')}
								placeholder='Short bio about you'
							/>
							<TextInput
								placeholder='Email'
								value={state.email}
								onChange={updateState('email')}
								disabled={state.updatingUser}
							/>
							<TextInput
								type='password'
								placeholder='Password'
								value={state.password}
								onChange={updateState('password')}
								disabled={state.updatingUser}
							/>
						</Form>
						<hr />
						<button class='btn btn-outline-danger' onClick={logoutFn}>
							Or click here to logout.
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
