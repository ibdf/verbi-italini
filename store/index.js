import Vue from 'vue';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getLocal(item) {
  return JSON.parse(localStorage.getItem(item));
}

function saveLocal (items) {
  for (let key in items) {
    localStorage.setItem(key, JSON.stringify(items[key]));
  }
}

export const state = () => ({
  selectedVerb: '',
  selectedTense: '',
  persons: [
    'io',
    'tu',
    'lui',
    'noi',
    'voi',
    'loro',
  ],
  run: {
    persons: null,
    verb: null,
    person: null,
    summary: [],
  },
});

export const mutations = {
  start (state, payload) {
    state.selectedVerb = payload.selectedVerb;
    state.selectedTense = payload.selectedTense;
  },
  runPerson (state, person) {
    Vue.set(state.run, 'person', person);
  },
  runPersons (state, persons) {
    Vue.set(state.run, 'persons', persons);
  },
  runVerb (state, verb) {
    Vue.set(state.run, 'verb', verb);
  },
  updatedRunSummary (state, update) {
    state.run.summary.push({
      person: state.run.person,
      answer: update.answer,
      correct: update.correct,
    });
  },
  resetRun (state) {
    state.run = {
      persons: null,
      verb: null,
      person: null,
      summary: [],
    };
  },
};

export const actions = {
  async startConjugation ({ state, commit }) {
    let verb, tense, persons;

    if (getLocal('run')) {
      console.log('ls');
      verb = getLocal('verb');
      tense = getLocal('tense');
      persons = getLocal('persons');
    } else {
      verb = state.selectedVerb;
      tense = state.selectedTense;
      persons = [ ...state.persons ];
    }

    if (persons.length === 0) {
      return false;
    }

    let verbBase = verb.infinito.substring(0, verb.infinito.length - 3);

    let person = persons[getRandomInt(persons.length)];

    let pattern = await this.$content('patterns').where({
      type: verb.type,
      tense: tense.name,
    }).fetch();

    persons.splice(persons.indexOf(person), 1);

    commit('start', { selectedVerb: verb, selectedTense: tense });
    commit('runVerb', `${verbBase}${pattern[0][person]}`);
    commit('runPerson', person);
    commit('runPersons', persons);

    saveLocal({
      run: true,
      verb,
      tense,
      persons,
    });

    return true;

  },

};