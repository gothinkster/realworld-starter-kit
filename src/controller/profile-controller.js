import { onEvent, Events } from "../event-bus";
import API from "../api";
import Model from '../model';
import CONFIG from '../../config'

const {defaultProfileImage} = CONFIG;

onEvent(Events.GET_PROFILE, (username) => {
  API.getProfile(username)
    .then(({profile}) => {
      profile.image = profile.image || defaultProfileImage
      Model.profile = profile
    })
})