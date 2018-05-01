import {onEvent, Events, dispatch} from '../event-bus'
import Router from '../router/router'
import Model from '../model'

onEvent(Events.NAVIGATE_HOME, () => Router.navigate('/'))
onEvent(Events.NAVIGATE_PROFILE, username => {
  Router.navigate(`/profile/@${username}`)
})
onEvent(Events.NAVIGATE_ARTICLE, articleId => {
  Router.navigate(`/article/@${articleId}`)
})
