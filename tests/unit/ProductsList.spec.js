import { shallowMount } from '@vue/test-utils'
import ProductsList from '@/components/ProductsList.vue'
import apiData from './data.json'

describe('ProductsList.vue', () => {
  it('checking datas passed in the components', () => {
    const data = apiData
    const wrapper = shallowMount(ProductsList, {
      propsData: { data },
      stubs: ['router-link']
    })
    expect(wrapper.props().data).toBe(data); 
  })
})