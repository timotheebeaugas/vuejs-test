import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import apiData from './data.json'

describe('Home.vue', () => {
    describe('render products list', () => {
        const wrapper = mount(Home, {
            stubs: ['router-link']
        })
        it('checking if array is empty', () => {
            expect(wrapper.vm.products).toHaveLength(0);
        }); 
        it('sending data to the component and checking the content', async () => {
            await wrapper.setData({ products: apiData })
            expect(wrapper.vm.products).toStrictEqual(apiData);
        }); 
    }); 
});      