export default function guest({ next, store }) {
  if (store.getters.auth.loggedIn || localStorage.getItem('token')) {
    return next({
      name: 'chat'
    });
  }

  return next();
}
