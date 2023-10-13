import Home from "../pages/Home.vue";
import ListItems from "../pages/ListItems.vue";
import MainLayout from "../pages/MainLayout.vue";
import InfoItem from "../pages/InfoItem.vue";
import Map from "../pages/Map.vue";
import TouchScreen from "../pages/TouchScreen.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "home", component: Home, props: true },
      { path: "/opere", name: "ListItems", component: ListItems, props: true },
      { path: "/map", name: "Map", component: Map, props: true },
      { path: "/touch", name: "TouchScreen", component: TouchScreen, props: true },
      { path: "/info/:id", name: "InfoItem", component: InfoItem, props: true },

    ],
  },
];

export default routes;
