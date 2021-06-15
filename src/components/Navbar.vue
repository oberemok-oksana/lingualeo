<template>
  <nav>
    <!-- <router-link :to="{ name: 'Home' }">Home</router-link> -->
    <div class="menu-item">
      <router-link :to="{ name: 'Home' }">LinguaLeo</router-link>
    </div>
    <Dropdown title="Задания" :items="task" />
    <!-- <div class="menu-item"><a href="#">Задания</a></div> -->
    <Dropdown title="Джунгли" :items="jungle" />
    <Dropdown title="Тренировки" :items="allWorkout" />
    <router-link :to="{ name: 'LeoSprint' }"></router-link>
    <router-link :to="{ name: 'Workouts' }"></router-link>
    <!-- <Dropdown title="Тренировки" :items="workout" /> -->

    <div class="menu-item"><a href="#">Словарь</a></div>
    <div class="menu-item"><a href="#">About</a></div>
  </nav>
</template>


<script>
import Dropdown from "./Dropdown";
import LeoSprint from "../views/LeoSprint";

export default {
  name: "Navbar",
  components: {
    Dropdown,
  },
  data() {
    return {
      task: [
        {
          title: "Карта обучения",
          link: "#",
        },
        {
          title: "Мой прогресс",
          link: "#",
        },
      ],
      jungle: [
        {
          title: "Музыка",
          link: "#",
        },
        {
          title: "Фильмы и видео",
          link: "#",
        },
        {
          title: "Книги и статьи",
          link: "#",
        },
        {
          title: "Коллекции",
          link: "#",
        },
        {
          title: "Мои материалы",
          link: "#",
        },
        {
          title: "Добавить материал",
          link: "#",
        },
      ],
      allWorkout: [
        {
          title: "Словарные карточки",
          link: { name: "Workouts" },
        },
        {
          title: "Слово-перевод",
          link: { name: "WordTranslation" },
        },
        {
          title: "Лео-спринт",
          link: { name: "LeoSprint" },
        },
        {
          title: "Перевод-слово",
          link: { name: "TranslationWord" },
        },
        {
          title: "Конструктор слов",
          link: { name: "WordsConstructor" },
        },
        {
          title: "Повторение",
          link: { name: "Repeating" },
        },
      ],
    };
  },
};
</script>

  <style>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .menu-item {
  color: #fff;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.3s;
  cursor: pointer;
}
nav .menu-item.active,
nav .menu-item:hover {
  background-color: #444;
  border-bottom-color: #ff5858;
}
.menu-item a {
  color: inherit;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
</style>



