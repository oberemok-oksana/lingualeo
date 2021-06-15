<template>
  <div>
    <Card title="Коснтруктор слов">
      <div class="cards_wrapper" v-show="!done">
        <div class="translation_wrapper">
          <div class="translation_content">
            {{ words[currentIndex].translation }}
          </div>
          <div class="amount_content">{{ amount }}/10</div>
          <div>{{ score }}</div>
        </div>
        <div class="words_wrapper">
          <div class="empty_box">
            <ul class="letters_wrapper">
              <li v-for="(letter, i) in attemtedWord" :key="i" class="list">
                <div class="box_with_letter empty">
                  <span v-show="guessedLetters > i">{{ letter }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="box_with_letters">
            <ul class="letters_wrapper">
              <li v-for="(letter, i) in letters" :key="i" class="list">
                <button
                  class="box_with_letter"
                  :class="{ wrong: selected == letter }"
                  @click="showLetter(letter)"
                >
                  {{ letter }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="cards_wrapper done" v-show="done">
        Получено опыта : {{ score }}
        <hr />
        Слова на изученние:

        <ul>
          <li v-for="(word, key) in wordsWithMistakes" :key="key">
            {{ word }}
          </li>
        </ul>
        <hr />
      </div>

      <template #bottom-actions>
        <div class="buttons">
          <button class="btn" @click="dontKnowBtn" v-show="!nextBtn">
            Не знаю
          </button>
          <button class="btn next" @click="nextWord" v-show="nextBtn">
            Далее
          </button>
        </div>
      </template>
    </Card>
    <Keypress
      key-event="keyup"
      :multiple-keys="multiple"
      @success="showLetterByKey"
    />
    <Keypress key-event="keyup" :key-code="13" @success="enter" />
  </div>
</template>

<script>
import Card from "../components/Card";
import { shuffle } from "../utils";
import Keypress from "vue-keypress";

export default {
  name: "WordsConstructor",
  components: { Card, Keypress },
  data() {
    return {
      words: JSON.parse(localStorage.getItem("wordContents")) || [],
      currentIndex: 0,
      amount: 0,
      score: 0,
      letters: [],
      guessedLetters: 0,
      selected: "",
      nextBtn: false,
      mistakes: 0,
      multiple: [],
      done: false,
      wordsWithMistakes: new Set(),
    };
  },
  created() {
    this.splitLetter();
    for (let i = 65; i <= 90; i++) {
      this.multiple.push({ keyCode: i, modifiers: [] });
    }
  },
  computed: {
    attemtedWord() {
      return this.words[this.currentIndex].meaning;
    },
  },
  methods: {
    splitLetter() {
      this.letters = this.attemtedWord.split("");
      shuffle(this.letters);
    },
    showLetterByKey(e) {
      let letter = e.event.key;
      this.showLetter(letter);
    },
    showLetter(letter) {
      if (letter == this.attemtedWord[this.guessedLetters]) {
        const i = this.letters.indexOf(letter);
        console.log(i, this.letters[i]);
        this.letters.splice(i, 1);
        this.guessedLetters++;

        this.selected = "";
        if (this.guessedLetters == this.attemtedWord.length) {
          if (this.mistakes < 2) {
            this.score++;
          } else {
            this.wordsWithMistakes.add(this.attemtedWord);
          }

          this.nextBtn = true;
        }
      } else {
        this.selected = letter;
        this.mistakes++;
      }
    },
    enter() {
      if (!this.nextBtn) {
        this.dontKnowBtn();
      } else {
        this.nextWord();
      }
    },
    dontKnowBtn() {
      this.guessedLetters = this.attemtedWord.length;
      this.letters = [];
      this.nextBtn = true;
      this.wordsWithMistakes.add(this.attemtedWord);
    },
    nextWord() {
      if (this.amount < 10) {
        this.mistakes = 0;
        this.amount++;
        this.currentIndex = Math.floor(Math.random() * this.words.length);
        this.nextBtn = false;
        this.guessedLetters = 0;
        this.splitLetter();
      } else {
        if (this.done) {
          this.mistakes = 0;
          this.amount = 0;
          this.letters = [];
          this.guessedLetters = 0;
          this.selected = "";
          this.done = false;
        } else {
          this.done = true;
        }
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
.translation_wrapper {
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.translation_content {
  font-weight: 600;
  font-size: 25px;
  padding-bottom: 10px;
}
.box_with_letter {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 1px solid grey;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  background: #f0dcf6;
}
.empty {
  background: white;
}
.wrong {
  background: red;
}
.list {
  list-style-type: none;
  display: flex;
}
.letters_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}
.unshow {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 645px;
  padding: 20px 20px;
  margin: 0 auto;
}
.buttons {
  width: 645px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 30px;
  margin: 0 auto;
  border: 1px solid black;
  border-top: none;
}
.btn {
  border: none;
  height: 30px;
  width: 120px;
  border-radius: 3px;
  box-shadow: 0px 5px 10px 2px rgba(255, 244, 201, 0.2) inset;
}
.next {
  background: #fffb7c;
}
.done {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 30px;
}
hr {
  border: 1px solid black;
  min-width: 260px;
  margin-top: 6px;
}
</style>