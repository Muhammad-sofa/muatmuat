<template>
  <div id="app">
    <PokemonTable />
    <AddProductForm
      :selectedProduct="selectedProduct"
      @add-product="addProduct"
      @update-product="updateProduct"
    />
    <ProductList 
      :products="products" 
      @edit-product="selectProductForEdit"
      @delete-product="deleteProduct"
    />
  </div>
</template>

<script lang="ts">
import PokemonTable from './components/PokemonTable.vue';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import ProductList from './components/ProductList.vue';
import AddProductForm from './components/AddProductForm.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default defineComponent({
  name: 'App',
  components: {
    ProductList,
    AddProductForm,
    PokemonTable,
  },
  setup() {
    const store = useStore();
    const selectedProduct = ref(null);

    function addProduct(product: { name: string; price: number; stock: number }) {
      const newProduct = { ...product, id: Date.now() };
      store.dispatch('addProduct', newProduct);
    }

    function updateProduct(updatedProduct: { id: number; name: string; price: number; stock: number }) {
      store.dispatch('updateProduct', updatedProduct);
      selectedProduct.value = null;
    }

    function selectProductForEdit(product: { id: number; name: string; price: number; stock: number }) {
      selectedProduct.value = { ...product };
    }

    function deleteProduct(productId: number) {
      store.dispatch('deleteProduct', productId);
    }

    return {
      products: computed(() => store.getters.getProducts),
      selectedProduct,
      addProduct,
      updateProduct,
      selectProductForEdit,
      deleteProduct,
    };
  },
});
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
