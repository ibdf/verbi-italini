<template>
  <div class="container is-fluid">
    <div class="columns is-multiline is-centered">
      <div class="column">
        <select
          v-model="selectedVerb"
          class="select"
        >
          <option value="">
            Select a verb
          </option>
          <option
            v-for="verb in verbs"
            :key="verb.infinito"
            :value="verb"
          >
            {{ verb.infinito }}
          </option>
        </select>
      </div>
    </div>
    <div class="columns is-multiline is-centered">
      <div class="column">
        <select
          v-model="selectedTense"
          class="select"
        >
          <option value="">
            Select a tense
          </option>
          <option
            v-for="(tense, tenseKey) in tenses"
            :key="tenseKey"
            :value="tense"
          >
            {{ tense.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="columns is-multiline is-centered">
      <div class="column has-text-centered">
        <button
          class="button is-primary"
          @click="start"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {

    let promises = [];

    promises.push($content('settings/verbs').fetch());
    promises.push($content("settings/tenses").fetch());
    promises.push($content("patterns").fetch());

    let values = await Promise.all(promises);

    return {
      verbs: values[0].verbs,
      tenses: values[1].tenses,
      patterns: values[2] ,
    };

  },
  data () {
    return {
      selectedVerb: '',
      selectedTense: '',
    };
  },
  mounted () {
    localStorage.clear();
  },
  methods: {
    start () {
      localStorage.clear();
      if (this.selectedVerb && this.selectedTense){
        this.$store.commit('start', {
          selectedVerb: this.selectedVerb,
          selectedTense: this.selectedTense,
        });
        this.$router.push({ path: '/conjugation' });
      } else {
        console.log('select something');
      }
    },
  },
};
</script>

<style lang="scss">
  select {
    width: 100%;
  }
</style>