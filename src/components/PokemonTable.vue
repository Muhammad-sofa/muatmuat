<template>
     <div class="container mt-5">
          <h3 class="mb-4">Pokemon List</h3>
          <table class="table table-striped">
               <thead>
                    <tr>
                         <th scope="col">No</th>
                         <th scope="col">Name</th>
                         <th scope="col">Details</th>
                    </tr>
               </thead>
               <tbody>
                    <tr v-for="(pokemon, index) in pokemons" :key="pokemon.name">
                         <td>{{ index + 1 }}</td>
                         <td>{{ pokemon.name }}</td>
                         <td>
                              <button @click="fetchPokemonDetails(pokemon.url)" class="btn btn-primary btn-sm">
                                   View
                              </button>
                         </td>
                    </tr>
               </tbody>
          </table>

          <div v-if="selectedPokemon" class="modal fade show" style="display: block;">
               <div class="modal-dialog">
                    <div class="modal-content">
                         <div class="modal-header">
                              <h5 class="modal-title">{{ selectedPokemon.name }}</h5>
                              <button type="button" class="btn-close" @click="closeModal"></button>
                         </div>
                         <div class="modal-body">
                              <img :src="selectedPokemon.sprites.front_default" alt="pokemon-image" class="img-fluid" />
                              <p>Height: {{ selectedPokemon.height }}</p>
                              <p>Weight: {{ selectedPokemon.weight }}</p>
                         </div>
                         <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
     name: 'PokemonTable',
     setup() {
          const pokemons = ref([]);
          const selectedPokemon = ref(null);

          async function fetchPokemons() {
               try {
                    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                    const data = await response.json();
                    pokemons.value = data.results;
               } catch (error) {
                    console.error('Error fetching pokemons:', error);
               }
          }

          async function fetchPokemonDetails(url: string) {
               try {
                    const response = await fetch(url);
                    selectedPokemon.value = await response.json();
               } catch (error) {
                    console.error('Error fetching pokemon details:', error);
               }
          }

          function closeModal() {
               selectedPokemon.value = null;
          }

          onMounted(() => {
               fetchPokemons();
          });

          return {
               pokemons,
               selectedPokemon,
               fetchPokemonDetails,
               closeModal,
          };
     },
});
</script>

<style scoped>
.modal.fade.show {
     display: block;
     background: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
     display: none;
}
</style>