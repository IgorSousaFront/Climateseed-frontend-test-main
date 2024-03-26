<template>
  <div class="wrapper">
    <div class="buttons">
      <button
        v-for="item in typeList"
        :class="{active: resultsStore.chartType === item}"
        @click="setChartType(item)"
      >
        {{ item }}
      </button>
    </div>
    <apexchart
      :series="series"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, type Ref } from 'vue';
  import { useResultsStore, IChartType } from '@/stores/ResultsStore';

  const resultsStore = useResultsStore();

  resultsStore.getOrganizationData();

  const legend = resultsStore.organisations.map(e => e.name);

  const typeList: Ref<IChartType[]> = ref([
    IChartType.DONUT,
    IChartType.BAR
  ])

  function setChartType(type: IChartType) {
    resultsStore.setChartType(type)

    chartOptions.value = {
      ...chartOptions.value,
      chart: {
        ...chartOptions.value.chart,
        type: resultsStore.chartType
      }
    }
  }

  function updateChart() {
    // this is necessary because the lib
    // does not know how to deal with the
    // series and chartoptions update at same time :/
    setTimeout(() => {
      series.value = resultsStore.getTypeData
    }, 100)
  }
  
  const series = ref(resultsStore.getTypeData)

  watch(resultsStore, () => {
    updateChart()
  })

  const chartOptions = ref({
    chart: {
      type: IChartType.DONUT,
      stacked: true,
      height: '100%',
      width: '100%',
    },
    colors: ['#26C281', '#4B77BE', '#E43A45'],
    labels: legend,
    dataLabels: {
      enabled: false,
    },
    legend: {
      labels: {
        colors: '#ffffff',
      },
    },
    stroke: {
      width: 3,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        horizontal: false
      },
      pie: {
        expandOnClick: false,
        donut: {
          size: '85%',
          labels: {
            show: true,
            borderRadius: 15,
            total: {
              show: true,
              showAlways: true,
              color: '#ffffff'
            },
            value: {
              color: '#ffffff'
            }
          }
        }
      }
    }
  })

</script>

<style scoped>
.wrapper {
  width: 100%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 2rem;
  gap: 1.5rem;
}

.buttons > button {
  padding: 1rem 2rem;
  border-radius: .5rem;
  border: 2px solid var(--color-border);
  background-color: var(--color-border);
  cursor: pointer;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
}

.buttons > button:hover {
  border-color: var(--color-border-hover);
}

.buttons > button.active {
  border-color: var(--color-border-hover);
  background-color: var(--color-border-hover);
  color: var(--vt-c-black);
}
</style> 