import {AxiosGet} from "../../util/AxiosInstance.js"

let label = {
    state: {
        labels: [],
        currentLabel: ''
    }, actions: {
        getLabels({commit, state, rootState}) {
            return new Promise((resolve, reject) => {
                AxiosGet("/namespaces/" + rootState.namespace.currentNamespace + "/profiles/" + rootState.profile.currentProfile + "/labels",).then(res => {
                    if (res.status === 200) {
                        commit("labels", res.data);
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        }
    }, mutations: {
        labels(state, data) {
            state.labels = data;
            if (state.currentLabel === '') {
                state.currentLabel = state.labels.length > 0 ? state.labels[0] : '';
            }
        }
    }
};
export default label