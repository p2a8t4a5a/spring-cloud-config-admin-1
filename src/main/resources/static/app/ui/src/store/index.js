import namespace from "./modules/namespace.js"
import profile from "./modules/profile.js"
import label from "./modules/label.js"
import config from "./modules/config.js"

export default new Vuex.Store({
    modules: {
        namespace,
        profile,
        label,
        config
    }
});