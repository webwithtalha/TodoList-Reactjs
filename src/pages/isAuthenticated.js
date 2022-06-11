export const Authenticated = () => {
  return localStorage.getItem('token') ? true : false;
};
