import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { me } from '../../redux/services/user';
import { article, deleteArticle, comments, addComment, deleteComment, follow, favorite } from '../../redux/services/article';
import Link from '../asyncLink'; // eslint-disable-line
import Following from '../components/following';
import Favorited from '../components/favorited';
import Comments from '../components/comments';

const KEY_DEL = 46;

class Article extends React.PureComponent {
  static async getInitialProps({ req, dispatch, match, user }) {
    const promises = [
      dispatch(article({ req, slug: match.params[0] })),
      dispatch(comments({ req, slug: match.params[0] })),
    ];
    if (req && !user) {
      promises.unshift(dispatch(me({ req })));
    }
    await Promise.all(promises);
  }

  constructor(...args) {
    super(...args);
    this.follow = this.follow.bind(this);
    this.favorite = this.favorite.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async componentDidMount() {
    if (this.props.history.action === 'POP' && this.props.hydrated) {
      await Article.getInitialProps(this.props);
    }
    this.commentBody = '';
  }

  async deleteArticle(event) {
    event.preventDefault();
    if (this.props.article.transition) {
      return;
    }
    await this.props.dispatch(deleteArticle({ slug: this.props.article.article.slug }));
    if (!this.props.article.error) {
      this.props.history.replace(`/author/${this.props.user.username}`);
    }
  }

  addComment(event) {
    event.preventDefault();
    const body = this.commentInput.value;
    if (!body || body === this.commentBody) {
      return;
    }
    this.commentBody = body;
    this.props.dispatch(addComment({
      slug: this.props.article.article.slug,
      body,
    }));
  }

  async deleteComment(id) {
    this.props.dispatch(deleteComment({
      id,
      slug: this.props.article.article.slug,
    }));
  }

  async follow(event) {
    event.persist();
    await this.props.dispatch(follow({
      author: this.props.article.article.author.username,
      method: this.props.article.article.author.following ? 'delete' : 'post',
    }));
    event.target.blur();
  }

  async favorite(event) {
    event.persist();
    await this.props.dispatch(favorite({
      slug: this.props.article.article.slug,
      method: this.props.article.article.favorited ? 'delete' : 'post',
    }));
    event.target.blur();
  }

  render() {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.article.article.title}</h1>
            <div className="article-meta">
              <Link to={`/author/${this.props.article.article.author.username}`}>
                <img alt="" src={this.props.article.article.author.image} />
              </Link>
              <div className="info">
                <Link to={`/author/${this.props.article.article.author.username}`} className="author">{this.props.article.article.author.username}</Link>
                <span className="date">{moment(this.props.article.article.updatedAt).format('ddd MMM DD YYYY')}</span>
              </div>
              {
                this.props.article.article.author.username === this.props.user.username ? [
                  <Link
                    className="btn btn-sm btn-outline-secondary"
                    to={`/edit/${this.props.article.article.slug}`}
                    key="edit"
                  >
                    <i className="ion-edit" />
                    &nbsp;
                    Edit <span className="counter" />
                  </Link>,
                  <span key="spase">&nbsp;&nbsp;</span>,
                  <a
                    className="btn btn-sm btn-outline-danger"
                    onClick={this.deleteArticle}
                    role="button"
                    onKeyUp={
                      event => (event.keyCode === KEY_DEL ? this.deleteArticle() : undefined)
                    }
                    tabIndex={-1}
                    key="delete"
                  >
                    <i className="ion-trash-a" />
                    &nbsp;
                    Delete <span className="counter" />
                  </a>,
            ] :
                  null
              }
              <Following
                profile={this.props.article.article.author}
                user={this.props.user}
                onClick={this.follow}
              />
              &nbsp;&nbsp;
              <Favorited
                user={this.props.user}
                article={this.props.article.article}
                onClick={this.favorite}
              />
            </div>
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <ReactMarkdown>{this.props.article.article.body}</ReactMarkdown>
            </div>
          </div>
          <ul className="tag-list">
            {
              this.props.article.article.tagList.map(tag => (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  <Link to={`/tag/${tag}`}>#{tag}</Link>
                </li>
              ))
            }
          </ul>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <Link to={`/author/${this.props.article.article.author.username}`}>
                <img alt="" src={this.props.article.article.author.image} />
              </Link>
              <div className="info">
                <Link to={`/author/${this.props.article.article.author.username}`} className="author">
                  {this.props.article.article.author.username}
                </Link>
                <span className="date">{moment(this.props.article.article.updatedAt).format('ddd MMM DD YYYY')}</span>
              </div>
              <Following
                profile={this.props.article.article.author}
                user={this.props.user}
                onClick={this.follow}
              />
              &nbsp;
              <Favorited
                user={this.props.user}
                article={this.props.article.article}
                onClick={this.favorite}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {
                this.props.user && this.props.user.id
                  ?
                    <form className="card comment-form" onSubmit={this.addComment}>
                      <div className="card-block">
                        <textarea
                          className="form-control"
                          placeholder="Write a comment..."
                          rows="3"
                          ref={(input) => { this.commentInput = input; }}
                        />
                      </div>
                      <div className="card-footer">
                        <img alt="" src={this.props.user.image} className="comment-author-img" />
                        &nbsp;
                        <Link to={`/author/${this.props.user.username}`}>{this.props.user.username}</Link>
                        <button className="btn btn-sm btn-primary">
                         Post Comment
                        </button>
                      </div>
                    </form>
                  :
                    null
              }
              <Comments
                comments={this.props.article.comments}
                user={this.props.user}
                deleteComment={this.deleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
  hydrated: PropTypes.bool.isRequired,
};

export default connect(state => ({
  user: state.user,
  article: state.article,
  hydrated: state.hydrated,
}))(Article);
