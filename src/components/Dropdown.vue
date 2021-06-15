<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">{{ title }}</a>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#FFF"
      ></path>
    </svg>
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in items" :key="i" class="menu-item">
          <router-link :to="item.link">{{ item.title }}</router-link>
        </div>
      </div>
    </transition>
    ​
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["title", "items"],
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style>
.menu-item {
  position: relative;
}
.menu-item svg {
  width: 10px;
  margin-left: 10px;
}
.menu-item .sub-menu {
  position: absolute;
  background-color: #e2e2e2;
  top: calc(100%);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0px 0px 16px 16px;
  z-index: 1;
  min-width: 100%;
  width: max-content;
}

nav .menu-item .sub-menu {
  top: calc(100% + 18px);
  background-color: #222;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>