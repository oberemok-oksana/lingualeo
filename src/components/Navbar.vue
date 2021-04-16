<template>
  <nav>
    <div class="menu-item"><a href="#">LinguaLeo</a></div>
    <Dropdown title="Задания" :items="task" />
    <!-- <div class="menu-item"><a href="#">Задания</a></div> -->
    <Dropdown title="Джунгли" :items="jungle" />
    <Dropdown title="Тренировки" :items="workout" />
    <div class="menu-item"><a href="#">Словарь</a></div>
    <div class="menu-item"><a href="#">About</a></div>
  </nav>
</template>


<script>
import Dropdown from "./Dropdown";

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
      workout: [
        {
          title: "Грамматические",
          link: "#",
        },
        {
          title: "Словарные",
          link: "#",
        },
        {
          title: "Чтение",
          link: "#",
        },
        {
          title: "Аудирование",
          link: "#",
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
}
nav .menu-item.active,
nav .menu-item:hover {
  background-color: #444;
  border-bottom-color: #ff5858;
}
nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>



//  <ul>
//       <li><a href="#home">LinguaLeo</a></li>
//       <li><a href="#task">Задания</a></li>
//       <li><a href="#jungle">Джунгли</a></li>
//         <li><a href="#workout">Тренировки </a></li>
      

//       <li><a href="#vocab">Словарь</a></li>
//       <li style="float: right"><a class="active" href="#about">About</a></li>
//     </ul>

// ul {
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
//   background-color: #333;
// }

// li {
//   float: left;
//   padding-left: 30px;
// }

// li a {
//   display: block;
//   color: white;
//   text-align: center;
//   padding: 14px 16px;
//   text-decoration: none;
// }

// li a:hover:not(.active) {
//   background-color: #111;
// }

// .active {
//   background-color: #4caf50;
// }