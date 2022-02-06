export const setCacheControlHeader = expireAt => {
  let period = 604800; // default is 7 days
  if (expireAt) {
    const duration = Math.floor((new Date(expireAt).getTime() - new Date().getTime()) / 1000); // time left to expire
    period = Math.min(period, duration);
  }
  return `public, max-age=${period}`;
};
