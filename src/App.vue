<template>
  <div>
    <header>
      <Navbar />
    </header>

    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",

  components: { Navbar },
};
</script>