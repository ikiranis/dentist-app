import { shallowMount } from '@vue/test-utils'
import PeriodontalChartToothsTable from '@/components/patients/PeriodontalChartToothsTable.vue'

describe('PeriodontalChartToothsTable.vue', () => {
    let tooths = [
        {
            id: 18,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                },
                {
                    id: 1,
                    date: '22/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                },
                {
                    id: 2,
                    date: '23/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                }
            ]
        },
        {
            id: 17,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                }
            ]
        },
        {
            id: 16,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    measurements: [
                        { id: 0, number: 0 },
                        { id: 1, number: 0 },
                        { id: 2, number: 0 },
                        { id: 3, number: 0 },
                        { id: 4, number: 0 },
                        { id: 5, number: 0 }
                    ]
                }
            ]
        }
    ]

    const propsData = { tooths }

    it('Test PeriodontalChartToothsTable component', () => {
        const mock = jest.fn()

        const wrapper = shallowMount(PeriodontalChartToothsTable, {
            propsData,
            stubs: ['plus-circle-outline'],
            listeners: {
                'click': mock,
                'mouseleave': mock
            }

        })

        const toothsItems = wrapper.findAll('.tooth-label')

        expect(toothsItems.at(0).text()).toMatch('18')
        expect(toothsItems.at(1).text()).toMatch('17')
        expect(toothsItems.at(2).text()).toMatch('16')

        const toothsNotes = wrapper.findAll('.toothNotes')

        expect(toothsNotes.at(0).text()).toMatch('21/01/2019')
        expect(toothsNotes.at(1).text()).toMatch('22/01/2019')
        expect(toothsNotes.at(2).text()).toMatch('23/01/2019')
    })
})
