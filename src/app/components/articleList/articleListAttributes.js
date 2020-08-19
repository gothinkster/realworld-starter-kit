export function onPageLinkClickAction(action) {
  return (host, { detail: { index } }) => action(index);
}
