<template>
  <div class="wrapper">
    <h2>Number of employees by month</h2>
    <apexchart
      :series="series"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useOrganisationsStore } from '@/stores/OrganisationsStore';

  const organisationsStore = useOrganisationsStore();
  
  const series = ref(organisationsStore.getDataChart);

  const chartOptions = ref({
    chart: {
      height: 350,
      type: 'area'
    },
    colors: ['#26C281', '#4B77BE', '#E43A45'],
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Out", "Nov", "Dec"]
    },
    legend: {
      labels: {
        colors: '#ffffff',
      },
    },
  })

</script>

<style scoped>
.wrapper {
  width: 100%;
  color: var(--color-text);
}

h2 {
  margin-bottom: 20px;
}
</style> 