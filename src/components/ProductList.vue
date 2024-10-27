<template>
     <div class="container mt-4">
          <h2>Daftar Produk</h2>
          <input type="text" class="form-control" placeholder="Cari produk berdasarkan nama..." v-model="searchQuery"
               @input="filterProducts" />
          <div class="mt-3">
               <label for="sortBy">Urutkan berdasarkan:</label>
               <select id="sortBy" class="form-control" v-model="sortBy">
                    <option value="price">Harga</option>
                    <option value="stock">Stok</option>
               </select>

               <label for="sortOrder">Urutan:</label>
               <select id="sortOrder" class="form-control" v-model="sortOrder">
                    <option value="asc">Menaik</option>
                    <option value="desc">Menurun</option>
               </select>
          </div>
          <table class="table table-striped mt-3">
               <thead>
                    <tr>
                         <th>Nama Produk</th>
                         <th>Harga</th>
                         <th>Stok</th>
                         <th>Aksi</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="product in sortedProducts" :key="product.id">
                         <td>{{ product.name }}</td>
                         <td>{{ formatPrice(product.price) }}</td>
                         <td>{{ product.stock }}</td>
                         <td>
                              <button class="btn btn-warning" @click="editProduct(product)">
                                   Edit
                              </button>
                              <button class="btn btn-danger" @click="confirmDeleteProduct(product.id)">
                                   Hapus
                              </button>
                         </td>
                    </tr>
               </tbody>
          </table>
     </div>
</template>

<script lang="ts">
import {
     defineComponent,
     computed,
     ref
} from "vue";
import {
     useStore
} from "vuex";

export default defineComponent({
     name: "ProductList",
     setup() {
          const store = useStore();
          const searchQuery = ref("");
          const sortBy = ref("price");
          const sortOrder = ref("asc");

          const products = computed(() => store.getters.getProducts);

          const filteredProducts = computed(() => {
               return products.value.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
               );
          });

          const sortedProducts = computed(() => {
               return filteredProducts.value.sort((a, b) => {
                    const modifier = sortOrder.value === "asc" ? 1 : -1;

                    if (sortBy.value === "price") {
                         return (a.price - b.price) * modifier;
                    } else if (sortBy.value === "stock") {
                         return (a.stock - b.stock) * modifier;
                    }
                    return 0;
               });
          });

          function formatPrice(price: number): string {
               return new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
               }).format(price);
          }

          function editProduct(product: {
               id: number;
               name: string;
               price: number;
               stock: number;
          }) {
               this.$emit("edit-product", product);
          }

          function confirmDeleteProduct(productId: number) {
               const confirmDelete = confirm(
                    `Apakah Anda yakin ingin menghapus produk dengan ID "${productId}"?`
               );
               if (confirmDelete) {
                    store.dispatch("deleteProduct", productId);
               }
          }

          return {
               searchQuery,
               sortBy,
               sortOrder,
               sortedProducts,
               formatPrice,
               editProduct,
               confirmDeleteProduct,
          };
     },
});
</script>

<style scoped>
.table {
     margin-top: 20px;
}
</style>
