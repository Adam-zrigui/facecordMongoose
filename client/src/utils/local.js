export const getItemFromLocalStorage = (key) => {
    const i = localStorage.getItem(key)
    if (i === null) return null;
    return JSON.parse(i); 
}
export const setItemToLocalStorage = (key  , value) => {
    if ( typeof value === "undefined") return localStorage.setItem(key, JSON.stringify(''));
   localStorage.setItem(key, JSON.stringify(value));
}