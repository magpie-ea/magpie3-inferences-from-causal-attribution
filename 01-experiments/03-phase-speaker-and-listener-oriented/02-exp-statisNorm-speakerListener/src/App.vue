<!--03 phase 02 exp-->
<template>
  <Experiment title="CausalAttribInference">
    <InstructionScreen :title="'Welcome'">
      <!--      <button @click="$magpie.nextScreen(2)">DEV: Skip to outcome comprehension trials</button>-->
      <!--      <button @click="$magpie.nextScreen(7)">DEV: Skip to archipelago comprehension trials</button>-->
      <!--      <button @click="$magpie.nextScreen(10)">DEV: Skip to speaker trials</button>-->
      <!--      <button @click="$magpie.nextScreen(15)">DEV: Skip to listener trials</button>-->

      Hi! Thanks for taking part!<br/>
      This experiment first introduces you to a background scenario.
      Please read the description closely and pay careful attention as there are several important details you need to
      remember. You will be asked simple comprehension questions to make sure you understand and retain all the
      information.
      Later, you will evaluate how characters might respond to situations and interpret some of their statements.

    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      <p>
        In this experiment, you will play the role of an anthropologist visiting a faraway civilisation that lives on a
        remote archipelago.
        The civilisation possesses a technology of unknown origin: <b>the marble machine</b>.
        There are several of these ancient artefacts; in fact, there is exactly one marble machine on each island of the
        archipelago.<br>
        All inhabitants of the archipelago know how the marble machines work:
        The compartment on the left of each machine contains <span class="blue">blue</span> and <span class="yellow">yellow</span>
        marbles, and the compartment on the right
        contains <span class="red">red</span> and <span class="green">green</span> marbles (see picture below).
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.
        On each side, the marble is chosen by some random process (more on this in a moment).
      </p>

      <p>
        <img src="images/marble-machine.png"/>
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
              trialType : 'comprehension-1-'+ attempt,
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
        <p v-if="!comprehension_1_failed">Great, you understood the task! Let’s begin.</p>

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
          <img :src="outcomes_picture" v-bind:style="{ width: '75%' }">
        </p>

        <p v-if="comprehension_1_failed">Let’s try again!
        </p>
      </InstructionScreen>
    </template>

    <InstructionScreen :title="'Further Instructions'">
      <p>
        The basic mechanism is the same in marble machines on all of the islands.
        However, machines on different islands release marbles with different probabilities, and islanders are only
        familiar with the machines on their own islands, not with any others.<br>

        Across the islands of the archipelago, there are two kinds of machines:
        <ul>
          <li>On <b>B-G</b> islands, the machines release <span class="blue">blue</span> and <span
              class="green">green</span> marbles <b>90%</b> of the time and <span class="yellow">yellow</span> and
            <span class="red">red</span> marbles <b>10%</b> of the time.
            We use this icon to label them:
            <p style="text-align: center">
              <img src="images/label-B-G.png" v-bind:style="{ width: '15%' }">
            </p>
          </li>

          <li>On <b>Y-R</b> islands, the machines release <span class="yellow">yellow</span> and <span
              class="red">red</span> marbles <b>90%</b> of the time and <span class="blue">blue</span> and
            <span class="green">green</span> marbles <b>10%</b> of the time.
            We use this icon to label them:
            <p style="text-align: center">
              <img src="images/label-Y-R.png" v-bind:style="{ width: '15%' }">
            </p></li>
        </ul>
      </p>
      <p>
        Here you can see the two kinds of machines:
      </p>
      <img src="images/marble-machines-B-G-Y-R.png">
    </InstructionScreen>


    <Screen>
      <Slide>
        <p class="instructions"><b>When the machine is activated, can the user control which colors are released?</b>
          <MultipleChoiceInput
              :response.sync="$magpie.measurements.response_control"
              :options="['Yes', 'No', 'Cannot say']"/>
        </p>
        <br>

        <p class="instructions">
          <b>Does a person from an island labeled <img src="images/label-B-G.png"
                                                    style="width: 8%; vertical-align: middle"/> know about a machine
            from an island labeled <img src="images/label-Y-R.png" style="width: 8%; vertical-align: middle"/>, or vice
            versa? </b>
          <MultipleChoiceInput
              :response.sync="$magpie.measurements.response_awareness"
              :options="['Yes', 'No', 'Cannot say']"/>
        </p>
        <br>
        <p v-if="$magpie.measurements.response_control && $magpie.measurements.response_awareness">
          <button @click="$magpie.saveAndNextScreen()">Submit</button>
        </p>
        <Record
            :data="{
              trialType : 'comprehension-2',
              trialNr : 1,
              effect_valence : effect_valence,
              mechanism : mechanism,
              response_control : $magpie.measurements.response_control,
              correct_response_control : 'No',
              response_awareness : $magpie.measurements.response_awareness,
              correct_response_awareness : 'No'
            }"
        />
      </Slide>
    </Screen>
    <Screen>
      <Slide>

        <p class="instructions"><b>Would a person from an island labeled <img src="images/label-B-G.png"
                                                                              style="width: 8%; vertical-align: middle"/>
          say that a <span class="blue">blue</span> marble is more likely to be released than a <span class="yellow">yellow</span>
          marble?</b>
          <MultipleChoiceInput
              :response.sync="$magpie.measurements.response_bg"
              :options="['Yes', 'No', 'Cannot say']"/>
        </p>
        <br>

        <p class="instructions">
          <b>Which of the following is a person from an island labeled <img src="images/label-Y-R.png"
                                                                            style="width: 8%; vertical-align: middle"/>
            most likely to say?</b>
          <MultipleChoiceInput
              :response.sync="$magpie.measurements.response_yr"
              :options="['The probability of a blue marble being released is either 90% or 10%.', 'The probability of a yellow marble being released is the same as of a red marble being released.', 'The probability of a green ball being released is 50%.']"/>
        </p>
        <br>

        <p class="instructions">
          <b>Would a person from an island that is <u>not</u> labeled either <img src="images/label-B-G.png"
                                                                                  style="width: 8%; vertical-align: middle"/>
            or <img src="images/label-Y-R.png" style="width: 8%; vertical-align: middle"/> say that a <span
                class="red">red</span> marble
            is more likely to be released than a <span class="green">green</span> marble?</b>
          <MultipleChoiceInput
              :response.sync="$magpie.measurements.response_unlabeled"
              :options="['Yes', 'No', 'Cannot say']"/>
        </p>
        <br>
        <p v-if="$magpie.measurements.response_bg && $magpie.measurements.response_yr && $magpie.measurements.response_unlabeled">
          <button @click="$magpie.saveAndNextScreen()">Submit</button>
        </p>
        <Record
            :data="{
              trialType : 'comprehension-2',
              trialNr : 2,
              effect_valence : effect_valence,
              mechanism : mechanism,
              response_bg : $magpie.measurements.response_bg,
              correct_response_bg : 'Yes',
              response_yr : $magpie.measurements.response_yr,
              correct_response_yr : 'The probability of a yellow marble being released is the same as of a red marble being released.',
              response_unlabeled : $magpie.measurements.response_unlabeled,
              correct_response_unlabeled: 'Cannot say'
            }"
        />
      </Slide>
    </Screen>

    <InstructionScreen :title="'Further Instructions'">
      <p>
        Here we have a map of the archipelago, based on previous anthropological surveys.
        Notice that one island is labeled <img src="images/label-unknown.png"
                                               style="width: 8%; vertical-align: middle"/>; this means that we don't
        know whether it is a <b>B-G</b> or a <b>Y-R</b> island.
      </p>
      <img src="images/archipelago-map-labeled.png">
      <p>
        You will now visit some of the islands.
      </p>
    </InstructionScreen>

    <template v-for="(trial, i) in speaker_trials">
      <Screen>
        <Slide>

          <img :src="'images/island-'+trial.island_type+'.png'" v-bind:style="{ width: '25%' }"/><br>
          <p class="instructions">

            <span v-if="i === 0">
              Your journey leads first to an island categorised as {{ trial.island_type }}.
              So the machine on this island releases
              <span :class='trial.island_type === "B-G" ? "blue" : "yellow"'>{{
                  trial.island_type === "B-G" ? "blue" : "yellow"
                }}</span>
              and
              <span :class='trial.island_type === "B-G" ? "green" : "red"'>{{
                  trial.island_type === "B-G" ? "green" : "red"
                }}</span>
              marbles 90% of the time and
              <span :class='trial.island_type === "B-G" ? "yellow" : "blue"'>{{
                  trial.island_type === "B-G" ? "yellow" : "blue"
                }}</span>
              and
              <span :class='trial.island_type === "B-G" ? "red" : "green"'>{{
                  trial.island_type === "B-G" ? "red" : "green"
                }}</span>
              marbles 10% of the time.<br/>
              Upon arrival, you see an islander who presses the Start button on their island's marble machine to activate it.
            </span>

            <span v-if="i === 2">
              Next, you travel to an island categorised as {{ trial.island_type }}.
              So the machine on this island releases
              <span :class='trial.island_type === "B-G" ? "blue" : "yellow"'>{{
                  trial.island_type === "B-G" ? "blue" : "yellow"
                }}</span>
              and
              <span :class='trial.island_type === "B-G" ? "green" : "red"'>{{
                  trial.island_type === "B-G" ? "green" : "red"
                }}</span>
              marbles 90% of the time and
              <span :class='trial.island_type === "B-G" ? "yellow" : "blue"'>{{
                  trial.island_type === "B-G" ? "yellow" : "blue"
                }}</span>
              and
              <span :class='trial.island_type === "B-G" ? "red" : "green"'>{{
                  trial.island_type === "B-G" ? "red" : "green"
                }}</span>
              marbles 10% of the time.<br/>
              Upon arrival, you see an islander who presses the Start button on their island's marble machine to activate it.
            </span>

            <span v-if="i !== 0 && i !== 2">
              The islander presses the button again.
            </span>
            So, one marble is randomly released from each compartment at the same time.
            The marble released from the left compartment is <span :class="trial.left_marble">{{
              trial.left_marble
            }}</span>,
            and the marble released from the right compartment is <span
              :class="trial.right_marble">{{ trial.right_marble }}</span>.
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

          <img
              :src="'images/final-outcome-' + mechanism + '-' + effect_valence + '-' + trial.left_marble + '-' + trial.right_marble + '.png'"/>

          <p class="instructions">
            Given the situation, decide how likely it is that this islander would say the following:
          </p>
          <br/>

          <b>'The machine made {{ trial.outcome_sound }} because a <span :class="trial.left_marble">{{
              trial.left_marble
            }}</span> marble was released'.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.response_left"
          />

          <b>'The machine made {{ trial.outcome_sound }} because a <span
              :class="trial.right_marble">{{ trial.right_marble }}</span> marble was released'.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.response_right"
          />

          <p v-if="$magpie.measurements.response_left > 0 && $magpie.measurements.response_right > 0">
            <button @click="$magpie.saveAndNextScreen()">Submit</button>
          </p>

          <Record
              :data="{
              trialType : 'critical-speaker',
              trialNr : i+1,
              mechanism: mechanism,
              effect_valence: effect_valence,
              island_type : trial.island_type,
              left_marble : trial.left_marble,
              right_marble : trial.right_marble,
              outcome_sound : trial.outcome_sound,
              response_left : $magpie.measurements.response_left,
              response_right : $magpie.measurements.response_right
            }"
          />
        </Slide>
      </Screen>
    </template>

    <template v-for="(trial, i) in listener_trials">
      <Screen>
        <Slide>

          <img :src="'images/island-unknown.png'" v-bind:style="{ width: '25%' }"/><br>
          <p class="instructions">

            <span v-if="i==0">
              Finally, you sail to an island which has not yet been categorised as either B-G or Y-R.<br>
              On the island, you see an islander who presses the Start button on their island’s marble machine to activate it.
              So, one marble is randomly released from each compartment at the same time.
            </span>
            <span v-else>
              The islander presses the button again.
              So, one marble is randomly released from each compartment at the same time.
              </span>
            The marble released from the left compartment is <span :class="trial.left_marble">{{
              trial.left_marble
            }}</span>,
            and the marble released from the right compartment is <span
              :class="trial.right_marble">{{ trial.right_marble }}</span>.
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

          <img
              :src="'images/final-outcome-' + mechanism + '-' + effect_valence + '-' + trial.left_marble + '-' + trial.right_marble + '.png'"/>

          <br>
          <br>
          <p class="instructions">
            And this time, you hear the islander say:
          </p>
          <p>
            <b>'The machine made {{ trial.outcome_sound }} because a <span
                :class="trial.actual_outcome === 'left' ? trial.left_marble : trial.right_marble">{{
                trial.actual_outcome === 'left' ? trial.left_marble : trial.right_marble
              }}</span> marble was released'</b>.
          </p>
          <p class="instructions">
            Given what the islander said, which category do you think the island should be assigned?
            In other words, do you think that category <img :src="'images/label-B-G.png'"
                                                            style="width: 8%; vertical-align: middle"/>
            is more likely or category <img :src="'images/label-Y-R.png'" style="width: 8%; vertical-align: middle"/> is
            more likely for this island?
          </p>

          <RatingInput
              left="category B-G is more likely"
              right="category Y-R is more likely"
              :response.sync="$magpie.measurements.response_unk"
          />

          <span style="color: gray">choices of 1 and 7 express relative confidence for one of the options</span>
          <br>
          <span style="color: gray">choice of 4 expresses total uncertainty</span>

          <p v-if="$magpie.measurements.response_unk > 0">
            <button @click="$magpie.saveAndNextScreen();">Submit</button>
          </p>

          <Record
              :data="{
              trialType : 'critical-listener',
              trialNr : i+1,
              effect_valence : effect_valence,
              mechanism : mechanism,
              actual_outcome : trial.actual_outcome,
              left_marble : trial.left_marble,
              right_marble : trial.right_marble,
              outcome_sound : trial.outcome_sound,
              response_unk : $magpie.measurements.response_unk
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
const mechanism = _.shuffle(["conjunctive", "disjunctive"])[0];

