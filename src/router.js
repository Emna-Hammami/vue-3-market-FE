import { createRouter, createWebHistory } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/items",
    name: "items",
    component: () => import("./components/ItemsList")
  },
  {
    path: "/items/:id",
    name: "item-details",
    component: () => import("./components/Item")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddItem")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;