export default function guest({ next, store }) {
  if (store.getters.getAuth || localStorage.getItem('token')) {
    //TODO: Добавлять в хранилище loggedIn = true
    return next({
      name: 'chat'
    });
  }

  return next();
}
