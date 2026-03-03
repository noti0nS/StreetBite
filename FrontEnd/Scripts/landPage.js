import ApiService from './service.js';

const api = new ApiService('http://localhost:8080');

document.addEventListener("DOMContentLoaded", function () {
    api.getComandas().then(comandas => console.log(comandas));
});