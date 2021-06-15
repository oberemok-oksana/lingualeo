import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home";
import Workouts from "./views/Workout";
import LeoSprint from "./views/LeoSprint";
import WordTranslation from "./views/WordTranslation";
import TranslationWord from "./views/TranslationWord";
import WordsConstructor from "./views/WordsConstructor";
import Repeating from "./views/Repeating";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/workouts",
    name: "Workouts",
    component: Workouts
  },
  {
    path: "/leo-sprint",
    name: "LeoSprint",
    component: LeoSprint
  },
  {
    path: "/word-translation",
    name: "WordTranslation",
    component: WordTranslation
  },
  {
    path: "/translation-word",
    name: "TranslationWord",
    component: TranslationWord
  },
  {
    path: "/words-constructor",
    name: "WordsConstructor",
    component: WordsConstructor
  },
  {
    path: "/repeating",
    name: "Repeating",
    component: Repeating
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
