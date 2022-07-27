import { createStore } from 'solid-js/store'
import CardForm from '../Form/CardForm'
import TextArea from '../Form/TextArea'

const DEFAULT_AVATAR = 'https://api.realworld.io/images/smiley-cyrus.jpeg'

export default ({ avatarUrl, createComment }) => {
	const [state, setState] = createStore<{ body: string; isCreatingComment?: boolean }>({
			body: ''
		}),
		handleBodyChange = (event: { target: HTMLInputElement }) =>
			setState({ body: event.target.value })

	const createCommentHandler = (_ev: Event) => {
		setState({ isCreatingComment: true })
		return createComment({ body: state.body })
	}

	const postCommentCreation = () => setState({ isCreatingComment: false })

	return (
		<>
			<CardForm
				avatarUrl={avatarUrl ?? DEFAULT_AVATAR}
				buttonText='Post Comment'
				submitFn={createCommentHandler}
				postSubmitFn={postCommentCreation}
			>
				<TextArea
					placeholder='Write a comment...'
					value={state.body}
					disabled={state.isCreatingComment}
					onChange={handleBodyChange}
					rows='3'
				/>
			</CardForm>
		</>
	)
}
