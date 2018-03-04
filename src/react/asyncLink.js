import { Link, matchPath } from 'react-router-dom';
import routes from './routes';
import { getStore } from '../redux/store'

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function handleClick(event){
  if (this.props.onClick) this.props.onClick(event);

  if (
    !event.defaultPrevented && // onClick prevented default
    event.button === 0 && // ignore everything but left clicks
    !this.props.target && // let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // ignore clicks with modifier keys
  ) {
    event.preventDefault();
    const { history, } = this.context.router;
    const { replace, to, } = this.props;

    function locate() { // eslint-disable-line no-inner-declarations
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
    if (this.context.router.history.location.pathname) {
      const routeTo = routes.find((route) =>
        matchPath(this.props.to, route) ? route : null
      );
      const match = matchPath(this.props.to, routeTo);
      const store = getStore();
      if (routeTo) {
        import(`./${routeTo.componentName}`)  // eslint-disable-line
          .then(component => component.default || component)
          .then(component => component.getInitialProps({
            match,
            store,
            dispatch: store.dispatch
          }))
          .then(() => locate());
      } else {
        locate();
      }
    } else {
      locate();
    }
  }
};

class AsyncLink extends Link {
  constructor(...args) {
    super(...args);
    this.handleClick = handleClick.bind(this);
  }
}

export default AsyncLink;
