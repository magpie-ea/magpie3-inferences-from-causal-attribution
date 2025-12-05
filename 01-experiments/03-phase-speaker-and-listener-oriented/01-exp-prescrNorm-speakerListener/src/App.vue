<!--03 phase 01 exp-->
<template>
  <Experiment title="CausalAttribInference">
    <InstructionScreen :title="'Welcome'">

      <button @click="$magpie.nextScreen(9)">DEV: Skip to speaker trials</button>
      <button @click="$magpie.nextScreen(11)">DEV: Skip to listener trials</button>

      Hi! Thanks for taking part!<br/>
      This experiment first introduces a background scenario, which we ask you to read carefully.
      You will be asked to answer basic comprehension questions about the scenario.
      We then ask you about your interpretation of some utterances of some characters in the story.
    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      <p>
        In this experiment, you will play the role of an anthropologist visiting a faraway island.
        A long time ago, the inhabitants of the island discovered an ancient artifact: <b>the marble
        machine</b>.
        Nobody knows where the marble machine came from, but everybody knows how it works.<br/>
        The compartment on the left of the marble machine contains blue and yellow marbles, and the compartment on the
        right contains red and green marbles (see picture below).
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.
        On each side, the marble is chosen completely at random.
      </p>

      <p>
        <img src="images/marble-machine.png"/>
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

      <img :src="outcomes_picture" v-bind:style="{ width: '75%' }">
    </InstructionScreen>

    <template v-for="(trial, i) in comprehension_trials">
      <Screen>
        <Slide>
          Remember the rule that determines the sound that the machine makes:
          <div style="color: gray">
            When the machine releases <strong>{{
              mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble"
            }}</strong>, the machine makes sound A.
            Otherwise, the machine makes sound B.
          </div>

          To make sure you understand, please select the sound that the machine makes when the following marbles are
          released:

          <p>
            <img :src="trial.picture" v-bind:style="{ width: '20%' }"/>
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
              actual_cause : actual_cause,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
          />
        </Slide>
      </Screen>
    </template>

    <InstructionScreen :title="'Further Instructions'">
      <p>
        There are two religions on the island.
        In religion 1, the color Red is thought to be impure—for example, believers in Religion 1 avoid wearing red
        clothes.
        So when they use the marble machine, they think `Red marbles should not be released’.
      </p>
      <p>
        In religion 2, the color Blue is thought to be sinful—for example, believers in Religion 2 avoid using blue
        paint in their artwork.
        So when they use the marble machine, they think `Blue marbles should not be released’.
      </p>

      <img src="images/color-preferences.png"/>

      <p>
        Of course, the users of the marble machine cannot control which marbles will come out.
        So, red and blue marbles are equally likely to be released, no matter who presses the Start button.
        Everyone on the island knows how the marble machine works. Even people of different religions completely agree
        with each other about how the machine works.
      </p>
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
            :response.sync="$magpie.measurements.response"
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
            :response.sync="$magpie.measurements.response"
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

    <template v-for="(trial, i) in speaker_trials">
      <Screen>
        <Slide>
          <p class="instructions">
            <span v-if="i==0">
              You see two islanders, a follower of religion 1 who regards red as impure, and a follower of religion 2 who regards blue as impure, come up to the machine.
              The button to activate the machine is pressed, so one marble is randomly released from each compartment at the same time.<br/>
              The marble released from the left compartment is {{ trial.left_marble }}, and the marble released from the right compartment is
              {{ trial.right_marble }}.
            </span>
            <span v-else>The button to activate the machine is pressed again.
              This time, the marble released from the left compartment is {{ trial.left_marble }}, and the marble released from the right compartment is
                {{ trial.right_marble }}.
            </span>
            Because
            {{
              (trial.left_marble == 'blue' & trial.right_marble == 'red' ? (mechanism == 'conjunctive' ? 'both a blue marble and a red marble have' : 'at least a blue marble or a red marble has') :
                  (trial.left_marble == 'blue' | trial.right_marble == 'red' ? (mechanism == 'conjunctive' ? 'both a blue and a red marble have not' : 'at least a blue marble or a red marble has') :
                          (mechanism == 'conjunctive' ? 'both a blue and a red marble have not' : 'at least a blue marble or a red marble has not')
                  ))
            }} been released, the machine emits {{ trial.outcome_sound }},

            {{
              trial.outcome_sound == 'sound A' ? (effect_valence == 'neutral' ? 'a simple tone' : effect_valence == 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise') : ('a simple tone')
            }}.
          </p>

          <img
              :src="'images/final-outcome-' + mechanism + '-' + effect_valence + '-' + trial.left_marble + '-' + trial.right_marble + '.png'"/>

          <p class="instructions">
            Given the situation, decide how likely is the follower of <b>religion 1</b>, who regards red as impure, to
            say
            the following following:
          </p>
          <br/>
          <b>`The machine made sound A because a {{ trial.left_marble }} marble was released’.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.responseRelig1Red"
          />

          <b>`The machine made sound A because a {{ trial.right_marble }} marble was released’.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.responseRelig1Blue"
          />
          <br>
          <p class="instructions">
            Given the situation, decide how likely is the follower of <b>religion 2</b>, who regards blue as impure, to
            say the following following:
          </p>
          <br/>

          <b>`The machine made sound A because a {{ trial.left_marble }} marble was released’.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.responseRelig2Red"
          />

          <b>`The machine made sound A because a {{ trial.right_marble }} marble was released’.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.responseRelig2Blue"
          />

          <p v-if="$magpie.measurements.responseRelig1Red > 0 && $magpie.measurements.responseRelig1Blue > 0 && $magpie.measurements.responseRelig2Red > 0 && $magpie.measurements.responseRelig2Blue > 0">
            <button @click="$magpie.saveAndNextScreen()">Submit</button>
          </p>

          <Record
              :data="{
              trialType : 'critical-speaker',
              trialNr : 1,
              responseRelig1Blue: $magpie.measurements.responseRelig1Blue,
              responseRelig1Red: $magpie.measurements.responseRelig1Red,
              responseRelig2Blue: $magpie.measurements.responseRelig2Blue,
              responseRelig2Red: $magpie.measurements.responseRelig2Red
            //TODO: what more to log?
            }"
          />
        </Slide>
      </Screen>
    </template>

    <template v-for="(trial, i) in listener_trials">
      <Screen>
        <Slide>
          <p>

            <span v-if="i==0">
              After the two islanders leave, an islander whose <b>religion is unknown</b> to you approaches the machine and presses the button to activate it.
              So, one marble is randomly released from each compartment at the same time.<br/>
              The marble released from the left compartment is {{ trial.left_marble }}, and the marble released from the right compartment is
              {{ trial.right_marble }}.
            </span>
            <span v-else>The button to activate the machine is pressed again.
              This time, the marble released from the left compartment is {{ trial.left_marble }}, and the marble released from the right compartment is
                {{ trial.right_marble }}.
            </span>
            Because
            {{
              (trial.left_marble == 'blue' & trial.right_marble == 'red' ? (mechanism == 'conjunctive' ? 'both a blue marble and a red marble have' : 'at least a blue marble or a red marble has') :
                  (trial.left_marble == 'blue' | trial.right_marble == 'red' ? (mechanism == 'conjunctive' ? 'both a blue and a red marble have not' : 'at least a blue marble or a red marble has') :
                          (mechanism == 'conjunctive' ? 'both a blue and a red marble have not' : 'at least a blue marble or a red marble has not')
                  ))
            }} been released, the machine emits {{ trial.outcome_sound }},

            {{
              trial.outcome_sound == 'sound A' ? (effect_valence == 'neutral' ? 'a simple tone' : effect_valence == 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise') : ('a simple tone')
            }}.
          </p>

          <img
              :src="'images/final-outcome-' + mechanism + '-' + effect_valence + '-' + trial.left_marble + '-' + trial.right_marble + '.png'"/>


          <p>
            The islander says: `<strong>The machine emitted sound A because a
            {{ actual_cause == 'left' ? trial.left_marble : trial.right_marble }}
            marble was released</strong>’.
          </p>
          <p>
            Given what he said, which religion does the islander belong to?
            In other words, do you think it is more likely that the islander thinks that red marbles or blue marbles
            shouldn’t be released?
            <br>

          </p>

          <RatingInput
              left="red marbles should not be released"
              right="blue marbles should not be released"
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
              actual_cause : actual_cause,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
          />
        </Slide>
      </Screen>
    </template>

    <PostTestScreen/>

    <SubmitResultsScreen/>

  </Experiment>
</template>
<script>

import _ from 'lodash';
import comprehension_trials_all from '../trials/comprehension.csv';
import outcomes_speaker_all from '../trials/outcomes_speaker.csv';
import outcomes_listener_all from '../trials/outcomes_listener.csv';

console.log(comprehension_trials_all);

// mechanism of the machine is conjunctive or disjunctive process

const mechanism = _.sample(["conjunctive", "disjunctive"]);

const effect_valence = _.sample(["pleasant", "neutral", "unpleasant"]);

const actual_cause = _.sample(["left", "right"]);

const outcomes_picture = 'images/outcomes-' + mechanism + '-' + effect_valence + '.png'

const outcomes_speaker = _.filter(outcomes_speaker_all, function (i) {
  return i.mechanism == mechanism & i.effect_valence == effect_valence;
})
const speaker_trials = _.shuffle([outcomes_speaker[0], _.sample(outcomes_speaker.slice(1))]);

const outcomes_listener = _.filter(outcomes_listener_all, function (i) {
  return i.mechanism == mechanism & i.effect_valence == effect_valence;
})

const blue_red_trial = _.filter(outcomes_listener.slice(0, 2), function (i) {
  return i.actual_outcome == actual_cause;
})[0]
console.log(blue_red_trial);

const other_trial_outcome = _.sample(["left", "right"]);

const other_trial = _.sample(_.filter(outcomes_listener.slice(2), function (i) {
  return i.actual_outcome == other_trial_outcome;
}))

const listener_trials = _.shuffle([blue_red_trial, other_trial]);

const comprehension_trials = _.filter(comprehension_trials_all, function (i) {
  return i.mechanism == mechanism
})

export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      actual_cause: actual_cause,
      outcomes_picture: outcomes_picture,
      speaker_trials: speaker_trials,
      listener_trials: listener_trials,
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

<style>
.blue {
  color: #0433FF;
  font-weight: bold;
}

.red {
  color: #B22222;
  font-weight: bold;
}

.yellow {
  color: #EEB14F;
  font-weight: bold;
}

.green {
  color: #3C902B;
  font-weight: bold;
}

.instructions {
  width: 600px;
  margin: 0 auto;
  text-align: justify;
}
</style>
