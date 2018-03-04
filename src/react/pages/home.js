import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { me } from '../../redux/services/user';
import { feed, tags } from '../../redux/services/articles';
import ArticlePreview from '../components/articlePreview';
import NavItem from '../components/navItem';
import Pagination from '../components/pagination';
import Link from '../asyncLink'; // eslint-disable-line

class Home extends React.PureComponent {
  static async getInitialProps({ req, store, dispatch, user, match }) {
    const promises = [];
    const page = Number(match.params.page) || 1;
    let filter;
    let value;
    if (req && !user) {
      await dispatch(me({ req }));
    }
    if (match.path.slice(0, 5) === '/feed') {
      if (req && !store.getState().user.id) {
        return { redirectUrl: '/' };
      }
      filter = 'feed';
    } else if (match.params.tag) {
      filter = 'tag';
      value = match.params.tag;
    } else {
      filter = undefined;
    }
    promises.push(dispatch(feed({ req, filter, value, page })));
    promises.push(dispatch(tags({ req })));
    return Promise.all(promises);
  }

  async componentDidMount() {
    if (this.props.history.action === 'POP' && this.props.hydrated) {
      await Home.getInitialProps(this.props);
    }
  }

  render() {
    const count = this.props.articles.articlesCount;
    const { pageLength } = this.props.articles;
    const page = Number(this.props.match.params.page) || 1;
    return (
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p className="test">A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {
                    this.props.user && this.props.user.id
                      ? <NavItem to="/feed">Your Feed</NavItem>
                      : null
                  }
                  <NavItem to="/">Global Feed</NavItem>
                  {
                    this.props.articles.filter === 'tag' ?
                      <NavItem to={`/tag/${this.props.articles.value}`}>
                        #{this.props.articles.value}
                      </NavItem>
                    :
                      null
                  }
                </ul>
              </div>
              {
                this.props.articles.articles.map(article =>
                  <ArticlePreview {...article} user={this.props.user} key={article.slug} />)
              }
              <Pagination {...{ count, pageLength, page }} />
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {
                    this.props.articles.tags.map(tag => (
                      <Link
                        to={`/tag/${tag}`}
                        className="tag-pill tag-default"
                        key={tag}
                      >
                        #{tag}
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.object,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  hydrated: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  articles: PropTypes.shape({
    page: PropTypes.number,
    pageLength: PropTypes.number,
    articlesCount: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string })),
    tags: PropTypes.arrayOf(PropTypes.string),
    filter: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default connect(state => ({
  user: state.user,
  articles: state.articles,
  hydrated: state.hydrated,
}))(Home);
