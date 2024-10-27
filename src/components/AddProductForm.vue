<template>
     <div class="container mt-4">
          <h2>{{ isEditing ? 'Edit Produk' : 'Tambah Produk Baru' }}</h2>
          <form @submit.prevent="submitForm">
               <div class="mb-3">
                    <label for="name" class="form-label">Nama Produk</label>
                    <input type="text" id="name" v-model="newProduct.name" class="form-control" required />
                    <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
               </div>
               <div class="mb-3">
                    <label for="price" class="form-label">Harga</label>
                    <input type="number" id="price" v-model="newProduct.price" class="form-control" required min="0" />
                    <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
               </div>
               <div class="mb-3">
                    <label for="stock" class="form-label">Stok</label>
                    <input type="number" id="stock" v-model="newProduct.stock" class="form-control" required min="0" />
                    <div v-if="errors.stock" class="text-danger">{{ errors.stock }}</div>
               </div>
               <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Produk' : 'Simpan Produk'
                    }}</button>
          </form>
     </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

interface Product {
     name: string;
     price: number;
     stock: number;
}

export default defineComponent({
     name: 'AddProductForm',
     props: {
          selectedProduct: {
               type: Object as () => Product | null,
               default: null,
          },
     },
     data() {
          return {
               newProduct: {
                    name: '',
                    price: 0,
                    stock: 0,
               } as Product,
               errors: {
                    name: '',
                    price: '',
                    stock: '',
               },
               isEditing: false,
          };
     },
     watch: {
          selectedProduct: {
               immediate: true,
               handler(newVal) {
                    if (newVal) {
                         this.isEditing = true;
                         this.newProduct = { ...newVal };
                    } else {
                         this.isEditing = false;
                         this.resetForm();
                    }
               },
          },
     },
     methods: {
          validateForm(): boolean {
               let valid = true;
               this.errors.name = '';
               this.errors.price = '';
               this.errors.stock = '';

               if (!this.newProduct.name) {
                    this.errors.name = 'Nama produk harus diisi.';
                    valid = false;
               }
               if (this.newProduct.price <= 0) {
                    this.errors.price = 'Harga harus lebih dari 0.';
                    valid = false;
               }
               if (this.newProduct.stock < 0) {
                    this.errors.stock = 'Stok tidak boleh negatif.';
                    valid = false;
               }

               return valid;
          },
          submitForm() {
               if (this.validateForm()) {
                    this.$emit(this.isEditing ? 'update-product' : 'add-product', { ...this.newProduct });
                    this.resetForm();
               }
          },
          resetForm() {
               this.newProduct = { name: '', price: 0, stock: 0 };
               this.errors = { name: '', price: '', stock: '' };
               this.isEditing = false;
          },
     },
});
</script>

<style scoped>
.form-label {
     margin-bottom: 0.5rem;
}
</style>