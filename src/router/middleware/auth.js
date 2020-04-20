export default function auth({ next }) {
  if (!localStorage.getItem('token')) {
    return next({
      name: 'home'
    });
  }

  return next();
}