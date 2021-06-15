<template>
  <div>
    <div class="title_and_back">
      <div class="word_cards">
        Словарные карточки
        <span class="info"><i class="fas fa-info-circle 2x"></i></span>
      </div>
      <button @click="redirect" class="back">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="all_learned" v-if="unlearnedWords.length == 0">
      Well done! <br />
      You've already learned all the words!
    </div>

    <div class="container" v-else>
      <div class="main_card">
        <div class="status"><i class="fas fa-paw"></i></div>

        <div class="learning_word">
          {{ unlearnedWords[currentIndex].meaning }}
        </div>

        <div class="learning_translation" v-show="known">
          {{ unlearnedWords[currentIndex].translation }}
        </div>
      </div>
      <div class="card_footer">
        <div v-show="!unknown">
          <i class="fas fa-long-arrow-alt-left"></i>
        </div>
        <button
          class="cards_btn dont_know_word"
          @click="dontKnowWord"
          v-show="!known"
        >
          Не знаю
        </button>
        <button
          class="cards_btn continue_unknown_word"
          @click="changeToNotLearned"
          v-show="unknown"
        >
          Продолжить
        </button>
        <button
          class="cards_btn know_word"
          @click="showTranslation"
          v-show="!known"
        >
          Я знаю!
        </button>

        <button
          class="cards_btn repeat_word"
          v-if="known && repeat"
          @click="changeToNotLearned"
        >
          На повторение
        </button>
        <button
          class="cards_btn continue"
          v-if="known && repeat"
          @click="changeStatusToCompleted"
        >
          Продолжить
        </button>
        <div><i class="fas fa-long-arrow-alt-right"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Workout",
  data() {
    return {
      words: JSON.parse(localStorage.getItem("wordContents")) || [],
      currentIndex: 0,
      known: false,
      repeat: false,
      unknown: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Home" });
    },

    showTranslation() {
      this.known = true;
      this.repeat = true;
    },
    dontKnowWord() {
      this.known = true;
      this.unknown = true;
      this.repeat = false;
    },
    changeStatusToCompleted() {
      if (this.unlearnedWords[this.currentIndex]) {
        this.unlearnedWords[this.currentIndex].status = "learned";
      }

      if (this.currentIndex > this.unlearnedWords.length - 1) {
        this.currentIndex = this.unlearnedWords.length - 1;
      }

      this.known = false;
      this.unknown = false;
    },
    changeToNotLearned() {
      if (this.unlearnedWords[this.currentIndex]) {
        this.currentIndex =
          (this.currentIndex + 1) % this.unlearnedWords.length;
      }
      this.known = false;
      this.unknown = false;
    },
  },
  computed: {
    unlearnedWords() {
      return this.words.filter((item) => item.status == "not learned");
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

<style>
.title_and_back {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
}
.title_and_back .back {
  background-color: #90827b;
  font-size: 22px;
  height: 28px;
  width: 28px;
}
.word_cards {
  font-size: 25px;
}
.word_cards .info {
  font-size: 15px;
  color: #bd97e9;
}
.main_card {
  width: 645px;
  min-height: 320px;
  border: 1px solid black;
  margin: 0 auto;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}
.main_card .status {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 15px;
  padding-right: 15px;
  font-size: 30px;
}
.main_card .learning_word {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  margin-top: 80px;
  color: #402e4f;
}
.card_footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  margin: 0 auto;
  border: 1px solid black;
  width: 645px;
  height: 65px;
}
.cards_btn {
  width: 122px;
  height: 36px;
  font-size: 15px;
  background-color: #a765a9;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 7px;
}
.dont_know_word {
  background: #a10033;
  box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}
.know_word {
  background: #08b172;
  box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}
.repeat_word {
  background: #ff9350;
  box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}
.continue {
  background: #60c9ff;
  box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}
.continue_unknown_word {
  background: #959dfa;
  box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
}
.learning_translation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  font-size: 20px;
}
.all_learned {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  text-align: center;
  line-height: 33px;
  margin-top: 45px;
  flex-direction: column;
  gap: 8px;
  color: #525ea8;
  font-weight: 700;
}
</style>