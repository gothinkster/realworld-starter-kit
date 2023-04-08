// In most cases, you'll only need to edit the CONFIG/TEST_CONFIG objects
// CONFIG is the configuration used to run the application.
// TEST_CONFIG is the configuration used to run tests.
// If you need better fine-tuning of Webpack options check the buildConfig function.
const CONFIG = {
    // The tags to include the generated JS and CSS will be automatically injected in the HTML template
    // See https://github.com/jantimon/html-webpack-plugin
    indexHtmlTemplate: './src/Client/index.html',
    fsharpEntry: './src/Client/output/App.js',
    outputDir: './deploy/public',
    assetsDir: './src/Client/public',
    devServerPort: 8080,
    // When using webpack-dev-server, you may need to redirect some calls
    // to a external API server. See https://webpack.js.org/configuration/dev-server/#devserver-proxy
    devServerProxy: {
        // redirect requests that start with /api/ to the server on port 5000
        '/api/**': {
            target: 'http://localhost:' + (process.env.SERVER_PROXY_PORT || '5000'),
            changeOrigin: true
        },
        // redirect websocket requests that start with /socket/ to the server on the port 5000
        '/socket/**': {
            target: 'http://localhost:' + (process.env.SERVER_PROXY_PORT || '5000'),
            ws: true
        }
    }
};

const TEST_CONFIG = {
    // The tags to include the generated JS and CSS will be automatically injected in the HTML template
    // See https://github.com/jantimon/html-webpack-plugin
    indexHtmlTemplate: 'tests/Client/index.html',
    fsharpEntry: 'tests/Client/output/Client.Tests.js',
    outputDir: 'tests/Client',
    assetsDir: 'tests/Client',
    devServerPort: 8081,
    // When using webpack-dev-server, you may need to redirect some calls
    // to a external API server. See https://webpack.js.org/configuration/dev-server/#devserver-proxy
    devServerProxy: undefined,
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(env, arg) {
    // Mode is passed as a flag to npm run. see the docs for more details on flags https://webpack.js.org/api/cli/#flags
    const mode = arg.mode ?? 'development';
    // environment variables docs: https://webpack.js.org/api/cli/#environment-options
    const config = env.test ? TEST_CONFIG : CONFIG;
    const isProduction = mode === 'production';

    console.log(`Bundling for ${env.test ? 'test' : 'run'} - ${mode} ...`);

    return {
        // In development, split the JavaScript and CSS files in order to
        // have a faster HMR support. In production bundle styles together
        // with the code because the MiniCssExtractPlugin will extract the
        // CSS in a separate files.
        entry: {
            app: resolve(config.fsharpEntry)
        },
        // Add a hash to the output file name in production
        // to prevent browser caching if code changes
        output: {
            path: resolve(config.outputDir),
            publicPath: '/',
            filename: isProduction ? '[name].[contenthash].js' : '[name].js'
        },
        mode: mode,
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        optimization: {
            runtimeChunk: 'single',
            moduleIds: 'deterministic',
            // Split the code coming from npm packages into a different file.
            // 3rd party dependencies change less often, let the browser cache them.
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [
            // ONLY PRODUCTION
            // MiniCssExtractPlugin: Extracts CSS from bundle to a different file
            // To minify CSS, see https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
            isProduction && new MiniCssExtractPlugin({ filename: 'style.[name].[contenthash].css' }),
            // CopyWebpackPlugin: Copies static assets to output directory
            isProduction && new CopyWebpackPlugin({ patterns: [{ from: resolve(config.assetsDir) }] }),

            // PRODUCTION AND DEVELOPMENT
            // HtmlWebpackPlugin allows us to use a template for the index.html page
            // and automatically injects <script> or <link> tags for generated bundles.
            new HtmlWebpackPlugin({ filename: 'index.html', template: resolve(config.indexHtmlTemplate)})
        ].filter(Boolean),
        // Configuration for webpack-dev-server
        devServer: {
            static: {
                directory: resolve(config.assetsDir),
                publicPath: '/'
            },
            host: '0.0.0.0',
            port: config.devServerPort,
            proxy: config.devServerProxy,
            hot: true,
            historyApiFallback: true
        },
        // - sass-loaders: transforms SASS/SCSS into JS
        // - file-loader: Moves files referenced in the code (fonts, images) into output folder
        module: {
            rules: [
                {
                    test: /\.(sass|scss|css)$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: { implementation: require('sass') }
                        }
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/,
                    use: ['file-loader']
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                }
            ]
        }
    };
};

function resolve(filePath) {
    return path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
}