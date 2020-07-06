<template>
  <div
    v-if="run.person"
    class="columns is-centered has-text-centered"
  >
    <div class="column">
      {{ run.person }} - {{ verb.infinito }} - {{ tense.name }}
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            v-model="answer"
            placeholder="answer"
            type="text"
            class="input is-large answer"
            :disabled="inputDisabled"
          >
          <span
            v-if="correct"
            class="icon is-large is-right has-text-primary"
          >
            <i class="far fa-check-circle" />
          </span>
          <span
            v-if="correct === false"
            class="icon is-large is-right has-text-danger"
          >
            <i class="far fa-times-circle" />
          </span>
        </div>
      </div>
      <div class="field">
        <div class="buttons is-centered">
          <button
            v-if="showCheck"
            class="button is-primary"
            @click="check"
          >
            Check
          </button>
          <button
            v-if="showTryAgain"
            class="button is-primary"
            @click="reset"
          >
            Try Again
          </button>
          <button
            v-if="showNext"
            class="button is-info"
            @click="next"
          >
            Next
          </button>
          <button
            v-if="showSkip"
            class="button is-warning"
            @click="next"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showTryAgain: false,
      correct: null,
      showCheck: true,
      showNext: false,
      showSkip: false,
      inputDisabled: false,
      answer: '',
    };
  },
  computed: {
    verb () {
      return this.$store.state.selectedVerb;
    },
    tense () {
      return this.$store.state.selectedTense;
    },
    run () {
      return this.$store.state.run;
    },
  },
  mounted () {
    this.$store.dispatch('startConjugation');
  },
  methods: {
    check () {
      if (this.answer === this.run.verb) {
        this.correct = true;
        this.showNext = true;
      } else{
        this.correct = false;
        this.showTryAgain = true;
        this.showSkip = true;
      }
      this.inputDisabled = true;
      this.showCheck = false;
      this.$store.commit('updatedRunSummary', {
        answer: this.answer,
        correct: this.correct,
      });
    },
    async next () {
      this.reset();
      this.answer = '';
      let next = await this.$store.dispatch('startConjugation');
      if (!next) {
        this.$router.push({ path: '/summary' });
      }
    },
    reset () {
      this.correct = null;
      this.inputDisabled = false;
      this.showCheck = true;
      this.showNext = false;
      this.showSkip = false;
      this.showTryAgain = false;
    },
  },
};
</script>
<style lang="scss">
  input.answer {
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
</style>