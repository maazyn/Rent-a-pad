import Cookies from "js-cookie";


export const csrfFetch = async (url, options = {}) =>  {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
};


// call to get the "XSRF-TOKEN" cookie, only for use in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
