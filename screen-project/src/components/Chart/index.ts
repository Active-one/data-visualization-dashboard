import Chart from './index.vue'
import type {App} from 'vue'

const install = (app: App): void => {
    app.component('v-chart', Chart);
}

export default {
    install
}
