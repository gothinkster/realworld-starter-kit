import Head from "next/head";
import type { NextPage } from "next";
import Header from "components/Header";

const Banner = (): JSX.Element => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Conduit</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        {/* Import the custom Bootstrap 4 theme from our hosted CDN  */}
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
      </Head>

      <Header />

      <main className="home-page">
        <Banner />

        <div className="container page border-solid border border-red-400">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="profile.html">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      Eric Simons
                    </a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 29
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="profile.html">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      Albert Pai
                    </a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>
                    The song you won't ever stop singing. No matter how hard you
                    try.
                  </h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <a href="" className="tag-pill tag-default">
                    programming
                  </a>
                  <a href="" className="tag-pill tag-default">
                    javascript
                  </a>
                  <a href="" className="tag-pill tag-default">
                    emberjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    angularjs
                  </a>
                  <a href="" className="tag-pill tag-default">
                    react
                  </a>
                  <a href="" className="tag-pill tag-default">
                    mean
                  </a>
                  <a href="" className="tag-pill tag-default">
                    node
                  </a>
                  <a href="" className="tag-pill tag-default">
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Home;
