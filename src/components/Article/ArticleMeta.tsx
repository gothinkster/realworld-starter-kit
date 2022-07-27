import NavLink from '~/components/NavBar/NavLink'
import { JSX, Show } from 'solid-js'

export default (props: {
	article: {
		author: {
			username: string
			image: string
		}
		createdAt: string | number | Date
		slug: string
	}
	canModify: any
	onDelete: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
}) => {
	return (
		<div class='article-meta'>
			<NavLink href={`@${props.article?.author.username}`} route='/profile'>
				<img src={props.article?.author.image} alt='' />
			</NavLink>

			<div class='info'>
				<NavLink href={`@${props.article?.author.username}`} route='/profile' class='author'>
					{props.article?.author.username}
				</NavLink>
				<span class='date'>{new Date(props.article?.createdAt).toDateString()}</span>
			</div>

			<Show when={props.canModify} fallback={<span />}>
				<span>
					<NavLink href={`/editor/${props.article.slug}`} class='btn btn-outline-secondary btn-sm'>
						<i class='ion-edit' /> Edit Article
					</NavLink>{' '}
					<button class='btn btn-outline-danger btn-sm' onClick={props.onDelete}>
						<i class='ion-trash-a' /> Delete Article
					</button>
				</span>
			</Show>
		</div>
	)
}
