/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const upgradedOptions = options || {};
  upgradedOptions.method = upgradedOptions.method || 'GET';
  upgradedOptions.headers = upgradedOptions.headers || {};

  const xhttp = new XMLHttpRequest();
  xhttp.open(upgradedOptions.method, url, true);

  for (const header in Object.keys(upgradedOptions.headers)) {
    xhttp.setRequestHeader(header, upgradedOptions.headers[header]);
  }
  xhttp.withCredentials = true; // cors cookies
  xhttp.send();

  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status < 200 || this.status >= 300) {
          const error = new Error(this.statusText);
          error.response = this;
          return reject(error);
        }

        resolve(JSON.parse(this.responseText));
      }
    };
  });
}
