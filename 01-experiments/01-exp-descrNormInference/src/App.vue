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

        The compartment on the the left of the marble machine contains blue and yellow marbles, and the compartment on the right contains red and green marbles (see picture below).
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.
        On each side, the marble is chosen completely at random.
      </p>

      <p>
        <img src="images/marble-machine.png" />
      </p>


      When the two marbles reach the center, the machine makes a sound.
      The islanders have discovered a simple rule that always determines the sound that the machine makes:
      <ul>
        <li>When the machine releases <strong>{{  mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble" }}</strong>, the machine makes sound A.</li>
        <li>Otherwise, the machine makes sound B.</li>
      </ul>
      <strong>Sound B is a simple tone, {{effect_valence == 'neutral' ? 'and Sound A is also a simple tone' : effect_valence == 'pleasant' ? 'while Sound A is a very pleasant melody' : 'while Sound  A is a distressing screeching noise'}}</strong>.

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
        When the machine releases <strong>{{  mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble" }}</strong>, the machine makes sound A.
        Otherwise, the machine makes sound B.
      </div>

      To make sure you understand, please select the sound that the machine makes when the following marbles are released:
      <p>
        <img :src="trial.picture" />
      </p>

        <ForcedChoiceInput
            :response.sync= "$magpie.measurements.response"
            :options="['Sound A', 'Sound B']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
           :data="{
              trialType : 'comprehension',
              trialNr : i+1,
              correctResponse: trial.correctResponse,
              response : $magpie.measurements.response,
              actual_cause : actual_cause,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
          />

      </Slide>
    </Screen>
    </template>

    <InstructionScreen :title="'Further Instructions'">
      There are two religions on the island.
      In religion 1, the color Red is thought to be impure---for example, believers in Religion 1 avoid wearing red clothes.
      So when they use the marble machine, they think `Red marbles should not be released’.
      <br><br>
      In religion 2, the color Blue is thought to be sinful---for example, believers in Religion 2 avoid using blue paint in their artwork.
      So when they use the marble machine, they think `Blue marbles should not be released’.
      <br><br>

      <p>
        <img src="images/color-preferences.png" />
      </p>

      Of course, the users of the marble machine cannot control which marbles will come out.
      So, red and blue marbles are equally likely to be released, no matter who presses the Start button.
      Everyone on the island knows how the marble machine works. Even people of different religions completely agree with each other about how the machine works.

    </InstructionScreen>

    <Screen :title="'Comprehension Test'">
      <Slide>
      Please answer the following comprehension question:
      <p>
        <strong>
          On the island, who knows how the machine works?
        </strong>
      </p>

      <p/>

        <ForcedChoiceInput
            :response.sync= "$magpie.measurements.response"
            :options="['Everyone', 'Followers of Religion 1', 'Followers of Religion 2']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
           :data="{
              trialType : 'comprehension-2',
              trialNr : 1,
              correctResponse: 'Everyone',
              response : $magpie.measurements.response,
              actual_cause : actual_cause,
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
            :response.sync= "$magpie.measurements.response"
            :options="['TRUE', 'FALSE']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
           :data="{
              trialType : 'comprehension-2',
              trialNr : 2,
              correctResponse: 'FALSE',
              response : $magpie.measurements.response,
              actual_cause : actual_cause,
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
          The marble released from the left compartment is red, and the marble released from the right compartment is blue.
          Because {{mechanism == 'conjunctive' ? 'both a blue and a red marble have been released' : 'at least a red marble or a blue marble has been released'}}, the machine emits sound A, {{effect_valence == 'neutral' ? 'a simple tone' : effect_valence == 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise'}}.
        </p>

          <p><img :src="final_outcome_picture" />
          </p>

          <p>
            The islander says: `<strong>The machine emitted sound A because a {{actual_cause == 'red' ? 'red' : 'blue'}} marble was released</strong>’.
          </p>
          <p>
            Given what he said, which religion does the islander belong to? In other words, do you think it is more likely that the islander thinks that red marbles or blue marbles shouldn’t be released?
            <br>

          </p>

        <RatingInput
          left="red marbles should not be released"
          right="blue marbles should not be released"
          :response.sync= "$magpie.measurements.response"
          />

        <span style="color: gray">choices of 1 and 7 express relative confidence for one of the options</span>
        <br>
        <span style="color: gray">choice of 4 expresses total uncertainty</span>

        <p v-if= "$magpie.measurements.response > 0">
          <button @click="$magpie.saveAndNextScreen();">Submit</button>
        </p>

        <Record
           :data="{
              trialType : 'critical',
              trialNr : 1,
              actual_cause : actual_cause,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
          />

        </Slide>

    </Screen>

    <PostTestScreen />

    <SubmitResultsScreen />

  </Experiment>
</template>
<script>

import _ from 'lodash';

import comprehension_trials_all from '../trials/comprehension.csv';

// mechanism of the machine is conjunctive or disjunctive process

const mechanism = _.shuffle(["conjunctive", "disjunctive"])[0];

const effect_valence = _.shuffle(["pleasant", "neutral", "unpleasant"])[0];

const actual_cause = _.shuffle(["red", "blue"])[0];

const outcomes_picture = 'images/outcomes-' + mechanism + '-' + effect_valence +'.png'

const final_outcome_picture = 'images/final-outcome-' + mechanism + '-' + effect_valence +'.png'

const comprehension_trials = _.filter(comprehension_trials_all, function(i) {return i.mechanism == mechanism})

export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      actual_cause: actual_cause,
      outcomes_picture: outcomes_picture,
      final_outcome_picture: final_outcome_picture,
      comprehension_trials : comprehension_trials
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
