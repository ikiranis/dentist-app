import {shallowMount} from '@vue/test-utils'
import DentalGramToothsTable from '@/components/patients/DentalGramToothsTable.vue'

describe('DentalGramToothsTable.vue', () => {
    let tooths = [
        {
            id: 18,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '22/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '23/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 17,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 16,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 15,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 14,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 13,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 12,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 11,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 21,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 22,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 23,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 24,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 25,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 26,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 27,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 28,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 48,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 47,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 46,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 45,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 44,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 43,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 42,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 41,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 31,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 32,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 33,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 34,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 35,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 36,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 37,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        },
        {
            id: 38,
            notes: [
                {
                    id: 0,
                    date: '21/01/2019',
                    description: 'something 1'
                },
                {
                    id: 1,
                    date: '21/01/2019',
                    description: 'something 2'
                },
                {
                    id: 2,
                    date: '21/01/2019',
                    description: 'something 3'
                }
            ]
        }
    ]

    const propsData = { tooths }

    it('Test DentalGramToothsTable component', () => {
        const mock = jest.fn();

        const wrapper = shallowMount(DentalGramToothsTable, {
            propsData,
            stubs: ['plus-circle-outline'],
            listeners: {
                'click': mock,
                'mouseleave': mock,
            },

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
