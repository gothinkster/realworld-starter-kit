export function onInputAction(action) {
  return (_, { target: { value } }) => action(value);
}

export function preventDefaultOn(action) {
  return (host, event) => {
    event.preventDefault();

    action(host, event);
  };
}

export function preventDefault() {
  return preventDefaultOn(() => {});
}
