import type { JSX } from 'solid-js'

import NavBar from '~/components/NavBar'

import './defaultLayout.css'

export default function DefaultLayout(props: {
	children: number | boolean | Node | JSX.ArrayElement | JSX.FunctionElement | JSX.Element
}) {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main>{props.children}</main>
			<footer class=''>
				<div class='container'>
					<a href='/' class='ember-view logo-font'>
						conduit
					</a>
					<span class='attribution'>
						An interactive learning project from{' '}
						<a href='https://realworld-docs.netlify.app/'>RealWorld</a>. Code &amp; design licensed
						under MIT.
					</span>
				</div>
			</footer>
		</>
	)
}
