
const HYDRATED = Symbol('HYDRATED');


const initialState = false;

export default function hydratedReduser(state = initialState, action) {
  switch (action.type) {
    case HYDRATED:
      return true;
    default:
      return state;
  }
}

export function setHydrated() {
  return { type: HYDRATED };
}
