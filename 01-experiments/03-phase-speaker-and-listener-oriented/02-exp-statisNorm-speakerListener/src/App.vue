<!--03 phase 02 exp-->
<template>
  <Experiment title="CausalAttribInference">
    <InstructionScreen :title="'Welcome'">
      <button @click="$magpie.nextScreen(2)">DEV: Skip to outcome comprehension trials</button>
      <button @click="$magpie.nextScreen(8)">DEV: Skip to archipelago comprehension trials</button>
      <button @click="$magpie.nextScreen(9)">DEV: Skip to speaker trials</button>
      <button @click="$magpie.nextScreen(14)">DEV: Skip to listener trials</button>

      Hi! Thanks for taking part!<br/>
      This experiment first introduces a background scenario, which we ask you to read carefully.
      You will be asked to answer basic comprehension questions about the scenario.
      We then ask you about your interpretation of some utterances of some characters in the story.
    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      <p>
        In this experiment, you will play the role of an anthropologist visiting a faraway civilisation that lives on a
        remote archipelago.
        The civilisation possesses a technology of unknown origin: <b>the marble machine</b>.
        They have several of these ancient artefacts; in fact, there is one such machine on each island of the
        archipelago.<br>
        All inhabitants of the archipelago know how the marble machines work:
        The compartment on the left of each machine contains blue and yellow marbles, and the compartment on the right
        contains red and green marbles (see picture below).
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.
        On each side, the marble is chosen completely at random.
      </p>

      <p>
        <img src="images/marble-machine.png"/>
      </p>

      When the two marbles reach the center, the machine makes a sound.
      The islanders have discovered a simple rule that always determines the sound that the machine makes:
      <ul>
        <li>When the machine releases <b>{{
            mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble"
          }}</b>, the machine makes sound A.
        </li>
        <li>Otherwise, the machine makes sound B.</li>
      </ul>
      <b>Sound B is a simple tone,
        {{
          effect_valence == 'neutral' ? 'and Sound A is also a simple tone' : effect_valence == 'pleasant' ? 'while Sound A is a very pleasant melody' : 'while Sound  A is a distressing screeching noise'
        }}</b>.

      <p>
        Here is a picture of the possible outcomes:
      </p>

      <img :src="outcomes_picture" v-bind:style="{ width: '75%' }">
    </InstructionScreen>


    <template v-for="attempt in [1,2]">
      <template v-if="attempt==1 | comprehensionFailed" v-for="(trial, i) in comprehension_trials">
        <Screen>
          <Slide>
            Remember the rule that determines the sound that the machine makes:
            <div style="color: gray">
              When the machine releases <b>{{
                mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble"
              }}</b>, the machine makes sound A.
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
                @update:response="saveComprehensionResponse($magpie.measurements.response,trial.correctResponse)"/>

            <Record
                :data="{
              trialType : 'comprehension-'+ attempt,
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

      <InstructionScreen v-if="attempt == 1">
        <p v-if="!comprehensionFailed">Great, you understood the task! Let’s begin.</p>

        <p v-if="comprehensionFailed"> Oops! You made a mistake.<br/>

          Remember the rule that determines the sound that the machine makes:
          <ul>
            <li>When the machine releases <b>{{
                mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble"
              }}</b>, the machine makes sound A.
            </li>
            <li>Otherwise, the machine makes sound B.</li>
          </ul>
          <b>Sound B is a simple tone,
            {{
              effect_valence == 'neutral' ? 'and Sound A is also a simple tone' : effect_valence == 'pleasant' ? 'while Sound A is a very pleasant melody' : 'while Sound  A is a distressing screeching noise'
            }}</b>.

          <br/>
          <p>
            Here are the possible outcomes:
          </p>
          <img :src="outcomes_picture" v-bind:style="{ width: '75%' }">
        </p>

        <p v-if="comprehensionFailed">Let’s try again!
        </p>
      </InstructionScreen>
    </template>

    <InstructionScreen :title="'Further Instructions'">
      <p>
        The basic mechanism is the same in marble machines on all of the islands.
        However, machines on different islands release the marbles with different probabilities.<br>

        Across the islands of the archipelago, there are two kinds of machines:
        <ul>
          <li>On <b>B-G</b> islands, the machines release blue and green marbles <b>90%</b> of the time and yellow and
            red marbles <b>10%</b> of the time.<br/>
            We use this icon to label them:
            <p style="text-align: center">
              <img src="images/label-B-G.png" v-bind:style="{ width: '15%' }">
            </p>
          </li>

          <li>On <b>Y-R</b> islands, the machines release yellow and red marbles <b>90%</b> of the time and blue and
            green marbles <b>10%</b> of the time.<br/>
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

        <MultipleChoiceMatrixInput
            :options="['True','False']"
            :questions="[
              'How is the weather today?',
              'How was your breakfast today?',
              'How do you like your job?',
              'What is your opinion of television?',
              'What is your opinion of folk music?'
            ]"
            :responses.sync="$magpie.measurements.responses"
        />

        <p v-if="true">
          <button @click="$magpie.saveAndNextScreen()">Submit</button>
        </p>
      </Slide>
    </Screen>

    <InstructionScreen :title="'Further Instructions'">
      <p>
        Here we have a map of the archipelago, based on previous anthropological surveys.
        You will now visit some of the islands.
      </p>
      <img src="images/archipelago-map-labeled.png">
    </InstructionScreen>

    <template v-for="(trial, i) in speaker_trials">
      <Screen>
        <Slide>

          <img :src="'images/island-'+trial.stat_bias+'.png'" v-bind:style="{ width: '25%' }"/><br>
          <p class="instructions">

            <span v-if="i==0">
              Your journey leads first to an island categorised as {{ trial.stat_bias }}. So the machine on this island releases {{
                trial.stat_bias == "b-g" ? "blue and green" : "yellow and red"
              }} marbles 90% of the time and {{ trial.stat_bias == "b-g" ? "yellow and red" : "blue and green" }} marbles 10% of the time.<br/>
              Here, you see an islander who presses the Start button on their island's marble machine to activate it.
              So, one marble is randomly released from each compartment at the same time.
            </span>
            <span v-else>
              The islander presses the button again.
              So, one marble is randomly released from each compartment at the same time.

              </span>
            The marble released from the left compartment is {{ trial.left_marble }},
            and the marble released from the right compartment is {{ trial.right_marble }}.
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
            Given the situation, decide how likely it is that this islander would say the following:
          </p>
          <br/>

          <b>`The machine made {{ trial.outcome_sound }} because a {{ trial.left_marble }} marble was released’.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.responseRelig2Red"
          />

          <b>`The machine made {{ trial.outcome_sound }} because a {{ trial.right_marble }} marble was released’.</b>
          <RatingInput
              left="very unlikely"
              right="very likely"
              :response.sync="$magpie.measurements.responseRelig2Blue"
          />

          <p v-if="true">
            <button @click="$magpie.saveAndNextScreen()">Submit</button>
          </p>

          <Record
              :data="{
              trialType : 'critical-speaker',
              trialNr : 1,
            //TODO: what more to log?
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
              Finally, you sail to an island which has not yet been categorised as either B-G or Y-R.
              On the island, you see an islander who presses the Start button on their island’s marble machine to activate it.
              So, one marble is randomly released from each compartment at the same time.
            </span>
            <span v-else>
              The islander presses the button again.
              So, one marble is randomly released from each compartment at the same time.
              </span>
            The marble released from the left compartment is {{ trial.left_marble }},
            and the marble released from the right compartment is {{ trial.right_marble }}.
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

          <br>
          <br>
          <p class="instructions">
            And this time, you hear the islander say: <b>'The machine made {{ trial.outcome_sound }} because a
            {{ trial.left_marble }} marble was released'</b>.
          </p>

          <br>
          <p class="instructions">
            Given what the islander said, which category do you think the island should be assigned?<br>
            In other words, do you think that category <img :src="'images/label-B-G.png'" v-bind:style="{ width: '8%' }" style="vertical-align: middle;"/>
            is more likely or category <img :src="'images/label-Y-R.png'" v-bind:style="{ width: '8%' }"  style="vertical-align: middle;"/> is more likely for this island?

          </p>
          <br>

          <RatingInput
              left="category B-G is more likely"
              right="category Y-R is more likely"
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
              trialType : 'critical-listener',
              trialNr : 1,
              actual_cause : actual_cause,
              effect_valence : effect_valence,
              mechanism : mechanism
            }"
          />
        </Slide>
      </Screen>
    </template>
    >

    <SubmitResultsScreen/>
  </Experiment>
