<template>
     <div class="table">

     </div>
     <form @submit.prevent="addProduct">
          <div class="form-group">
               <label><strong>Nama Produks</strong> </label>
               <input type="text" v-model="product.name" class="form-control" required>
          </div>
          <div class="form-group">
               <label><strong>Harga</strong></label>
               <input type="number" v-model="product.price" class="form-control" required min="1">
          </div>
          <div class="form-group">
               <label><strong>Stok</strong></label>
               <input type="number" v-model="product.stock" class="form-control" required min="0">
          </div>
          <button type="submit" class="btn btn-primary mt-2">{{ editMode ? "update" : "Tambah Produk" }}</button>
     </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
     props: {
          productData: Object,
          editMode: Boolean,
     },
     data() {
          return {
               product: {
                    id: this.productData?.id || null,
                    name: this.productData?.name || '',
                    price: this.productData?.price || 0,
                    stock: this.productData?.stock || 0,
               }
          }
     },
     methods: {
          ...mapActions(['addProduct', 'updateProduct']),
          saveProduct() {
               if (this.editMode) {
                    this.updateProduct(this.product);
               } else {
                    this.addProduct(this.product);
               }
               this.$emit("form-submitted");
          }
     }
};
</script>