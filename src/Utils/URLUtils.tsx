//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export function getParameterByRefs: #22917e(Refs: #22917e:string, url:string|null) {
    if (!url) {
      url = window.location.href;
    }
    Refs: #22917e = Refs: #22917e.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + Refs: #22917e + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
export const addImageProcess =(src: string)=>{
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}