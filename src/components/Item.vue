<template>
    <div v-if="currentItem" class="edit-form">
      <h4>Item</h4>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name"
            v-model="currentItem.name"
          />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" class="form-control" id="price"
            v-model="currentItem.price"
          />
        </div>
        <div class="form-group">
            <label for="quantity">Quantity</label>
            <input type="number" class="form-control" id="quantity"
              v-model="currentItem.quantity"
            />
          </div>
  
        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentItem.published ? "Published" : "Pending" }}
        </div>
      </form>
  
      <button class="badge badge-primary mr-2"
        v-if="currentItem.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button v-else class="badge badge-primary mr-2"
        @click="updatePublished(true)"
      >
        Publish
      </button>
  
      <button class="badge badge-danger mr-2"
        @click="deleteItem"
      >
        Delete
      </button>
  
      <button type="submit" class="badge badge-success"
        @click="updateItem"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on an Item...</p>
    </div>
  </template>
  
  <script>
  import ItemDataService from "../services/ItemDataService";
  /*export default {
    name: "itemApp",
    
    data() {
      return {
        currentItem: null,
        message: ''
      };
    },
    methods: {
      getItem(id) {
        ItemDataService.get(id)
          .then(response => {
            this.currentItem = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updatePublished(status) {
        var data = {
          id: this.currentItem.id,
          name: this.currentItem.name,
          quantity: this.currentItem.quantity,
          price: this.currentItem.price,
          published: status
        };
  
        ItemDataService.update(this.currentItem.id, data)
          .then(response => {
            console.log(response.data);
            this.currentItem.published = status;
            this.message = 'The status was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateItem() {
        ItemDataService.update(this.currentItem.id, this.currentItem)
          .then(response => {
            console.log(response.data);
            this.message = 'The item was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteItem() {
        ItemDataService.delete(this.currentItem.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "items" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getItem(this.$route.params.id);
    }
  };*/


  import { ref } from "@vue/composition-api";

  export default {
    name: "itemApp",

    setup() {
      const currentItem = ref(null);
      const message = ref('');


      function getItem(id) {
        ItemDataService.get(id)
          .then(response => {
            currentItem.value = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }

      function updatePublished(status) {
        var data = {
          id: currentItem.value.id,
          name: currentItem.value.name,
          quantity: currentItem.value.quantity,
          price: currentItem.value.price,
          published: status
        };
   ItemDataService.update(currentItem.value.id, data)
    .then(response => {
      console.log(response.data);
      currentItem.value.published = status;
      message.value = 'The status was updated successfully!';
    })
    .catch(e => {
      console.log(e);
    });
  }

      function updateItem() {
        ItemDataService.update(currentItem.value.id, currentItem.value)
          .then(response => {
            console.log(response.data);
            message.value = 'The item was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      }

    function deleteItem () {
        ItemDataService.delete(currentItem.value.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "items" });
          })
          .catch(e => {
            console.log(e);
          });
      }

      function mounted() {
      message.value = '';
      getItem(this.$route.params.id);
    }

    return{
      currentItem,
      message,
      getItem,
      updateItem,
      deleteItem,
      mounted,
      updatePublished
    }
    
  }
}


  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>