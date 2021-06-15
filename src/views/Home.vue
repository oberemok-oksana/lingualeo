<template>
  <div class="root">
    <section class="main">
      <div class="container">
        <div class="my-vocab_buttons">
          <div class="vocab">Мои слова({{ wordContents.length }})</div>
          <div class="buttons">
            <button class="black_btn">Посмотреть все карточки</button>
            <button class="black_btn">Изучить слова</button>
          </div>
        </div>
        <div class="toolbar">
          <div class="wrapper-find">
            <input
              type="checkbox"
              @click="toggleSelect"
              :checked="selectAll"
              title="Select all"
            />
            <input
              @keyup.enter="multiple"
              v-model="findWord"
              type="text"
              placeholder="Найти"
              class="find"
            />
            <button class="add_btn" @click="multiple">Add</button>
            <i
              class="fas fa-trash-alt trash_icon_main"
              @click="deleteSelected"
              title="Delete selected"
            ></i>
            <div class="covert-data" v-show="visible">
              <div class="trans" @click="addWordContent(translation)">
                {{ translation }}
              </div>
              <input
                type="text"
                name="your_example"
                class="your_example"
                placeholder="Add your translation"
                v-model="ownTranslation"
              />
              <button
                class="your_word_btn"
                @click="addWordContent(ownTranslation)"
              >
                Add your word
              </button>
            </div>
          </div>
          <div class="wrapper-all">
            <div class="input-cover">
              <Dropdown title="Все тренировки" :items="allWorkout" />
              <router-link :to="{ name: 'LeoSprint' }"></router-link>
              <!-- <input type="text" placeholder="Все тренировки" /> -->
            </div>
            <div class="input-cover">
              <Dropdown title="Все слова" :items="allWords" />
            </div>
            <div class="status">
              <div class="icons" title="All words" @click="changeListToAll">
                Все
              </div>
              <div class="icons">
                <i
                  class="fas fa-paw not_learned"
                  title="Unlearned words"
                  @click="changeListToNotLearned"
                ></i>
              </div>
              <div class="icons">
                <i
                  class="fas fa-paw completed"
                  title="Learned words"
                  @click="changeListToLearned"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="set-words_place">
          <transition-group
            name="staggered-fade"
            tag="ul"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
          >
            <li v-for="(item, i) in findWords" :key="i" class="list">
              <div class="word">
                <input type="checkbox" v-model="item.checked" />
                <div class="meaning">{{ item.meaning }}</div>
                <div class="translation">{{ item.translation }}</div>
                <div class="status">
                  <button
                    class="word_status"
                    title="Click here for changing word's status to 'New"
                    @click="changeToNotLearned(item)"
                  >
                    <i class="far fa-hand-pointer"></i>
                  </button>
                  <button
                    class="word_status"
                    title="Click here for changing word's status to 'Learned'"
                    @click="changeStatusToCompleted(item)"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <i
                    class="fas fa-check-circle"
                    :class="{
                      completed: item.status == 'learned',
                      not_learned: item.status == 'not learned',
                    }"
                  ></i>
                </div>
                <!-- <button @click="translate">Click</button> -->

                <div class="delete" @click="deleteWord(i)">
                  <i class="fas fa-trash-alt trash_icon"></i>
                </div>
              </div>
              <hr />
            </li>
          </transition-group>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown";
