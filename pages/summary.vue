<template>
  <div>
    <div class="columns">
      <div class="column">
        <div
          v-for="(item, index) in summary"
          :key="`${item.person}-${index}`"
        >
          {{ item.person }} {{ item.answer }}
          <span
            v-if="item.correct"
            class="icon is-large is-right has-text-primary"
          >
            <i class="far fa-check-circle" />
          </span>
          <span
            v-if="item.correct === false"
            class="icon is-large is-right has-text-danger"
          >
            <i class="far fa-times-circle" />
          </span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="colum has-text-centered">
        <button
          class="button is-dark"
          @click="startAgain"
        >
          Start Again
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    summary() {
      return this.$store.state.run.summary;
    },
  },
  methods: {
    startAgain () {
      this.$store.commit('resetRun');
      this.$router.push({ path: '/' });
    },
  },
};
</script>