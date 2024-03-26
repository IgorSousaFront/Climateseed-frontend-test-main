import { defineStore } from 'pinia'
import { useOrganisationsStore } from '@/stores/OrganisationsStore';

interface IResultData {
  entityId: number
  categoryId: number
  kco2e: number
}

interface IChartData {
  kco2e: number
  organisation: string
}

export enum IChartType {
  DONUT = 'donut',
  BAR = 'bar'
}

export const useResultsStore = defineStore('resultsStore', {
  state: () => {
    return {
      data: [
        {entityId: 1, categoryId: 2, kco2e: 10000},
        {entityId: 1, categoryId: 2, kco2e: 155},
        {entityId: 1, categoryId: 3, kco2e: 120},
        {entityId: 1, categoryId: 5, kco2e: 1},
        {entityId: 1, categoryId: 6, kco2e: 90},
        {entityId: 1, categoryId: 7, kco2e: 1500},
        {entityId: 2, categoryId: 2, kco2e: 800},
        {entityId: 2, categoryId: 2, kco2e: 100},
        {entityId: 2, categoryId: 3, kco2e: 126},
        {entityId: 2, categoryId: 5, kco2e: 20},
        {entityId: 2, categoryId: 6, kco2e: 60},
        {entityId: 2, categoryId: 7, kco2e: 1200},
        {entityId: 3, categoryId: 2, kco2e: 1050},
        {entityId: 3, categoryId: 2, kco2e: 155},
        {entityId: 3, categoryId: 3, kco2e: 120},
        {entityId: 3, categoryId: 5, kco2e: 1},
        {entityId: 3, categoryId: 6, kco2e: 90},
        {entityId: 3, categoryId: 7, kco2e: 1500},
      ] as IResultData[],
      chartType: IChartType.DONUT as IChartType,
      organisations: null,
    }
  },
  actions: {
    getOrganizationData() {
      const organisationsStore = useOrganisationsStore();
      this.organisations = organisationsStore.data;
    },
    setChartType(type: IChartType) {
      this.chartType = type;
    },
    addNewResult(newData: IResultData) {
      const { entityId, categoryId, kco2e } = newData;

      this.data.push({
        entityId,
        categoryId,
        kco2e
      })
    }
  },
  getters: {
    getTypeData(state) {
      const data = state.data.map(r => {
        return {
          kco2e: r.kco2e,
          organisation: this.organisations.find(o => o.id == r.entityId).name
        }
      }).reduce((sum, {kco2e, organisation}) => {
        sum[organisation] = sum[organisation] || {organisation, kco2e: 0};
        sum[organisation].kco2e += kco2e;
        return sum;
      }, {});

      if(this.chartType === IChartType.DONUT) {
        return Object.values(data).map((d: any) => d.kco2e);
      } else {
        const newData = Object.values(data).map((d: IChartData) => {
          return {
            x: d.organisation,
            y: d.kco2e
          }
        });
  
        return [
          {
            data: newData
          },
        ]
      }
    }
  }
})
