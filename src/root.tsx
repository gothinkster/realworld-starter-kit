// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root'
import { ErrorBoundary } from 'solid-start/error-boundary'
import { Suspense } from 'solid-js'

import { Provider } from './store'
import DefaultLayout from './layout/DefaultLayout'

export default function Root() {
	return (
		<html lang='en'>
			<head>
				<meta charset='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				{/* <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on --> */}
				<link
					href='//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
					rel='stylesheet'
					type='text/css'
				/>
				<link
					href='//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic'
					rel='stylesheet'
					type='text/css'
				/>
				{/* <!-- Import the custom Bootstrap 4 theme from our hosted CDN --> */}
				<link rel='preconnect' href='https://static.productionready.io' crossorigin='anonymous' />
				<link rel='preconnect' href='https://api.realworld.io' crossorigin='anonymous' />
				<link rel='preconnect' href='http://code.ionicframework.com' crossorigin='anonymous' />
				<link rel='stylesheet' href='/css/main.css' />
				<link
					rel='shortcut icon'
					type='image/x-icon'
					href='//demo.productionready.io/favicon.ico'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<ErrorBoundary>
					<Suspense>
						<Provider>
							<DefaultLayout>
								<Routes />
							</DefaultLayout>
						</Provider>
					</Suspense>
				</ErrorBoundary>
				<Scripts />
			</body>
		</html>
	)
}
