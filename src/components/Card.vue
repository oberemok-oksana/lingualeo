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

        <div class="main_card">
          <slot></slot>
        </div>
        <div class="bottom_card_content">
          <slot name="bottom-actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "top", "bottom"],
  methods: {
    redirect() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

