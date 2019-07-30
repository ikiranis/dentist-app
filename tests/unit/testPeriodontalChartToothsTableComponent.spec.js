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
		},
		{
			id: 15,
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
			id: 14,
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
			id: 13,
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
			id: 12,
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
			id: 11,
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
			id: 21,
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
			id: 22,
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
			id: 23,
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
			id: 24,
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
			id: 25,
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
			id: 26,
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
			id: 27,
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
			id: 28,
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
			id: 48,
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
			id: 47,
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
			id: 46,
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
			id: 45,
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
			id: 44,
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
			id: 43,
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
			id: 42,
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
			id: 41,
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
			id: 31,
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
			id: 32,
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
			id: 33,
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
			id: 34,
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
			id: 35,
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
			id: 36,
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
			id: 37,
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
			id: 38,
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
		const wrapper = shallowMount(PeriodontalChartToothsTable, {
			propsData
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
