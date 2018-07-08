import {AxiosGet} from "../../util/AxiosInstance.js"

let namespace = {
    state: {
        namespaces: [],
        currentNamespace: ''
    }, actions: {
        getNamespaces({commit}) {
            return new Promise((resolve, reject) => {
                AxiosGet("/namespaces",).then(res => {
                    if (res.status === 200) {
                        commit("namespaces", res.data);
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        },
        setCurrentNamespace({commit}, namespace) {
            commit("currentNamespace", namespace);
        }
    }, mutations: {
        namespaces(state, data) {
            state.namespaces = data;
            state.currentNamespace = state.namespaces.length > 0 ? state.namespaces[0] : '';
        },
        currentNamespace(state, data) {
            state.currentNamespace = data;
        }
    }
};
export default namespace
