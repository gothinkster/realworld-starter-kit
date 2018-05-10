import { onEvent, Events } from "../event-bus";
import API from "../api";
import Model from '../model';
import CONFIG from '../../config'

const {defaultProfileImage} = CONFIG;

onEvent(Events.GET_PROFILE, (username) => {
  Model.profile = undefined
  API.getProfile(username)
    .then(({profile}) => {
      profile.image = profile.image || defaultProfileImage
      Model.profile = profile
    })
})

onEvent(Events.FOLLOW, username => {
  API.follow(username)
    .then(({profile}) => {
      if (Model.article && Model.article.author.username === username) {
        Model.article = Object.assign({}, Model.article, {
          author: profile
        })
      }
    })
})

onEvent(Events.UNFOLLOW, username => {
  API.unfollow(username)
    .then(({profile}) => {
      if (Model.article && Model.article.author.username === username) {
        Model.article = Object.assign({}, Model.article, {
          author: profile
        })
      }
    })
})