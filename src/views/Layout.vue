<template>
  <Header />
  <div class="list-charts">
    <div>
      <Chart />
    </div>
    <div>
      <EmployeesChart />
    </div>
  </div>
</template>

<script setup>
  // Components
  import Header from '@/components/Header/index.vue';
  import Chart from '@/components/Chart/index.vue';
  import EmployeesChart from '@/components/EmployeesChart/index.vue';
</script>

<style scoped>
.list-charts {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}

.list-charts > div {
  width: 100%;
  max-width: 50%;
}
</style>