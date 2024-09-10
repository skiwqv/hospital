function getTokenFromCookies(label) {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(label));
  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }
  return null;
}
function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/; Secure`;
}
export { getTokenFromCookies, deleteCookie };
