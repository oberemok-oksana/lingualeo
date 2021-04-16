<template>
  <header>
    <Navbar />
  </header>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<style >
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  width: 100%;
  background: #222;
  padding: 15px;
}
</style>
