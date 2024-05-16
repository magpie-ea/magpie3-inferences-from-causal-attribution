# material for experiment on preference inference from causal attribution 

This repository hosts an online experiment implemented in [magpie](https://magpie-experiments.org/).
The experiment is designed to investigate inferences that listeners may draw about the preferences or norms of a speaker, when observing the speaker identify the actual cause of an event.

Here is a [live version](https://magpie-ea.github.io/magpie3-inferences-from-causal-attribution/)

### Setup

First, set up the project with `npm install`

To run the project locally, run `npm run serve`

To build the project for deployment (e.g. to Netlify), run `npm run build`

If you are hosting this repository on github, the project will automatically be built and deployed to the gh-pages branch, so you only have to enable Github Pages in your repository settings to publish your project.

For more information, see the [manual](https://magpie-experiments.org/).

### Coding style

To automatically fix coding style and format the code (linting) run `npm run lint` and `npm run lint:style`
