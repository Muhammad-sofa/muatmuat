<template>
     <div class="mb-3">
          <input v-model="searchQuery" @input="$emit('search', searchQuery)" type="text" placeholder="Cari Produk ..." class="form-control"/>
          <select @change="$emit('sort', $event.target.value)" class="form-select mt-2">
               <option value="price">Urutkan berdasarkan Harga</option>
               <option value="stock">Urutkan berdasarkan Stok</option>
          </select>
     </div>
</template>

<script>
export default {
     data() {
          return {
               searchQuery: '',
          };
     },

     sortProducts(criteria) {
          if (criteria === "price") {
               this.products.sort((a, b) => a.price - b.price);
          } else if (criteria === "stock") {
               this.products.sort((a, b) => a.stock - b.stock);
          }
     }
};
</script>