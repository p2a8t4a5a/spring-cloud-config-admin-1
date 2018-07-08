import {AxiosDelete, AxiosGet, AxiosPost} from "../../util/AxiosInstance.js"

let config = {
    state: {
        configs: [],
    }, actions: {
        getConfigs({commit, state, rootState}) {
            return new Promise((resolve, reject) => {
                AxiosGet("/namespaces/" + rootState.namespace.currentNamespace
                    + "/profiles/" + rootState.profile.currentProfile
                    + "/labels/" + rootState.label.currentLabel
                    + "/configs").then(res => {
                    if (res.status === 200) {
                        commit("configs", res.data);
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        },
        postConfigs({commit, state, rootState}, params) {
            return new Promise((resolve, reject) => {
                AxiosPost("/namespaces/" + rootState.namespace.currentNamespace
                    + "/profiles/" + rootState.profile.currentProfile
                    + "/labels/" + rootState.label.currentLabel
                    + "/configs", params).then(res => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        },
        updateConfig({commit, state, rootState}, params) {
            return new Promise((resolve, reject) => {
                AxiosPost("/configs", params).then(res => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        },
        deleteConfig({commit, state, rootState}, params) {
            return new Promise((resolve, reject) => {
                AxiosDelete("/configs/" + params).then(res => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        }
    },
    mutations: {
        configs(state, data) {
            state.configs = data;
        }
    }
};
export default config
