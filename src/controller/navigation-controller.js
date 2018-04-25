import Bus, {Events, dispatch} from '../event-bus';
import Router from '../router/router';
import Model from '../model';

Bus.on(Events.NAVIGATE_HOME, () => Router.navigate('/'));
Bus.on(Events.NAVIGATE_OWN_PROFILE, () => {
  dispatch(Events.NAVIGATE_PROFILE, Model.user.username);
});
Bus.on(Events.NAVIGATE_PROFILE, ({target: username}) => {
  Router.navigate(`/profile/@${username}`);
});
