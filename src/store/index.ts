import { createStore } from 'vuex';

interface Product {
     id: number;
     name: string;
     price: number;
     stock: number;
}

interface State {
     products: Product[];
}

const store = createStore < State > ({
     state: {
          products: [
               { id: 1, name: 'Produk A', price: 100000, stock: 10 },
               { id: 2, name: 'Produk B', price: 200000, stock: 5 },
               { id: 3, name: 'Produk C', price: 150000, stock: 0 },
          ],
     },
     mutations: {
          addProduct(state, product: Product) {
               state.products.push(product);
          },
          updateProduct(state, updatedProduct: Product) {
               const index = state.products.findIndex(p => p.id === updatedProduct.id);
               if (index !== -1) {
                    state.products[index] = { ...state.products[index], ...updatedProduct };
               }
          },
          deleteProduct(state, productId: number) {
               state.products = state.products.filter(product => product.id !== productId);
          },
     },
     actions: {
          addProduct({ commit }, product: Product) {
               commit('addProduct', product);
          },
          updateProduct({ commit }, updatedProduct: Product) {
               commit('updateProduct', updatedProduct);
          },
          deleteProduct({ commit }, productId: number) {
               commit('deleteProduct', productId);
          },
     },
     getters: {
          getProducts(state) {
               return state.products;
          },
     },
});

export default store;
