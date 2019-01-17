import CONFIG from '../config'
import {dispatch, Events} from './event-bus'

const encode = encodeURIComponent

const makeFetch = (url, method = 'GET', data) => {
  let headers = new Headers({
    'content-type': 'application/json',
    accept: 'application/json',
    'front-end-library': 'slim-js',
  })
  if (token) {
    headers.set('authorization', `Token ${token}`)
  }
  // logger.log(`%c Fetch: ${url}`, 'color: red')
  return fetch(CONFIG.endpoint + url, {
    headers,
    body: data ? JSON.stringify(data) : undefined,
    cache: 'no-cache',
    method,
  })
    .then(r => {
      // logger.log(`%c Fetch: ${url} ${r.status}`, 'color: green')
      return r
    })
    .then(r => r.json())
    .catch(err => {
      logger.log(err)
      throw err
    })
}

const _agent = {
  get: url => makeFetch(url, 'GET'),
  post: (url, data) => makeFetch(url, 'POST', data),
  put: (url, data) => makeFetch(url, 'PUT', data),
  del: url => makeFetch(url, 'DELETE'),
}

const {endpoint: API_ROOT, articlesPerPage} = CONFIG
const agent = {
  get: function() {
    openPopup()
    return _agent
      .get(...arguments)
      .then(closePopup)
      .catch(err => closePopup(err, true))
  },
  post: function() {
    openPopup()
    return _agent
      .post(...arguments)
      .then(closePopup)
      .catch(err => closePopup(err, true))
  },
  put: function() {
    openPopup()
    return _agent
      .put(...arguments)
      .then(closePopup)
      .catch(err => closePopup(err, true))
  },
  del: function() {
    openPopup()
    return _agent
      .del(...arguments)
      .then(closePopup)
      .catch(err => closePopup(err, true))
  },
}

const openPopup = () => {
  dispatch(Events.OPEN_MODAL, 'Ok, hold on 👍...')
}

const closePopup = (resolution, isError = false) => {
  dispatch(Events.CLOSE_MODAL)
  if (isError) {
    throw resolution
  }
  return Promise.resolve(resolution)
}

let token = window.localStorage.getItem('jwt')

export default class API {
  static register(username, email, password) {
    const data = {
      user: {
        username,
        email,
        password,
      },
    }
    return agent.post('/users', data)
  }

  static async autoLogin() {
    // logger.log('has token? ' + !!token)
    if (!token) {
      throw new Error('No Token')
    }
    return agent
      .get(`/user`)
      .then(body => body.user)
      .then(user => {
        // logger.log(user)
        return user
      })
  }

  static logout() {
    window.localStorage.removeItem('jwt')
    token = null
  }

  static login(email, password) {
    return agent
      .post('/users/login', {user: {email, password}})
      .catch(err => {
        window.localStorage.removeItem('jwt')
        throw err
      })
      .then(({user}) => {
        if (user && user.token) {
          token = user.token
          window.localStorage.setItem('jwt', token)
        }
        // logger.log(user)
        return user
      })
  }

  static getUser(username) {
    return agent.get(`/profiles/${username}`)
  }

  static updateUser(user) {
    return agent.put('/user', {user})
  }

  // PROFILE
  static getProfile(username) {
    return agent.get(`/profiles/${username}`)
  }

  static follow(username) {
    return agent.post(`/profiles/${username}/follow`)
  }

  static unfollow(username) {
    return agent.del(`/profiles/${username}/follow`)
  }

  // TAGS

  static getAllTags() {
    return agent.get('/tags')
  }

  // ARTICLES

  static getArticle(slug) {
    return agent.get(`/articles/${slug}`)
      .then(data => data.article)
  }

  static getArticles(
    username = undefined,
    offset = 0,
    limit = articlesPerPage
  ) {
    const authorParam = username ? `?author=${username}&` : '?'
    const otherParams = `limit=${limit}&offset=${offset}`
    return agent.get(`/articles${authorParam}${otherParams}`)
  }

  static getArticlesFeed(limit = articlesPerPage, offset = 0) {
    return agent.get(`/articles/feed?limit=${limit}&offset=${offset}`)
  }

  static getFavArticles(
    username = undefined,
    offset = 0,
    limit = articlesPerPage
  ) {
    const authorParam = username ? `?favorited=${username}&` : '?'
    const otherParams = `limit=${limit}&offset=${offset}`
    return agent.get(`/articles${authorParam}${otherParams}`)
  }

  static getArticlesByTag(tag, offset) {
    return agent.get(`/articles?tag=${encode(tag)}&offset=${offset}`)
  }

  static favArticle(slug) {
    return agent.post(`/articles/${slug}/favorite`)
  }

  static unfavArticle(slug) {
    return agent.del(`/articles/${slug}/favorite`)
  }

  static getComments(slug) {
    return agent.get(`/articles/${slug}/comments`)
  }

  static postComment(slug, body) {
    return agent.post(`/articles/${slug}/comments`, {
      comment: {
        body
      }
    })
  }

  static postArticle(article) {
    return agent.post('/articles', {article})
  }

  static trashArticle(slug) {
    return agent.del(`/articles/${slug}`)
  }

  static updateArticle(article) {
    return agent.put(`/articles/${slug}`, {article})
  }

  static trashComment(slug, id) {
    return agent.del(`/articles/${slug}/comments/${id}`)
  }
}



/*
{title: "Test article", description: "Testing how to post an article", body: "# Markdown↵In your face",…}
body
:
"# Markdown↵In your face"
description
:
"Testing how to post an article"
tagList
:
[]
title
:
"Test article"
*/