import { createLocalVue, shallowMount } from '@vue/test-utils'
import Confirmation from '@/views/Confirmation.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()

localVue.use(VueRouter)
 
const randomOrderId = "c872e890-bd96-11eb-9e5a-756c6e4cd5ef";

const routes = [{ path: '/confirmation?id='+randomOrderId, component: Confirmation }]

const router = new VueRouter({
    routes
})

describe('Confirmation.vue', () => {
    describe('Random purchase order rendering', () => {
        const wrapper = shallowMount(Confirmation, {
            localVue,
            router,
            stubs: ['router-link']
        })
        it('checking the default value', () => {
            expect(wrapper.vm.order).toBe(undefined);
        });
        it('sending the parameter of the http address in the component and checking value', () => {
            wrapper.setData({ order: randomOrderId})
            expect(wrapper.vm.order).toBe(randomOrderId);
        }); 
    });
}); 