<template>
  <header>
    <ul>
      <li><a href="#home">LinguaLeo</a></li>
      <li><a href="#task">Задания</a></li>
      <li><a href="#jungle">Джунгли</a></li>
      <li><a href="#workout">Тренировки</a></li>
      <li><a href="#vocab">Словарь</a></li>
      <li style="float: right"><a class="active" href="#about">About</a></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
  padding-left: 30px;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #4caf50;
}
</style>
