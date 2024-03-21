export function getCookie(name) {
  if (process.client) {
    let cookieName = name + "=";
    let cookiesArray = document.cookie.split(";");

    for (let cookie of cookiesArray) {
      cookie = cookie.trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  }
  return null;
}

  
  export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('fr-FR', options);
}
  