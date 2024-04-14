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
        A long time ago, the inhabitants of the island discovered an ancient artifact: the marble machine.
        Nobody knows where the marble machine comes from, but everybody knows how it works.

        <br>

        The compartment on the right of the marble machine contains red and green marbles, and the one on the left contains blue and yellow marbles.
        When someone presses the ‘Start’ button, one marble is released from each compartment of the machine.
        On each side, the marble is chosen completely at random.
      </p>

      <p>[Machine picture]</p>


      When the two marbles reach the center, the machine makes a sound.
      The islanders have discovered a simple rule that always determines the sound that the machine makes:
      <ul>
        <li>When the machine releases <strong>{{  mechanism == "conjunctive" ? "both a red and a blue marble" : "either a red or a blue marble" }}</strong>, the machine makes sound A.</li>
        <li>Otherwise, the machine makes sound B.</li>
      </ul>
      <strong>Sound B is a simple tone, {{effect_valence == 'neutral' ? 'and Sound A is also a simple tone' : effect_valence == 'pleasant' ? 'while Sound A is a very pleasant melody' : 'while Sound  A is a distressing screeching noise'}}</strong>.

    </InstructionScreen>

    <InstructionScreen :title="'Comprehension questions'">

      FILL ME

    </InstructionScreen>

    <InstructionScreen :title="'Welcome'">
      There are two religions on the island.
      In religion 1, the color Red is thought to be impure---for example, believers in Religion 1 avoid wearing red clothes.
      So when they use the marble machine, they think `Red marbles should not be released’.
      <br><br>
      In religion 2, the color Blue is thought to be sinful---for example, believers in Religion 2 avoid using blue paint in their artwork.
      So when they use the marble machine, they think `Blue marbles should not be released’.
      <br><br>
      Of course, the users of the marble machine cannot control which marbles will come out.
      So, red and blue marbles are equally likely to be released, no matter who presses the Start button.
      Everyone on the island knows how the marble machine works. Even people of different religions completely agree with each other about how the machine works.

    </InstructionScreen>

    <InstructionScreen :title="'Comprehension questions'">

      [Comprehension questions:
-On the island, who knows how the machine works? Everyone / only people who believe in Religion 1 / only people who believe in Religion 2 / Noone
-When you activate the machine, you can control which colors get released. True / False]


    </InstructionScreen>

    <Screen>

      <Slide>
        <p>
          You see an islander press the Start button to activate the machine.
          So, one marble is randomly released from each compartment at the same time.
          The marble released from the left compartment is red, and the marble released from the right compartment is blue.
          Because {{mechanism == 'conjunctive' ? 'both a blue and a red marble have been released' : 'at least a red marble or a blue marble has been released'}}, the machine emits sound A, {{effect_valence == 'neutral' ? 'a simple tone' : effect_valence == 'pleasant' ? 'a very pleasant melody' : 'a distressing, screeching noise'}}.
        </p>

          <p>[Machine picture with outcome]</p>
          <p>
            The islander says: `<strong>The machine emitted sound A because a {{actual_cause == 'red' ? 'red' : 'blue'}} marble was released</strong>’.
          </p>
          <p>
            Given what he said, which religion does the islander belong to? In other words, do you think it is more likely that the islander thinks that red marbles or blue marbles shouldn’t be released?
            <br>

          </p>

        <RatingInput
          left="red balls should not be released"
          right="blue balls should not be released"
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

// mechanism of the machine is conjunctive or disjunctive process

const mechanism = _.shuffle(["conjunctive", "disjunctive"])[0];

const effect_valence = _.shuffle(["pleasant", "neutral", "unpleasant"])[0];

const actual_cause = _.shuffle(["red", "blue"])[0];

export default {
  name: 'App',
  data() {
    return {
      mechanism: mechanism,
      effect_valence: effect_valence,
      actual_cause: actual_cause,
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
