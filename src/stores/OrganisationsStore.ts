import { defineStore } from 'pinia'

interface IOrganisationData {
  id: number
  name: string
  numberOfEmployeesByMonth: number[]
  turnover: number
}

export const useOrganisationsStore = defineStore('organisationsStore', {
  state: () => {
    return {
      data: [
        {
          id: 1,
          name: 'Climateseed',
          numberOfEmployeesByMonth: [31, 1, 63, 63, 92, 87, 29, 95, 66, 1, 41, 39],
          turnover: 1000000000
        },
        {
          id: 2,
          name: 'Acme Corp',
          numberOfEmployeesByMonth: [24, 3, 74, 94, 61, 86, 84, 32, 45, 6, 65, 78],
          turnover: 20000
        },
        {
          id: 3,
          name: 'Fast Co2',
          numberOfEmployeesByMonth: [21, 19, 25, 0, 14, 33, 64, 86, 84, 63, 12, 42],
          turnover: 35000
        }
      ] as IOrganisationData[],
    }
  },
  getters: {
    getDataChart(state) {
      const newData = state.data.map(company => ({
        name: company.name,
        data: company.numberOfEmployeesByMonth
      }))

      return newData;
    }
  }
})
