function insertParam(key, value) {
    key = encodeURI(key);
    value = encodeURI(value);
    window.location.search = `?${key}=${value}`;
}