import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./registerServiceWorker";
import "@/assets/index.css";
loadFonts();

const clickOutside = {
  beforeMount: (el: any, binding: any) => {
    el.eventSetDrag = () => {
      el.setAttribute("data-dragging", "yes");
    };
    el.eventClearDrag = () => {
      el.removeAttribute("data-dragging");
    };
    el.eventOnClick = (event: any) => {
      const dragging = el.getAttribute("data-dragging");
      // Check that the click was outside the el and its children, and wasn't a drag
      console.log(document.elementsFromPoint(event.clientX, event.clientY));
      if (
        !document
          .elementsFromPoint(event.clientX, event.clientY)
          .includes(el) &&
        !dragging
      ) {
        // call method provided in attribute value
        binding.value(event);
      }
    };
    document.addEventListener("touchstart", el.eventClearDrag);
    document.addEventListener("touchmove", el.eventSetDrag);
    document.addEventListener("click", el.eventOnClick);
    document.addEventListener("touchend", el.eventOnClick);
  },
  unmounted: (el: any) => {
    document.removeEventListener("touchstart", el.eventClearDrag);
    document.removeEventListener("touchmove", el.eventSetDrag);
    document.removeEventListener("click", el.eventOnClick);
    document.removeEventListener("touchend", el.eventOnClick);
    el.removeAttribute("data-dragging");
  },
};

createApp(App)
  .directive("click-outside", clickOutside)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount("#app");
