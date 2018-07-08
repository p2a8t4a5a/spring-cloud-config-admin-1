import {AxiosGet} from "../../util/AxiosInstance.js"

let profile = {
    state: {
        profiles: [],
        currentProfile: ''
    }, actions: {
        getProfiles({commit, state, rootState}) {
            return new Promise((resolve, reject) => {
                AxiosGet("/namespaces/" + rootState.namespace.currentNamespace + "/profiles",).then(res => {
                    if (res.status === 200) {
                        commit("profiles", res.data);
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                })
            })
        },
        setCurrentProfile({commit}, namespace) {
            commit("currentProfile", namespace);
        }
    }, mutations: {
        profiles(state, data) {
            state.profiles = data;
            state.currentProfile = state.profiles.length > 0 ? state.profiles[0] : '';
        },
        currentProfile(state, data) {
            state.currentProfile = data;
        }
    }
};
export default profile
