<template>
  <div>
    <Card title="Перевод-слово">
      <div class="cards_content" v-show="!done">
        <div class="word_content">
          <div class="amount">{{ amount }}/10</div>
          <img :src="'https://picsum.photos/100?' + currentIndex" alt="" />
          <div class="words_meaning">{{ words[currentIndex].translation }}</div>
        </div>

        <div class="different_translations">
          <div
            class="num_trans"
            v-for="(meaning, index) in meanings"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <button
              class="translation_content"
              :class="{
                right_word:
                  words[currentIndex].meaning == meaning && further == true,
                wrong_word:
                  words[currentIndex].meaning !== meaning &&
                  further == true &&
                  selected == meaning,
              }"
              @click="rightAnswer(meaning)"
            >
              {{ meaning }}
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
            @success="rightAnswer(meanings[idx - 1])"
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
  name: "TranslationWord",
  components: { Card, Keypress },
  data() {
    return {
      words: JSON.parse(localStorage.getItem("wordContents")) || [],
      currentIndex: 0,
      meanings: [],
      score: 0,
      further: false,

      selected: "",
      learnedWords: 0,
      done: false,
      amount: 0,
    };
  },
  created() {
    this.generateMeanings();
  },
  methods: {
    rightAnswer(meaning) {
      if (this.words[this.currentIndex].meaning == meaning) {
        this.score++;
        this.learnedWords++;
      } else {
        this.selected = meaning;
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
        this.generateMeanings();
        this.further = false;
      } else {
        this.done = true;
      }
    },
    generateMeanings() {
      this.meanings = [];
      this.meanings.push(this.words[this.currentIndex].meaning);
      for (let i = 0; i < 4; i++) {
        let meaning;
        do {
          let idx = Math.floor(Math.random() * this.words.length);
          meaning = this.words[idx].meaning;
        } while (this.meanings.includes(meaning));

        this.meanings.unshift(meaning);
      }

      shuffle(this.meanings);
    },
    enter() {
      if (this.further) {
        this.furtherStep();
      } else {
        this.dontKnowAnswer();
      }
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