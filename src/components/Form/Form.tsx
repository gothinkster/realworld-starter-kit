import { useNavigate } from 'solid-app-router'
import { createStore } from 'solid-js/store'
import Button from './Button'

import ListErrors from './ListErrors'

type FormState = {
	inProgress: boolean
	errors?: string[]
}

export default ({ buttonText, submitFn, children, postSubmitFn = () => {}, redirect = '/' }) => {
	const [state, setState] = createStore<FormState>({
		inProgress: false
	})

	const navigate = useNavigate()

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setState({ inProgress: true })
		submitFn(e)
			.then(() => navigate(redirect))
			.catch((errors: string[]) => setState({ errors }))
			.finally(() => setState({ inProgress: false }))

		return postSubmitFn()
	}

	return (
		<>
			<ListErrors errors={state.errors} />
			<form onSubmit={handleSubmit}>
				{children}
				<Button disabled={state.inProgress} type='submit' textContent={buttonText} />
			</form>
		</>
	)
}
