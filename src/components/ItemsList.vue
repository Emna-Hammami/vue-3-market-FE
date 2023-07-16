<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="searchItem"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="page = 1; retrieveItems();"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>

    <div class="col-md-6">
      <h4>Items List</h4>
      <ul class="list-group" id="items-list">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(item, index) in items"
          :key="index"
          @click="setActiveItem(item, index)"
        >
          {{ item.name }}
        </li>
      </ul>


    <!--div class="list row">
      <div- class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Search
            </button>
          </div>
        </div>
      </div->
      <div class="col-md-6">
        <h4>Items List</h4>
        <ul-- class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(item, index) in items"
            :key="index"
            @click="setActiveItem(item, index)"
          >
            {{ item.name }}
          </li>
        </ul-->
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllItems">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentItem">
          <h4>Item</h4>
          <div>
            <label><strong>Name:</strong></label> {{ currentItem.name }}
          </div>
          <div>
            <label><strong>Price:</strong></label> {{ currentItem.price }}
          </div>
          <div>
            <label><strong>Quantity:</strong></label> {{ currentItem.quantity }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentItem.published ? "Published" : "Pending" }}
          </div>
  
          <router-link :to="'/items/' + currentItem.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on an Item...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ItemDataService from "../services/ItemDataService";
  
  export default {
    name: "items-list",
    data() {
      return {
        items: [],
        currentItem: null,
        currentIndex: -1,
        name: "",

        page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [3, 6, 9],
      };
    },
    methods: {
      getRequestParams(searchName, page, pageSize) {
      let params = {};

      if (searchName) {
        params["name"] = searchName;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
      retrieveItems() {
        const params = this.getRequestParams(
        this.searchName,
        this.page,
        this.pageSize
      );

      ItemDataService.getAll(params)
        .then((response) => {
          const { items, totalItems } = response.data;
          this.items = items;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      },
  
      refreshList() {
        this.retrieveItems();
        this.currentItem = null;
        this.currentIndex = -1;
      },
      handlePageChange(value) {
      this.page = value;
      this.retrieveItems();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveItems();
    },
  
      setActiveItem(item, index) {
        this.currentItem = item;
        this.currentIndex = item ? index : -1;
      },
  
      removeAllItems() {
        ItemDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchItem() {
        ItemDataService.findByName(this.name)
          .then(response => {
            this.items = response.data;
            this.setActiveItem(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveItems();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>