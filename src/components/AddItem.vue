<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="item.name"
            name="name"
          />
        </div>
  
        <div class="form-group">
          <label for="price">Price</label>
          <input
          type="number"
            class="form-control"
            id="price"
            required
            v-model="item.price"
            name="price"
          />
        </div>

        <div class="form-group">
            <label for="quantity">Quantity</label>
            <input
            type="number"
              class="form-control"
              id="quantity"
              required
              v-model="item.quantity"
              name="quantity"
            />
          </div>
  
        <button @click="saveItem" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newItem">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import ItemDataService from "../services/ItemDataService";

  import { ref } from 'vue';

  export default {
    name: "add-item",

    setup() {
      const item = ref({
        id: null,
        title: '',
        price: 0,
        quantity: 0,
        published: false
      });

      const submitted= ref (false);

      function saveItem() {
        var data = {
          name: item.value.name,
          price: item.value.price,
          quantity: item.value.quantity
        }
        ItemDataService.create(data)
          .then(response => {
            item.value.id = response.data.id;
            console.log(response.data);
            submitted.value = true;
          })
          .catch(e => {
            console.log(e);
          });
      }

      function newItem() {
        submitted.value = false;
        item.value = {};
      }

      return {
        item,
        submitted,
        saveItem,
        newItem
      }

  }
}

  
  /*export default {
    name: "add-item",
    data() {
      return {
        item: {
          id: null,
          title: "",
          price: 0,
          quantity: 0,
          published: false
        },
        submitted: false
      };
    },
    methods: {
      saveItem() {
        var data = {
          name: this.item.name,
          price: this.item.price,
          quantity: this.item.quantity
        };
  
        ItemDataService.create(data)
          .then(response => {
            this.item.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newItem() {
        this.submitted = false;
        this.item = {};
      }
    }
  };*/
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>