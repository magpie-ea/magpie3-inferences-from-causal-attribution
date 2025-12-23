<!--03 phase 01 exp-->
<template>
  <Experiment title="CausalAttribInference">
    <InstructionScreen :title="'Welcome'">

      <!--      <button @click="$magpie.nextScreen(10)">DEV: Skip to speaker trials</button>-->
      <!--      <button @click="$magpie.nextScreen(12)">DEV: Skip to listener trials</button>-->

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
        The compartment on the left of the marble machine contains <span class="blue">blue</span> and <span
          class="yellow">yellow</span> marbles, and the compartment on the
        right contains <span class="red">red</span> and <span class="green">green</span> marbles (see picture below).
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.
        <br>
        <strong>Blue marbles are released with a probability of {{ stat_norm === "blue" ? "90" : "10" }}%</strong> from
        the
        left compartment, meaning that the released marble will tend to be {{
          stat_norm === "blue" ? "blue" : "yellow"
        }}
        9
        out of 10 times and {{ stat_norm === "blue" ? "yellow" : "blue" }} 1 out of 10 times.
        <br>
        <strong>Red marbles are released with a probability of {{ stat_norm === "blue" ? "10" : "90" }}%</strong> from
        the
        right compartment, meaning that the released marble will tend to be {{ stat_norm === "blue" ? "green" : "red" }}
        9 out
        of 10 times and {{ stat_norm === "blue" ? "red" : "green" }} 1 out of 10 times.
      </p>

      <p>
        <img :src="biased_marble_machine"/>
      </p>

      When the two marbles reach the center, the machine makes a sound.
      The islanders have discovered a simple rule that always determines the sound that the machine makes:
      <ul>
        <li>When the machine releases <b>{{
            mechanism === "conjunctive" ? "both" : "either"
          }} a <span class="red">red</span> {{
            mechanism === "conjunctive" ? "and" : "or"
          }} a <span class="blue">blue</span> marble</b>, the machine makes sound A.
        </li>
        <li>Otherwise, the machine makes sound B.</li>
      </ul>
      <b>Sound B is a simple tone,
        {{
          effect_valence === 'neutral' ? 'and sound A is also a simple tone' : effect_valence === 'pleasant' ? 'while sound A is a very pleasant melody' : 'while sound  A is a distressing screeching noise'
        }}</b>.

      <p>
        Here is a picture of the possible outcomes:
      </p>

      <img :src="outcomes_picture" v-bind:style="{ width: '75%' }">
    </InstructionScreen>

    <template v-for="attempt in [1,2]">
      <template v-if="attempt === 1 | comprehension_1_failed" v-for="(trial, i) in comprehension_trials">
        <Screen>
          <Slide>
            Remember the rule that determines the sound that the machine makes:
            <div style="color: gray">
              When the machine releases <b>{{
                mechanism === "conjunctive" ? "both" : "either"
              }} a <span class="red">red</span> {{
                mechanism === "conjunctive" ? "and" : "or"
              }} a <span class="blue">blue</span> marble</b>, the machine makes sound A.
              Otherwise, the machine makes sound B.
            </div>

            To make sure you understand, please select the sound that the machine makes when the following marbles are
            released:

            <p>
              <img :src="trial.picture" v-bind:style="{ width: '20%' }"/>
            </p>
            <ForcedChoiceInput
                :response.sync="$magpie.measurements.response"
                :options="['sound A', 'sound B']"
                @update:response="saveComprehensionResponse($magpie.measurements.response,trial.correct_response)"/>

            <Record
                :data="{
              trialType : 'comprehension-1-'+attempt,
              trialNr : i+1,
              correct_response: trial.correct_response,
              response : $magpie.measurements.response,
              effect_valence : effect_valence,
              mechanism : mechanism,
              comprehension_1_failed: comprehension_1_failed
            }"
            />
          </Slide>
        </Screen>
      </template>

      <InstructionScreen v-if="attempt === 1">
        <p v-if="!comprehension_1_failed">Great, you understand how the marble machine works. Let's carry on!</p>

        <p v-if="comprehension_1_failed"> Oops! You made a mistake in at least one of your answers.<br/>

          Remember the rule that determines the sound that the machine makes:
          <ul>
            <li>When the machine releases <b>{{
                mechanism === "conjunctive" ? "both" : "either"
              }} a <span class="red">red</span> {{
                mechanism === "conjunctive" ? "and" : "or"
              }} a <span class="blue">blue</span> marble</b>, the machine makes sound A.
            </li>
            <li>Otherwise, the machine makes sound B.</li>
          </ul>
          <b>Sound B is a simple tone,
            {{
              effect_valence === 'neutral' ? 'and sound A is also a simple tone' : effect_valence === 'pleasant' ? 'while sound A is a very pleasant melody' : 'while sound  A is a distressing screeching noise'
            }}</b>.

          <br/>
          <p v-if="comprehension_1_failed">Here are the possible outcomes:</p>
          <img :src="outcomes_picture" v-bind:style="{ width: '75%' }" v-if="comprehension_1_failed">
        </p>

        <p v-if="comprehension_1_failed">Let’s try again!
        </p>
      </InstructionScreen>
    </template>

    <Screen>
      <Slide>
        Remember also that the marbles are released with different probabilities:
        <p style="color: gray">
          Blue marbles are released with a probability of {{ stat_norm === "blue" ? "90" : "10" }}%.<br>
          Red marbles are released with a probability of {{ stat_norm === "blue" ? "10" : "90" }}%.
        </p>

        <p>
          To make sure you understand, please select <strong>which marble is more likely to be released</strong>:
        </p>

        <ForcedChoiceInput
            :response.sync="$magpie.measurements.correct_response_bias"
            :options="['Blue marble', 'Red marble']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
            :data="{
              trialType : 'comprehension-2',
              trialNr : 1,
              correct_response:  stat_norm === 'blue' ? 'Blue marble' : 'Red marble',
              response : $magpie.measurements.correct_response_bias,
              effect_valence : effect_valence,
              mechanism : mechanism,
              stat_norm : stat_norm
            }"
        />
      </Slide>
    </Screen>

    <InstructionScreen :title="'Further Instructions'">
      <p>
        There are two religions on the island.
        In religion 1, the color <span class="red">red</span> is thought to be impure—for example, believers in religion
        1 avoid wearing red
        clothes.
        So when they use the marble machine, they think 'red marbles should not be released'.
      </p>
      <p>
        In religion 2, the color <span class="blue">blue</span> is thought to be sinful—for example, believers in
        religion 2 avoid using blue
        paint in their artwork.
        So when they use the marble machine, they think 'blue marbles should not be released'.
      </p>

      <img src="images/color-preferences.png"/>

      <p>
        Of course, the users of the marble machine cannot control which marbles will come out.
        So, the machine will release a <span class="red">red</span> marble with {{
          stat_norm === "blue" ? "10" : "90"
        }}%
        probability and a <span class="blue">blue</span> marble with {{ stat_norm === "blue" ? "90" : "10" }}%
        probability, no
        matter who presses the Start button.
        Everyone on the island knows how the marble machine works. Even people of different religions completely agree
        with each other about how the machine works.
      </p>
    </InstructionScreen>

    <Screen :title="'Comprehension Test'">
      <Slide>
        Please answer the following comprehension question:
        <p>
          <b>
            On the island, who knows how the machine works?
          </b>
        </p>

        <p/>

        <ForcedChoiceInput
            :response.sync="$magpie.measurements.response"
            :options="['Everyone', 'Followers of religion 1', 'Followers of religion 2']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
            :data="{
              trialType : 'comprehension-3',
              trialNr : 1,
              correct_response: 'Everyone',
              response : $magpie.measurements.response,
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
          <b>
            When you activate the machine, you can control which colors get released.
          </b>
        </p>

        <p/>

        <ForcedChoiceInput
            :response.sync="$magpie.measurements.response"
            :options="['TRUE', 'FALSE']"
            @update:response="$magpie.saveAndNextScreen();"/>

        <Record
            :data="{
              trialType : 'comprehension-3',
              trialNr : 2,
              correct_response: 'FALSE',
              response : $magpie.measurements.response,
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
              You see two islanders, a follower of religion 1 who regards <span class="red">red</span> as impure, and a follower of religion 2 who regards <span
                class="blue">blue</span> as impure, come up to the machine.
              The button to activate the machine is pressed, so one marble is randomly released from each compartment at the same time.<br/>
              The marble released from the left compartment is <span :class="trial.left_marble">{{
                trial.left_marble
              }}</span>, and the marble released from the right compartment is
              <span :class="trial.right_marble">{{ trial.right_marble }}</span>.
            </span>
            <span v-else>The button to activate the machine is pressed again.
              This time, the marble released from the left compartment is <span
                  :class="trial.left_marble">{{ trial.left_marble }}</span>, and the marble released from the right compartment is
                <span :class="trial.right_marble">{{ trial.right_marble }}</span>.
            </span>

            Because
            {{ (mechanism === 'conjunctive' ? "both " : "at least ") }}
            a <span class="blue">blue</span> marble
            {{ (mechanism === 'conjunctive' ? "and " : "or ") }}
            <span class="red">red</span> marble
            {{ (mechanism === 'conjunctive' ? "have " : "has ") }}
            <u>{{
                (trial.left_marble === 'blue' & trial.right_marble === 'red' ? '' :
                    (trial.left_marble === 'blue' | trial.right_marble === 'red' ? (mechanism === 'conjunctive' ? 'not' : '') : 'not'))
              }}</u>
            been released, the machine emits {{ trial.outcome_sound }},
            {{
              trial.outcome_sound === 'sound A' ? (effect_valence === 'neutral' ? 'a simple tone' : effect_valence === 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise') : ('a simple tone')
            }}.</p>

          <p>
            <img style="width:60%;" :src="callout_biased_marble_machine"/>
          </p>
          <br>
          <p>
            <img
                :src="'images/final-outcome-' + mechanism + '-' + effect_valence + '-' + trial.left_marble + '-' + trial.right_marble + '.png'"/>
          </p>

          <p class="instructions">
            Given the situation, decide how likely the follower of <b>religion 1</b>, who regards <span
              class="red">red</span>
            as impure, is to say the following following:
          </p>
          <br/>

          <b>'The machine made {{ trial.outcome_sound }} because a <span :class="trial.left_marble">{{
              trial.left_marble
            }}</span> marble was released'.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.response_relig_1_left"
          />

          <b>'The machine made {{ trial.outcome_sound }} because a <span
              :class="trial.right_marble">{{ trial.right_marble }}</span> marble was released'.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.response_relig_1_right"
          />

          <br>
          <p class="instructions">
            Given the situation, decide how likely the follower of <b>religion 2</b>, who regards <span class="blue">blue</span>
            as impure, is to say the following following:
          </p>
          <br/>

          <b>'The machine made {{ trial.outcome_sound }} because a <span :class="trial.left_marble">{{
              trial.left_marble
            }}</span> marble was released'.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.response_relig_2_left"
          />

          <b>'The machine made {{ trial.outcome_sound }} because a <span
              :class="trial.right_marble">{{ trial.right_marble }}</span> marble was released'.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.response_relig_2_right"
          />

          <p v-if="$magpie.measurements.response_relig_1_left > 0 && $magpie.measurements.response_relig_2_right > 0 && $magpie.measurements.response_relig_2_left > 0 && $magpie.measurements.response_relig_2_right > 0">
            <button @click="$magpie.saveAndNextScreen()">Submit</button>
          </p>

          <Record
              :data="{
              trialType : 'critical-speaker',
              trialNr : i,
              effect_valence : effect_valence,
              mechanism : mechanism,
              stat_norm: stat_norm,
              left_marble : trial.left_marble,
              right_marble : trial.right_marble,
              outcome_sound : trial.outcome_sound,
              response_relig_1_left : $magpie.measurements.response_relig_1_left,
              response_relig_1_right : $magpie.measurements.response_relig_1_right,
              response_relig_2_left : $magpie.measurements.response_relig_2_left,
              response_relig_2_right : $magpie.measurements.response_relig_2_right,
            }"
          />
        </Slide>
      </Screen>
    </template>

    <template v-for="(trial, i) in listener_trials">
      <Screen>
        <Slide>
          <p class="instructions">

            <span v-if="i==0">
              After the two islanders leave, an islander whose <b>religion is unknown</b> to you approaches the machine and presses the button to activate it.
            </span>
            <span v-else>
              This islander also leaves, and another islander whose <b> religion is unknown</b> to you approaches the machine and presses the button to activate it.
            </span>
            So, one marble is randomly released from each compartment at the same time.<br/>
            The marble released from the left compartment is <span :class="trial.left_marble">{{
              trial.left_marble
            }}</span>, and the marble released from the
            right compartment is <span :class="trial.right_marble">{{ trial.right_marble }}</span>.
            Because
            {{ (mechanism === 'conjunctive' ? "both " : "at least ") }}
            a <span class="blue">blue</span> marble
            {{ (mechanism === 'conjunctive' ? "and " : "or ") }}
            <span class="red">red</span> marble
            {{ (mechanism === 'conjunctive' ? "have " : "has ") }}
            <u>{{
                (trial.left_marble === 'blue' & trial.right_marble === 'red' ? '' :
                    (trial.left_marble === 'blue' | trial.right_marble === 'red' ? (mechanism === 'conjunctive' ? 'not' : '') : 'not'))
              }}</u>
            been released, the machine emits {{ trial.outcome_sound }},
            {{
              trial.outcome_sound === 'sound A' ? (effect_valence === 'neutral' ? 'a simple tone' : effect_valence === 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise') : ('a simple tone')
            }}.
          </p>

          <p>
            <img style="width:60%;" :src="callout_biased_marble_machine"/>
          </p>
          <br>
          <p>
            <img
                :src="'images/final-outcome-' + mechanism + '-' + effect_valence + '-' + trial.left_marble + '-' + trial.right_marble + '.png'"/>
          </p>

          <p class="instructions">
            The islander says: <b>'The machine emitted {{ trial.outcome_sound }} because a
            <span :class="trial.actual_outcome === 'left' ? trial.left_marble : trial.right_marble">{{
                trial.actual_outcome === 'left' ? trial.left_marble : trial.right_marble
              }}</span>
            marble was released'</b>.
          </p>
          <br>
          <p class="instructions">
            Given what he said, which religion does the islander belong to?
            In other words, do you think it is more likely that the islander thinks that <span class="red">red</span>
            marbles or <span class="blue">blue</span> marbles
            shouldn’t be released?
            <br>

          </p>

          <RatingInput
              left="red marbles should not be released"
              right="blue marbles should not be released"
              :response.sync="$magpie.measurements.response_relig_unk"
          />

          <span style="color: gray">choices of 1 and 7 express relative confidence for one of the options</span>
          <br>
          <span style="color: gray">choice of 4 expresses total uncertainty</span>

          <p v-if="$magpie.measurements.response_relig_unk > 0">
            <button @click="$magpie.saveAndNextScreen();">Submit</button>
          </p>

          <Record
              :data="{
              trialType : 'critical-listener',
              trialNr : i,
              effect_valence : effect_valence,
              mechanism : mechanism,
              stat_norm: stat_norm,
              actual_outcome : trial.actual_outcome,
              left_marble : trial.left_marble,
              right_marble : trial.right_marble,
              outcome_sound : trial.outcome_sound,
              response_relig_unk : $magpie.measurements.response_relig_unk
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

// mechanism of the machine is conjunctive or disjunctive process
const mechanism = _.sample(["conjunctive", "disjunctive"]);

const effect_valence = _.sample(["pleasant", "neutral", "unpleasant"]);

const outcomes_picture = 'images/outcomes-' + mechanism + '-' + effect_valence + '.png'

const stat_norm = _.sample(["blue", "red"]);

const biased_marble_machine = 'images/biased-marble-machine-' + stat_norm + '.png'

const callout_biased_marble_machine = 'images/callout-biased-marble-machine-' + stat_norm + '.png'

// comprehension
const comprehension_trials = _.shuffle(_.filter(comprehension_trials_all, function (i) {
  return i.mechanism === mechanism
}))

// speaker trials
const outcomes_speaker = _.filter(outcomes_speaker_all, function (i) {
  return i.mechanism === mechanism & i.effect_valence === effect_valence;
})
const speaker_trials = _.shuffle([outcomes_speaker[0], _.sample(outcomes_speaker.slice(1))]);

// listener trials
const outcomes_listener = _.filter(outcomes_listener_all, function (i) {
  return i.mechanism === mechanism & i.effect_valence === effect_valence;
})
// participants may be asked to identify whether the sound was caused by the marble released from either the left or right compartment
const main_trial_outcome = _.sample(["left", "right"]);
const main_trial = _.filter(outcomes_listener.slice(0, 2), function (i) {
  return i.actual_outcome === main_trial_outcome;
})[0]
const other_trial_outcome = _.sample(["left", "right"]);
const other_trial = _.sample(_.filter(outcomes_listener.slice(2), function (i) {
  return i.actual_outcome === other_trial_outcome;
}))
const listener_trials = _.shuffle([main_trial, other_trial]);


export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      stat_norm: stat_norm,
      outcomes_picture: outcomes_picture,
      biased_marble_machine: biased_marble_machine,
      callout_biased_marble_machine: callout_biased_marble_machine,
      speaker_trials: speaker_trials,
      listener_trials: listener_trials,
      comprehension_trials: comprehension_trials,
      comprehension_1_failed: false
    };
  },
  computed: {
    // Expose lodash to template code
    _() {
      return _;
    }
  },
  methods: {
    saveComprehensionResponse: function (response, correct_response) {
      this.comprehension_1_failed = (this.comprehension_1_failed || !(response === correct_response));
      $magpie.saveAndNextScreen();
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
