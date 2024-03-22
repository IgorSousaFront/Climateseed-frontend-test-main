<template>
  <div>
    <apexchart :series="series" :options="chartOptions" type="donut">
    </apexchart>
  </div>
</template>

<script setup>
  import { useDataStore } from '../stores/data';

  const dataStore = useDataStore();
  const results = dataStore.results;
  const organisations = dataStore.organisations;

  const data = results.map(r => {
    return {
      kco2e: r.kco2e,
      organisation: organisations.find(o => o.id == r.entityId).name
    }
  }).reduce((sum, {kco2e, organisation}) => {
    sum[organisation] = sum[organisation] || {organisation, kco2e: 0};
    sum[organisation].kco2e += kco2e;
    return sum;
  }, {});

  const series = Object.values(data).map(d => d.kco2e);

  const legend = Object.keys(data);

  const chartOptions = {
    chart: {
      type: 'donut',
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
  }

</script>
