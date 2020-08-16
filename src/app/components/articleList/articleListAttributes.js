export function onPageLinkClickAction(action) {
  return (host, { data: { index } }) => action(index);
}
