import { createComputed, For } from 'solid-js'
import { createStore } from 'solid-js/store'

import { useStore } from '~/store'
import ListErrors from '~/components/Form/ListErrors'
import { Article } from '~/types'

type EditorState = {
	body: string
	title: string
	tagInput: string
	tagList: string[]
	description: string
	inProgress?: boolean
	errors?: string[]
}

export default ({ slug, article }: { slug: string; article?: Article }) => {
	const [store, { createArticle, updateArticle }] = useStore()

	const [state, setState] = createStore<EditorState>({
		body: '',
		title: '',
		tagInput: '',
		description: '',
		tagList: []
	})
	const updateState = (field) => (ev) => setState(field, ev.target.value)
	const handleAddTag = () => {
		if (state.tagInput) {
			setState({ tagList: [...state.tagList, state.tagInput], tagInput: '' })
		}
	}
	const handleRemoveTag = (tag) => {
		!state.inProgress && setState('tagList', (tags) => tags.filter((t) => t !== tag))
	}
	const handleTagInputKeyDown = (ev) => {
		newLocal()
		switch (ev.keyCode) {
			case 13: // Enter
			case 9: // Tab
			case 188: // ,
				if (ev.keyCode !== 9) ev.preventDefault()
				handleAddTag()
				break
			default:
				break
		}
	}
	const submitForm = (ev: Event) => {
		ev.preventDefault()
		setState({ inProgress: true })
		const { inProgress, tagInput, ...articleFields } = state
		const p = slug ? updateArticle : createArticle
		p(articleFields)
			.then((receivedArticle: Article) => (location.hash = `/article/${receivedArticle.slug}`))
			.catch((errors: string[]) => setState({ errors: errors }))
			.finally(() => setState({ inProgress: false }))
	}

	createComputed(() => {
		if (!slug || article !== store.articles[slug]) return
		setState(article)
		newLocal()
	})

	const newLocal = () => {
		console.log({ tags: state.tagList })
		console.log({ article })
	}

	return (
		<div class='editor-page'>
			<div class='container page'>
				<div class='row'>
					<div class='col-md-10 offset-md-1 col-xs-12'>
						<ListErrors errors={state.errors} />
						<form>
							<fieldset>
								<fieldset class='form-group'>
									<input
										type='text'
										class='form-control form-control-lg'
										placeholder='Article Title'
										value={state.title}
										onChange={updateState('title')}
										disabled={state.inProgress}
									/>
								</fieldset>
								<fieldset class='form-group'>
									<input
										type='text'
										class='form-control'
										placeholder="What's this article about?"
										value={state.description}
										onChange={updateState('description')}
										disabled={state.inProgress}
									/>
								</fieldset>
								<fieldset class='form-group'>
									<textarea
										class='form-control'
										rows='8'
										placeholder='Write your article (in markdown)'
										value={state.body}
										onChange={updateState('body')}
										disabled={state.inProgress}
									></textarea>
								</fieldset>
								<fieldset class='form-group'>
									<input
										type='text'
										class='form-control'
										placeholder='Enter tags'
										value={state.tagInput}
										onChange={updateState('tagInput')}
										onBlur={handleAddTag}
										onKeyUp={handleTagInputKeyDown}
										disabled={state.inProgress}
									/>
									<div class='tag-list'>
										<For each={state.tagList}>
											{(tag) => (
												<span class='tag-default tag-pill'>
													<i class='ion-close-round' onClick={[handleRemoveTag, tag]} />
													{tag}
												</span>
											)}
										</For>
									</div>
								</fieldset>
								<button
									class='btn btn-lg pull-xs-right btn-primary'
									type='button'
									disabled={state.inProgress}
									onClick={submitForm}
								>
									Publish Article
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
