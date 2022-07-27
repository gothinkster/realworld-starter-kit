import { Parser, Lexer } from 'marked'
import { onMount } from 'solid-js'
import { useNavigate, useParams } from 'solid-app-router'

import { useStore } from '~/store'
import Comments from '~/components/Article/Comments'
import ArticleMeta from '~/components/Article/ArticleMeta'

export default () => {
	const [store, { deleteArticle, loadArticle, setSlug }] = useStore()
	const navigate = useNavigate()

	const { slug } = useParams()
	setSlug(slug)

	const article = () => store.articles[slug]
	const canModify = () =>
		store.currentUser && store.currentUser.username === article()?.author.username
	const handleDeleteArticle = () => deleteArticle(slug).then(() => navigate('/'))

	onMount(() => loadArticle(slug))

	return (
		<div class='article-page'>
			<div class='banner'>
				<div class='container'>
					<h1>{article()?.title}</h1>
					<ArticleMeta article={article()} canModify={canModify()} onDelete={handleDeleteArticle} />
				</div>
			</div>

			<div class='container page'>
				<div class='row article-content'>
					<div class='col-xs-12'>
						<div
							innerHTML={article() && Parser.parse(Lexer.lex(article().body), { sanitize: true })}
						/>

						<ul class='tag-list'>
							{article()?.tagList.map((tag) => (
								<li class='tag-default tag-pill tag-outline'>{tag}</li>
							))}
						</ul>
					</div>
				</div>

				<hr />

				<div class='article-actions'></div>

				<div class='row'>
					<Comments slug={slug} />
				</div>
			</div>
		</div>
	)
}
