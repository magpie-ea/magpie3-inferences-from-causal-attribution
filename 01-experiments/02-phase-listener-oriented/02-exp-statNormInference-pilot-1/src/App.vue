<template>

  <Experiment title="causal-implicature-variation">

    <InstructionScreen :title="'Welcome'">
      Hi! Thanks for taking part!
      <br>
      This experiment first introduces a background scenario, which we ask you to read carefully.
      You will be asked to answer basic comprehension questions about the scenario.
      We then ask you about your interpretation of some utterances of some characters in the story.

    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      <p>

        In this experiment, you will play the role of an anthropologist visiting a faraway island.
        A long time ago, the inhabitants of the island discovered an ancient artifact: <strong>the marble machine</strong>.
        Nobody knows where the marble machine came from, but everybody knows how it works.

        <br>

        The compartment on the left of the marble machine contains blue and yellow marbles, and the compartment on the right contains red and green marbles.
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.

        <br>

        The islanders have been observing the machine for many years and discovered that differently colored marbles are released with certain probabilities.
        However, they are refusing to tell you exactly what the probabilities are.
        All you know is that <strong>either blue marbles are released 90% of the time and red marbles 10%, or vice versa</strong> (see picture below).

        <br>

        Of course, the users of the marble machine cannot control which marbles will come out, and the machine operates the same no matter who presses the Start button.

      </p>

      <p>
        <img src="images/black-box-marble-machine.png"/>
      </p>


      When the two marbles reach the center, the machine makes a sound.
      The islanders have discovered a simple rule that always determines the sound that the machine makes:
      <ul>
        <li>When the machine releases <strong>{{
            mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble"
          }}</strong>, the machine makes sound A.
        </li>
        <li>Otherwise, the machine makes sound B.</li>
      </ul>
      <strong>Sound B is a simple tone,
        {{
          effect_valence == 'neutral' ? 'and Sound A is also a simple tone' : effect_valence == 'pleasant' ? 'while Sound A is a very pleasant melody' : 'while Sound  A is a distressing screeching noise'
        }}</strong>.

      <p>
        Here is a picture of the possible outcomes:
      </p>

      <p><img :src="outcomes_picture" v-bind:style="{ width: '75%' }">
      </p>

    </InstructionScreen>

    <template v-for="(trial, i) in comprehension_trials">
      <Screen>
        <Slide>

          Remember the rule that determines the sound that the machine makes:
          <div style="color: gray">
            When the machine releases <strong>{{mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble" }}</strong>, the machine makes sound A.
            Otherwise, the machine makes sound B.
          </div>

          To make sure you understand, please select the sound that the machine makes when the following marbles are released:
          <p>
            <img :src="trial.picture"/>
          </p>

          <ForcedChoiceInput
              :response.sync="$magpie.measurements.response"
              :options="['Sound A', 'Sound B']"
              @update:response="$magpie.saveAndNextScreen();"/>

          <Record
              :data="{
              trialType : 'comprehension',
              trialNr : i+1,
              correctResponse: trial.correctResponse,
              response : $magpie.measurements.response,
              actual_outcome : actual_outcome,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
          />

        </Slide>
      </Screen>
    </template>

    <Screen :title="'Comprehension Test'">
      <Slide>
        Please answer the following comprehension question:
        <p>
          <strong>
            What are the probabilities of blue and red marbles being released by the machine?
          </strong>
        </p>

        <ForcedChoiceInput
            :response.sync="$magpie.measurements.response"
            :options="['90% for blue marbles and 10% for red marbles', '10% for blue marbles and 90% for red marbles', 'only the islanders know']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
            :data="{
              trialType : 'comprehension-2',
              trialNr : 1,
              correctResponse: 'only the islanders know',
              response : $magpie.measurements.response,
              actual_outcome : actual_outcome,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
        />

      </Slide>
    </Screen>

    <Screen :title="'Comprehension Test'">
      <Slide>
        Please answer the following comprehension question:
        <p>
          <strong>
            When you activate the machine, you can control which colors get released.
          </strong>
        </p>

        <p/>

        <ForcedChoiceInput
            :response.sync="$magpie.measurements.response"
            :options="['TRUE', 'FALSE']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
            :data="{
              trialType : 'comprehension-2',
              trialNr : 2,
              correctResponse: 'FALSE',
              response : $magpie.measurements.response,
              actual_outcome : actual_outcome,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
        />

      </Slide>
    </Screen>

    <Screen>

      <Slide>
        <p>
          You see an islander press the Start button to activate the machine.
          So, one marble is randomly released from each compartment at the same time.
          The marble released from the left compartment is blue, and the marble released from the right compartment is red.
          Because
          {{mechanism == 'conjunctive' ? 'both a blue and a red marble have been released' : 'at least a red marble or a blue marble has been released' }},
          the machine emits sound A,
          {{effect_valence == 'neutral' ? 'a simple tone' : effect_valence == 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise' }}.
        </p>

        <p><img :src="final_outcome_picture"/>
        </p>

        <p>
          The islander says: `<strong>The machine emitted sound A because a {{ actual_outcome == 'red' ? 'red' : 'blue' }} marble was released</strong>’.
        </p>
        <p>
          Given what he said, what does the islander know about the probabilities of blue and red marbles being released?
          In other words, do you think it is more likely that the islander knows that red marbles or blue marbles are more likely to be released?
          <br>

        </p>

        <RatingInput
            left="red marbles are more likely"
            right="blue marbles are more likely"
            :response.sync="$magpie.measurements.response"
        />

        <span style="color: gray">choices of 1 and 7 express relative confidence for one of the options</span>
        <br>
        <span style="color: gray">choice of 4 expresses total uncertainty</span>

        <p v-if="$magpie.measurements.response > 0">
          <button @click="$magpie.saveAndNextScreen();">Submit</button>
        </p>

        <Record
            :data="{
              trialType : 'critical',
              trialNr : 1,
              actual_outcome : actual_outcome,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
        />

      </Slide>

    </Screen>

    <PostTestScreen/>

    <SubmitResultsScreen/>

  </Experiment>
</template>
<script>

import _ from 'lodash';

import comprehension_trials_all from '../trials/comprehension.csv';

// mechanism of the machine is conjunctive or disjunctive process

const mechanism = _.shuffle(["conjunctive", "disjunctive"])[0];

const effect_valence = _.shuffle(["pleasant", "neutral", "unpleasant"])[0];

const actual_outcome = _.shuffle(["red", "blue"])[0];

const outcomes_picture = 'images/outcomes-' + mechanism + '-' + effect_valence + '.png'

const final_outcome_picture = 'images/final-outcome-' + mechanism + '-' + effect_valence + '.png'

const comprehension_trials = _.filter(comprehension_trials_all, function (i) {
  return i.mechanism == mechanism
})

export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      actual_outcome: actual_outcome,
      outcomes_picture: outcomes_picture,
      final_outcome_picture: final_outcome_picture,
      comprehension_trials: comprehension_trials
    };
  },
  computed: {
    // Expose lodash to template code
    _() {
      return _;
    }
  }
};
</script>
