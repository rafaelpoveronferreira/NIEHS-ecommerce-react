// This function is necessary for Vite handling static assets when building.
// Learn more: https://vitejs.dev/guide/assets.html
function createURL(url) {
    return new URL(url, import.meta.url).href
}

export default createURL