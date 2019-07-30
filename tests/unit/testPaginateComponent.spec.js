import { shallowMount } from '@vue/test-utils'
import Paginate from '@/components/basic/Paginate.vue'

describe('Paginate.vue', () => {
	let pagination = {
		meta: {
			current_page: 1,
			last_page: 5
		},
		links: {
			next: 2,
			prev: 0
		}
	}
	const propsData = { pagination }

	it('Test Paginate component', () => {
		const wrapper = shallowMount(Paginate, {
			propsData
		})

		const pageItems = wrapper.findAll('.page-item')

		expect(pageItems.at(0).text()).toMatch('Προηγούμενη')
		expect(pageItems.at(1).text()).toMatch('Σελίδα 1 από 5')
		expect(pageItems.at(2).text()).toMatch('Επόμενη')
	})
})