</template>

<script>
import _ from 'lodash';
import comprehension_trials_all from '../trials/comprehension.csv';
import outcomes_speaker_all from '../trials/outcomes_speaker.csv';
import outcomes_listener_all from '../trials/outcomes_listener.csv';

const mechanism = _.shuffle(["conjunctive", "disjunctive"])[0];

console.log('LOG: mechanism ' + mechanism);
const effect_valence = _.shuffle(["pleasant", "neutral", "unpleasant"])[0];

const actual_cause = _.shuffle(["left", "right"])[0];

const outcomes_picture = 'images/outcomes-' + mechanism + '-' + effect_valence + '.png'

// const final_outcome_picture = 'images/final-outcome-' + mechanism + '-' + effect_valence + '.png'

const comprehension_trials = _.shuffle(_.filter(comprehension_trials_all, function (i) {
  return i.mechanism == mechanism
}))


// needs changing VV
const outcomes_speaker_BG = _.filter(outcomes_speaker_all, function (i) {
  return i.mechanism == mechanism & i.effect_valence == effect_valence & i.stat_bias == "B-G";
})
console.log(outcomes_picture);
const outcomes_speaker_YR = _.filter(outcomes_speaker_all, function (i) {
  return i.mechanism == mechanism & i.effect_valence == effect_valence & i.stat_bias == "Y-R";
})

