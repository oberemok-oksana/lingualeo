<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <div class="title_and_back">
          <div class="word_cards">
            {{ title }}
            <span class="info"><i class="fas fa-info-circle 2x"></i></span>
          </div>

          <button @click="redirect" class="back">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="cards_content" v-show="!done">
          <div class="words_amount" v-show="!tick && !times">
            <span>{{ amount }}</span>
            <span>слов</span>
          </div>
          <div class="words_amount green_tick" v-show="tick">
            <i class="fas fa-check"></i>
          </div>
          <div class="words_amount red_tick" v-show="times">
            <i class="fas fa-times"></i>
          </div>
          <div class="words_meaning">{{ words[currentIndex].meaning }}</div>
          <div class="timer">{{ timer }}</div>
          <div class="buttons_with_arrows">
            <div class="buttons">
              <button
                class="btn"
                v-for="(translation, index) in translations"
                :key="index"
                @click="pushButton(translation)"
              >
                {{ translation }}
              </button>
              <!-- <button class="btn">{{ translation}}</button> -->
            </div>
            <div class="arrows">
              <i class="fas fa-long-arrow-alt-left"></i>
              <i class="fas fa-long-arrow-alt-right"></i>
              <Keypress
                key-event="keyup"
                :key-code="37"
                @success="pushButton(translations[0])"
              />
              <Keypress
                key-event="keyup"
                :key-code="39"
                @success="pushButton(translations[1])"
              />
              <Keypress key-event="keyup" :key-code="13" @success="enter" />
            </div>
          </div>
          <div class="text" v-show="timer == 0">Время вышло :(</div>
        </div>
        <div class="cards_content done" v-show="done">
          Congrats!
          <hr />
          Your score is :{{ score }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shuffle } from "../utils";
import Keypress from "vue-keypress";

export default {
  name: "Repeating",
  components: { Keypress },
  data() {
    return {
      title: "Повторение",
      words: JSON.parse(localStorage.getItem("wordContents")) || [],
      currentIndex: 0,
      amount: 30,
      translations: [],
      score: 0,
      done: false,
      timer: 7,
      timerId: null,
      selected: "",
      tick: false,
      times: false,
    };
  },
  created() {
    this.generateTranslations();
    this.timerId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      }
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timerId);
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Home" });
    },
    generateTranslations() {
      this.translations = [];
      this.translations.push(this.words[this.currentIndex].translation);
      let idx = Math.floor(Math.random() * this.words.length);
      let translation = this.words[idx].translation;
      this.translations.unshift(translation);

      shuffle(this.translations);
    },
    pushButton(translation) {
      if (this.amount <= 30 && this.amount > 0) {
        if (
          this.words[this.currentIndex].translation === translation &&
          this.timer > 0
        ) {
          this.score++;
          this.tick = true;
        } else {
          this.times = true;
        }

        this.selected = translation;
        this.amount--;
      } else {
        this.done = true;
      }
      setTimeout(() => {
        this.tick = false;
        this.times = false;

        this.currentIndex = Math.floor(Math.random() * this.words.length);
        this.generateTranslations();
        this.timer = 7;
      }, 1000);
    },
    enter() {
      if (this.done == true) {
        this.amount = 30;
        this.done = false;
        this.generateTranslations();
      }
    },
  },
  watch: {
    words: {
      handler(value) {
        localStorage.setItem("wordContents", JSON.stringify(value));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.wrapper {
  background: url(https://images.pexels.com/photos/1591305/pexels-photo-1591305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
    no-repeat center center fixed;
  background-size: cover;
}
.container {
  background: url(https://images.pexels.com/photos/1591305/pexels-photo-1591305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
    no-repeat center center fixed;
  background-size: cover;
}
.cards_content {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.words_amount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 100%;
  width: 90px;
  height: 90px;
  color: white;
  font-size: 20px;
  font-weight: 700;
}
.words_meaning {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 35px;
}
.buttons_with_arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
  margin-bottom: 20px;
}
.buttons {
  display: flex;
  align-items: center;
  gap: 50px;
}
.arrows {
  display: flex;
  color: white;
  gap: 345px;
  margin-top: 10px;
  font-size: 20px;
  opacity: 0.5;
}
.btn {
  border: none;
  min-width: 300px;
  min-height: 65px;
  border-radius: 5px;
  font-size: 25px;
  box-shadow: 4px 5px 3px -5px rgb(34 60 80 / 60%) inset;
  cursor: pointer;
  opacity: 1;
}
.btn:hover {
  opacity: 0.6;
}
hr {
  width: 270px;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.done {
  padding: 25px 10px;
  font-size: 35px;
}
.green_tick {
  background: green;
  font-size: 40px;
}
.red_tick {
  background: red;
  font-size: 40px;
}
</style>