const effect_valence = _.shuffle(["pleasant", "neutral", "unpleasant"])[0];

const outcomes_picture = 'images/outcomes-' + mechanism + '-' + effect_valence + '.png'

// comprehension
const comprehension_trials = _.shuffle(_.filter(comprehension_trials_all, function (i) {
  return i.mechanism === mechanism
}))

// speaker trials
const outcomes_speaker_BG = _.filter(outcomes_speaker_all, function (i) {
  return i.mechanism === mechanism & i.effect_valence === effect_valence & i.island_type === "B-G";
})
const outcomes_speaker_YR = _.filter(outcomes_speaker_all, function (i) {
  return i.mechanism === mechanism & i.effect_valence === effect_valence & i.island_type === "Y-R";
})
const speaker_trials = _.shuffle([_.shuffle([outcomes_speaker_BG[0], _.sample(outcomes_speaker_BG.slice(1))]), _.shuffle([outcomes_speaker_YR[0], _.sample(outcomes_speaker_YR.slice(1))])]).flat();

// listener trials
const outcomes_listener = _.filter(outcomes_listener_all, function (i) {
  return i.mechanism === mechanism & i.effect_valence === effect_valence;
})
const main_trial_outcome = _.sample(["left", "right"]);
const blue_red_trial = _.filter(outcomes_listener.slice(0, 2), function (i) {
  return i.actual_outcome === main_trial_outcome;
})[0]
const other_trial_outcome = _.sample(["left", "right"]);
const other_trial = _.sample(_.filter(outcomes_listener.slice(2), function (i) {
  return i.actual_outcome === other_trial_outcome;
}))
const listener_trials = _.shuffle([blue_red_trial, other_trial]);

export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      outcomes_picture: outcomes_picture,
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
