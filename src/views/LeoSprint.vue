<template>
  <div>
    <div class="wrapper_sprint">
      <div class="container">
        <div class="title_and_back">
          <div class="word_cards">
            Лео-спринт
            <span class="info"><i class="fas fa-info-circle 2x"></i></span>
          </div>
          <button @click="redirect" class="back">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div v-if="timer <= 60" class="main_timer">
          {{ timer }}
        </div>

        <div class="main_card" v-show="visibleCard">
          <div class="bird_picture">
            <i class="fab fa-earlybirds"></i
            ><span class="guessed_words">{{ guessedWords }}</span>
          </div>
          <div>
            <div class="word_content">{{ words[currentIndex].meaning }}</div>
            <div class="translation_content">
              {{ translation }}
            </div>
            <div class="score">{{ score }}</div>
          </div>
          <div class="btns">
            <button class="right_btn" @click="wrongButton">Неверно</button>
            <button class="right_btn" @click="rightButton">Верно</button>
          </div>
          <div class="arrows">
            <Keypress key-event="keyup" :key-code="37" @success="wrongButton" />
            <i class="fas fa-long-arrow-alt-left"></i>
            <i class="fas fa-long-arrow-alt-right"></i>
            <Keypress key-event="keyup" :key-code="39" @success="rightButton" />
          </div>
        </div>
        <div class="main_card" v-if="!visibleCard && timer > 0">
          <div class="circle" v-if="readyTimer > 0">
            <div class="be_ready">Приготовтесь!</div>
            <div class="ready_timer spin">{{ readyTimer }}</div>
          </div>
        </div>
        <div class="main_card score" v-if="timer == 0">
          Your score is: {{ score }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Keypress from "vue-keypress";

export default {
  name: "LeoSprint",
  components: { Keypress },
  data() {
    return {
      words: JSON.parse(localStorage.getItem("wordContents")) || [],
      score: 0,
      currentIndex: 0,
      translation: "",
      timer: 64,
      visibleCard: false,

      readyTimer: 4,
      guessedWords: 0,
    };
  },
  created() {
    const idx = Math.floor(Math.random() * this.words.length);
    this.translation = this.words[idx].translation;

    let timerId = setInterval(() => {
      this.timer--;
    }, 1000);
    setTimeout(() => {
      this.visibleCard = false;
      clearInterval(timerId);
    }, 64000);
    let timerId2 = setInterval(() => {
      this.readyTimer--;
    }, 1000);
    setTimeout(() => {
      this.visibleCard = true;
      clearInterval(timerId2);
    }, 4000);
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Home" });
    },
    rightButton() {
      if (this.words[this.currentIndex].translation === this.translation) {
        this.score += 10;
        this.guessedWords++;
      } else {
        this.guessedWords = 0;
      }
      if (this.guessedWords > 12) {
        this.score = this.score + 70;
      } else if (this.guessedWords > 8) {
        this.score = this.score + 30;
      } else if (this.guessedWords > 4) {
        this.score = this.score + 10;
      }
      this.currentIndex = Math.floor(Math.random() * this.words.length);

      const num = Math.random();

      if (num <= 0.5) {
        this.translation = this.words[this.currentIndex].translation;
      } else {
        let idx = Math.floor(Math.random() * this.words.length);
        this.translation = this.words[idx].translation;
      }
    },
    wrongButton() {
      if (this.words[this.currentIndex].translation !== this.translation) {
        this.score += 10;
        this.guessedWords++;
      } else {
        this.guessedWords = 0;
      }
      if (this.guessedWords > 12) {
        this.score = this.score + 70;
      } else if (this.guessedWords > 8) {
        this.score = this.score + 30;
      } else if (this.guessedWords > 4) {
        this.score = this.score + 10;
      }
      this.currentIndex = Math.floor(Math.random() * this.words.length);

      const num = Math.random();
      if (num <= 0.5) {
        this.translation = this.words[this.currentIndex].translation;
      } else {
        let idx = Math.floor(Math.random() * this.words.length);
        this.translation = this.words[idx].translation;
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
.wrapper_sprint {
  min-height: 100vh;
  background: url("../img/jungle.jpg") no-repeat center center fixed;
  background-size: cover;
}
.wrapper_sprint .container {
  background: url("../img/jungle.jpg") no-repeat center center fixed;
  background-size: cover;
}
.wrapper_sprint .main_card {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-color: #124507;
}
.wrapper_sprint .word_cards {
  color: #fff;
}
.wrapper_sprint .title_and_back .back {
  background-color: #124507;
}
.bird_picture {
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  color: darkolivegreen;
  font-size: 30px;
}
.guessed_words {
  font-size: 20px;
}
.word_content {
  font-weight: 600;
  text-align: center;
  font-size: 23px;
  padding-bottom: 10px;
  color: #fff;
}
.translation_content {
  font-size: 21px;
  margin-bottom: 25px;
  text-align: center;
  color: #fff;
}
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
  margin-top: 15px;
}
.btns .right_btn {
  height: 30px;
  width: 90px;
  outline: none;
  border-radius: 5px;
  border: none;
  background: #f8efca;
  font-size: 15px;
  box-shadow: 0px 5px 5px -5px rgb(34 60 80 / 60%);
}
.score {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: #cce881;
  font-size: 20px;
}
.main_timer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffd9;
  height: 40px;
  width: 40px;
  margin-left: 65px;
  margin-top: 5px;
  border-radius: 100%;

  border: 1px solid green;
  font-size: 22px;
}

.circle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  color: #fff;
}
.ready_timer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffd9;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 1px solid green;
  font-size: 22px;
}
.be_ready {
  font-size: 25px;
  color: #ffffd9;
}

.arrows {
  color: #fff;
  gap: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 10px;
}
</style>