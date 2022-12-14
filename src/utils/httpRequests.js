import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:9000/',
});

// GET
export const get = async (url, options = {}) => {
    try {
        return (await httpRequest.get(url, options)).data;
    } catch (e) {
        const error = e.response.data.error
        if(error !== "No token"){
            alert(error)
        } else {
            console.log(error);
        }
    }
};

// POST
export const post = async (url, data = {}, options = {}) => {
    try {
        return (await httpRequest.post(url, data, options)).data;
    } catch (e) {
        alert(e.response.data.error);
    }
};

export default httpRequest;
