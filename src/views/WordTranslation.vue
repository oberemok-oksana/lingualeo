<template>
  <div>
    <Card title="Слово-перевод">
      <div class="cards_content" v-show="!done">
        <div class="word_content">
          <div class="amount">{{ amount }}/10</div>
          <img
            :src="'https://picsum.photos/100?' + currentIndex"
            alt="picture"
          />
          <div class="words_meaning">{{ words[currentIndex].meaning }}</div>
        </div>

        <div class="different_translations">
          <div
            class="num_trans"
            v-for="(translation, index) in translations"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <button
              class="translation_content"
              :class="{
                right_word:
                  words[currentIndex].translation == translation &&
                  further == true,
                wrong_word:
                  words[currentIndex].translation !== translation &&
                  further == true &&
                  selected == translation,
              }"
              @click="rightAnswer(translation)"
            >
              {{ translation }}
            </button>
          </div>

          <button class="dont_know" @click="dontKnowAnswer" v-show="!further">
            Не знаю :(
          </button>
          <button v-show="further" class="dont_know" @click="furtherStep">
            Далее
          </button>
          <!-- <div v-for="idx in 5" :key="idx">{{ 48 + idx }}</div> -->
          <Keypress key-event="keyup" :key-code="13" @success="enter" />
          <Keypress
            key-event="keyup"
            :key-code="48 + idx"
            v-for="idx in 5"
            :key="idx"
            @success="rightAnswer(translations[idx - 1])"
          />
        </div>
      </div>
      <div class="cards_content done" v-show="done">
        Изучено {{ learnedWords }} слов <br />
        Получено опыта : {{ score }}
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card";
import { shuffle } from "../utils";
import Keypress from "vue-keypress";

export default {
  name: "WordTranslation",
  components: { Card, Keypress },
  data() {
    return {
      words: JSON.parse(localStorage.getItem("wordContents")) || [],
      currentIndex: 0,
      translations: [],
      score: 0,
      further: false,

      selected: "",
      learnedWords: 0,
      done: false,
      amount: 0,
    };
  },
  created() {
    this.generateTranslations();
  },
  methods: {
    rightAnswer(translation) {
      if (this.words[this.currentIndex].translation == translation) {
        this.score++;
        this.learnedWords++;
      } else {
        this.selected = translation;
      }
      this.further = true;
    },
    dontKnowAnswer() {
      this.further = true;
    },
    furtherStep() {
      if (this.amount < 10) {
        this.amount++;
        this.currentIndex = Math.floor(Math.random() * this.words.length);
        this.generateTranslations();
        this.further = false;
      } else {
        this.done = true;
      }
    },
    generateTranslations() {
      this.translations = [];
      this.translations.push(this.words[this.currentIndex].translation);
      for (let i = 0; i < 4; i++) {
        let translation;
        do {
          let idx = Math.floor(Math.random() * this.words.length);
          translation = this.words[idx].translation;
        } while (this.translations.includes(translation));

        this.translations.unshift(translation);
      }

      shuffle(this.translations);
    },
    enter() {
      if (this.further == false) {
        this.dontKnowAnswer();
      } else {
        this.furtherStep();
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
.cards_content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
}
.different_translations {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.word_content {
  color: black;
  font-weight: 700;
  font-size: 30px;
}
.words_meaning {
  align-items: center;
  display: flex;
  justify-content: center;
}
.translation_content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid gray;
  border-radius: 4px;
  color: black;
  height: 40px;
  width: 240px;
  padding-left: 13px;
  cursor: pointer;
}
.dont_know {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid gray;
  border-radius: 4px;
  color: black;
  height: 40px;
  width: 240px;
  padding-left: 13px;
  margin-bottom: 25px;
  background: #f8efed;
  margin-left: 18px;
}
.num_trans {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.right_word {
  background: rgba(14, 176, 38, 0.4);
  color: green;
}
.wrong_word {
  background-color: rgba(245, 15, 15, 0.4);

  color: #ff1f2d;
}
.amount {
  text-align: center;
}
</style>