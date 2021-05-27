import { createLocalVue, shallowMount } from '@vue/test-utils'
import Product from '@/views/Product.vue'
import apiData from './data.json'
import VueRouter from 'vue-router'
import store from '../../src/store/index.js'
import Cart from '@/views/Cart.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

const routes = [{ path: '/product?id=5be1ed3f1c9d44000030b061', component: Product }]

const router = new VueRouter({
    routes
})

describe('Product.vue and Cart.vue', () => {
    describe('rendering of the first product of the array and adding one camera to the cart', () => {
        const wrapper = shallowMount(Product, {
            store,
            localVue,
            router,
            stubs: ['router-link']
        })
        it('checking default values', () => {
            expect(wrapper.vm.product.length).toBe(0);
            expect(wrapper.vm.price).toBe("");
            expect(wrapper.vm.select).toBe(null);
            expect(wrapper.vm.snackbar).toBe(false);
            expect(wrapper.vm.$store.state.cart).toHaveLength(0);
        });
        it('send API data and check value', async () => {
           await wrapper.setData({ product: apiData[0], price: apiData[0].price, select: apiData[0].lenses[0] })
            const img = wrapper.find("#img")
            const name = wrapper.find("#name")
            const desc = wrapper.find("#desc")
            const price = wrapper.find("#price")
            expect(img.html()).toContain(apiData[0].imageUrl)
            expect(name.html()).toContain(apiData[0].name)
            expect(desc.html()).toContain(apiData[0].description)
            expect(price.html()).toContain(499)
        });
        it('simulate a purchase', () => {
             wrapper.vm.validate();
         });
        it('check if the badge displays the basket length', async () => {
            expect(wrapper.vm.$store.state.cartLength).toBe(1);
        });
    });

    describe('display of data in the shopping cart and simulation of an order', () => {
        const wrapper = shallowMount(Cart, {
            store,
            stubs: ['router-link']
        })
        it('checking store values', () => {
            expect(wrapper.vm.$store.state.price).toBe(apiData[0].price);
            expect(wrapper.vm.$store.state.cart).toStrictEqual([{ _id: apiData[0]._id, name: apiData[0].name, description: apiData[0].lenses[0], price: apiData[0].price, imageUrl: apiData[0].imageUrl }]);
        });
        it('checking if the form is displayed', () => {
            expect(wrapper.vm.dialog).toBe(false);
        });
        it('ordering simulation and cleaning the store', () => {
            const mockPurchase= jest.fn(wrapper.vm.clear());
            mockPurchase();
            expect(wrapper.vm.$store.state.cartLength).toBe("0");
            expect(wrapper.vm.$store.state.price).toBe(null);
            expect(wrapper.vm.$store.state.cart).toStrictEqual([]);
        });
        it('check if the cart displays the correct information', () => {
            const info = wrapper.find("#info")
            expect(info.html()).toContain("Empty")
        });
    });
});