const speaker_trials = _.shuffle([_.shuffle([outcomes_speaker_BG[0], _.sample(outcomes_speaker_BG.slice(1))]), _.shuffle([outcomes_speaker_YR[0], _.sample(outcomes_speaker_YR.slice(1))])]).flat();

const outcomes_listener = _.filter(outcomes_listener_all, function (i) {
  return i.mechanism == mechanism & i.effect_valence == effect_valence;
})

const blue_red_trial = _.filter(outcomes_listener.slice(0, 2), function (i) {
  return i.actual_outcome == actual_cause;
})[0]

const other_trial_outcome = _.sample(["left", "right"]);

const other_trial = _.sample(_.filter(outcomes_listener.slice(2), function (i) {
  return i.actual_outcome == other_trial_outcome;
}))

const listener_trials = _.shuffle([blue_red_trial, other_trial]);

export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      actual_cause: actual_cause,
      outcomes_picture: outcomes_picture,
      // final_outcome_picture: final_outcome_picture,
      speaker_trials: speaker_trials,
      listener_trials: listener_trials,
      comprehension_trials: comprehension_trials,
      comprehensionFailed: false
    };
  },
  computed: {
    // Expose lodash to template code
    _() {
      return _;
    }
  },
  methods: {
    saveComprehensionResponse: function (response, correctResponse) {
      this.comprehensionFailed = (this.comprehensionFailed || !(response == correctResponse));
      $magpie.saveAndNextScreen();
    }
  }
};
</script>

<style>
.instructions {
  width: 600px;
  margin: 0 auto;
  text-align: justify;
}
</style>