import translate from "google-translate-api-browser";
export default {
  name: "Home",

  components: { Dropdown },
  data() {
    return {
      allWorkout: [
        {
          title: "Все",
          link: "#",
        },
        {
          title: "Брейн-шторм",
          link: "#",
        },
        {
          title: "Лео-спринт",
          link: "/leo-sprint",
        },
      ],
      allWords: [
        {
          title: "Все слова",
          link: "#",
        },
        {
          title: "Слова",
          link: "#",
        },
        {
          title: "Фразы",
          link: "#",
        },
        {
          title: "Предложения",
          link: "#",
        },
      ],
      findWord: "",
      translation: "",
      ownTranslation: "",
      visible: false,
      wordContents: JSON.parse(localStorage.getItem("wordContents")) || [],
      page: "All",
    };
  },
  methods: {
    async multiple() {
      if (this.findWord == "") {
        alert("Please,write down your word.");
      } else {
        this.visible = true;
        const result = await translate(this.findWord, { to: "ru", from: "en" });

        this.translation = result.text;
      }
    },
    async addWordContent(word) {
      const newWord = {
        meaning: this.findWord,
        translation: word,
        status: "not learned",
        checked: false,
      };
      //
      const existingWord = this.wordContents.find((item) => {
        if (this.findWord == item.meaning) {
          return true;
        }
      });

      if (this.findWord == "") {
        alert("Please, add your word");
      } else if (existingWord) {
        alert("You've already have this word. You can change its status.");
      } else {
        this.wordContents.unshift(newWord);
        this.findWord = "";
        this.translation = "";
        this.visible = false;
      }
    },

    deleteWord(i) {
      this.wordContents.splice(i, 1);
    },
    changeStatusToCompleted(item) {
      item.status = "learned";
    },
    changeToNotLearned(item) {
      item.status = "not learned";
    },
    toggleSelect() {
      const select = this.selectAll;
      this.wordContents.forEach(function (item) {
        item.checked = !select;
      });
    },
    deleteSelected() {
      this.wordContents = this.wordContents.filter((item) => {
        return !item.checked;
      });
    },
    beforeEnter(item) {
      item.style.opacity = 0;
      item.style.height = 0;
    },
    enter(item, done) {
      const delay = item.dataset.index * 150;
      setTimeout(function () {
        Velocity(item, { opacity: 1, height: "1.6em" }, { complete: done });
      }, delay);
    },
    leave(item, done) {
      const delay = item.dataset.index * 150;
      setTimeout(function () {
        Velocity(item, { opacity: 0, height: 0 }, { complete: done });
      }, delay);
    },
    changeListToNotLearned() {
      this.page = "Not learned";
    },
    changeListToLearned() {
      this.page = "Learned";
    },
    changeListToAll() {
      this.page = "All";
    },
    async translate() {
      const result = await translate(this.findWord, { to: "ru", from: "en" });
      console.log(result.text);
    },
  },
  computed: {
    selectAll() {
      return this.wordContents.every(function (item) {
        return item.checked;
      });
    },
    findWords() {
      const filteredByName = this.wordContents.filter((item) => {
        return item.meaning
          .toLowerCase()
          .startsWith(this.findWord.toLowerCase());
      });

      return filteredByName.filter((item) => {
        if (this.page == "All") {
          return true;
        } else if (this.page == "Not learned" && item.status == "not learned") {
          return true;
        } else if (this.page == "Learned" && item.status == "learned") {
          return true;
        } else return false;
      });
    },
  },
  watch: {
    wordContents: {
      handler(value) {
        localStorage.setItem("wordContents", JSON.stringify(value));
      },
      deep: true,
    },
  },
};
</script>

<style >
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.root {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  width: 100%;
  background: #222;
  padding: 15px;
}
.main {
  flex-grow: 1;
}
.container {
  max-width: 980px;
  background-color: #fff;
  margin: 0 auto;
  height: 100vh;
}
.my-vocab_buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vocab {
  padding: 15px 30px;
  font-size: 21px;
}
.my-vocab_buttons .buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding-right: 20px;
}
.black_btn {
  padding: 10px 10px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  background-color: #222;
  color: #fff;
  outline: none;
  cursor: pointer;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 10px 10px;
}
.covert-data {
  display: flex;
  flex-direction: column;
  gap: 7px;
  text-align: start;
  align-items: center;
}
.trans {
  border: 1px solid grey;
  width: 150px;
  padding: 2px 11px;
  font-family: "Times New Roman", Times, sans-serif;
  font-size: 15px;
}
.translation {
  min-width: 150px;
}
.wrapper-find .find {
  border-radius: 4px;
  padding: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  border: 1px solid #76777c;
}
.find:hover,
.find:focus {
  background: rgba(0, 0, 0, 0);
  color: black;
  box-shadow: inset 0 0 0 1px #858da4;
}
.wrapper-all {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  width: 50%;
}
.wrapper-all .status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 21px;
  background-color: #e2e2e2;
  padding: 10px 13px;
  border-radius: 10px;
}
.toolbar .wrapper-find {
  gap: 12px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-left: 20px;
  width: 50%;
}
.menu-item svg {
  width: 10px;
  margin-left: 13px;
}
.wrapper-all .menu-item {
  color: #7a7672;
  text-decoration: none;
  background-color: #222;
  padding: 10px 15px;
  border-radius: 10px;
}
.wrapper-all .menu-item a {
  text-decoration: none;
  color: #fff;
}
hr {
  border-bottom: none;
}

.wrapper-all .icons {
  font-size: 16px;
  color: #7a7672;
  cursor: pointer;
}
.word {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  min-height: 40px;
  margin-top: 10px;
}
.word .status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.set-words_place .list {
  list-style-type: none;
}
.completed {
  color: rgb(64, 139, 64);
}
.not_learned {
  color: #f8c030;
}
.trash_icon {
  margin-right: 45px;
  color: #23243a;
}
.trash_icon_main {
  color: red;
}
.set-words_place .meaning {
  min-width: 150px;
  font-weight: 700;
  color: #50184a;
}
.add_btn {
  border: none;
  width: 50px;
  height: 33px;
  border-radius: 4px;
  outline: none;
  transition: all 500ms ease;
  cursor: pointer;
}
.add_btn:hover {
  background: rgba(0, 0, 0, 0);
  color: black;
  box-shadow: inset 0 0 0 1px #858da4;
}
.your_example {
  border: 1px solid black;
  padding-left: 8px;
  height: 25px;
  width: 150px;
  font-family: "Times New Roman", Times, sans-serif;
  font-size: 15px;
}
.your_word_btn {
  border-radius: 5px;
  outline: none;
  padding: 5px 7px;
  border: none;
}
.your_word_btn:hover {
  background: rgba(0, 0, 0, 0);
  color: black;
  box-shadow: inset 0 0 0 1px #858da4;
}
</style>
