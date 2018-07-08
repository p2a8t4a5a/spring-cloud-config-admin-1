let AxiosInstance = axios.create({
    // baseURL:  '/admin/ui/config',
    baseURL: 'http://localhost:8888/admin/ui/config',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export const AxiosGet = (url, params) => {
    return AxiosInstance.get(url, {headers: {'Content-Type': 'application/json;charset=UTF-8'}, data: params === undefined ? {} : params})
        .then(res => res)
        .catch(res => res);
};

export const AxiosPost = (url, params) => {
    return AxiosInstance.post(url, params, {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
        .then(res => res)
        .catch(res => res);
};

export const AxiosDelete = (url, params) => {
    return AxiosInstance.delete(url, {headers: {'Content-Type': 'application/json;charset=UTF-8'}, data: params === undefined ? {} : params})
        .then(res => res)
        .catch(res => res);
};
