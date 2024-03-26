<template>
  <aside :class="{ open: props.isOpen }">
    <div class="brand" @click="$emit('onClose')">
      <img src="@/assets/logo.png" alt="">
    </div>
    <form @submit.prevent="handleSubmitForm">
      <p>Add new Result</p>

      <div class="fieldTextBox">
        <label for="category">Category</label>
        <select id="category" v-model="formData.categoryId">
          <option disabled selected>Please select one</option>
          <option v-for="category in categories.data" :value="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div class="fieldTextBox">
        <label for="organisation">Organisation</label>
        <select id="organisation" v-model="formData.organisationId">
          <option disabled selected>Please select one</option>
          <option v-for="organisation in organisations.data" :value="organisation.id">{{ organisation.name }}</option>
        </select>
      </div>

      <div class="fieldTextBox">
        <label for="kco2e">kco2e</label>
        <input id="kco2e" type="number" v-model="formData.emission" />
      </div>

      <input type="submit" value="Add"/>
    </form>
  </aside>
</template>

<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { useCategoriesStore } from '@/stores/CategoriesStore';
  import { useOrganisationsStore } from '@/stores/OrganisationsStore';
  import { useResultsStore } from '@/stores/ResultsStore';

  const emit = defineEmits(['onClose'])

  const categories = useCategoriesStore()
  const organisations = useOrganisationsStore()
  const resultsStore = useResultsStore();
  
  interface INavProps {
    isOpen: Boolean
  }

  interface IFormData {
    categoryId: number | null
    organisationId: number | null
    emission: number | null
  }

  const initialFormState:IFormData = {
    categoryId: null,
    organisationId: null,
    emission: null
  } 

  const formData: Ref<IFormData> = ref({...initialFormState})

  function resetForm() {
    formData.value = {...initialFormState};
  }

  function handleSubmitForm() {
    const { organisationId, categoryId, emission } = formData.value;

    resultsStore.addNewResult({
      entityId: organisationId,
      categoryId,
      kco2e: emission
    })
    resetForm();
    emit('onClose')
  }

  const props = defineProps<INavProps>();
</script>

<style scoped>
aside {
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  height: 100vh;
  width: 380px;
  padding: 2rem;
  background-color: var(--color-background-mute);
  transition: all ease .3s;
  transform: translateX(-100%);
  border-right: 2px solid var(--color-border);
}

aside.open {
  transform: translateX(0);
}

.brand {
  filter: invert(1);
}

form {
  position: relative;
  padding: 45px 0;
}

form p {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--color-text);
}

form label {
  margin-bottom: .5rem;
  display: block;
}

form input,
form select {
  display: block;
  padding: 1rem;
  border-radius: .5rem;
  font-size: 18px;
  width: 100%;
  border: none;
  background: none;
  border: 2px solid var(--color-text);
  color: var(--color-text);
}

form input[type="submit"] {
  cursor: pointer;
  background-color: var(--color-border-hover);
  border-color: var(--color-border-hover);
  color: var(--vt-c-black);
  font-weight: bold;
}

form input:focus,
form select:focus {
  outline: none;
}

.fieldTextBox {
  margin-bottom: 1.25rem;
}

@media (prefers-color-scheme: dark) {
  .brand {
    filter: initial;
  }
}

</style>
