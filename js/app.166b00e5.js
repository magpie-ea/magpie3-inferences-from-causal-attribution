(function(){var e={7495:function(e){e.exports=[{mechanism:"disjunctive",trialNr:1,picture:"images/comprehension-blue-red.png",correctResponse:"Sound A"},{mechanism:"disjunctive",trialNr:2,picture:"images/comprehension-blue-green.png",correctResponse:"Sound A"},{mechanism:"disjunctive",trialNr:3,picture:"images/comprehension-yellow-red.png",correctResponse:"Sound A"},{mechanism:"disjunctive",trialNr:4,picture:"images/comprehension-yellow-green.png",correctResponse:"Sound B"},{mechanism:"conjunctive",trialNr:1,picture:"images/comprehension-blue-red.png",correctResponse:"Sound A"},{mechanism:"conjunctive",trialNr:2,picture:"images/comprehension-blue-green.png",correctResponse:"Sound B"},{mechanism:"conjunctive",trialNr:3,picture:"images/comprehension-yellow-red.png",correctResponse:"Sound B"},{mechanism:"conjunctive",trialNr:4,picture:"images/comprehension-yellow-green.png",correctResponse:"Sound B"}]},2e3:function(e,n,t){"use strict";var r=t(5471),o=t(4302),a=t.n(o),s=t(6093),i=function(){var e=this,n=e._self._c;return n("Experiment",{attrs:{title:"causal-implicature-variation"}},[n("InstructionScreen",{attrs:{title:"Welcome"}},[e._v(" Hi! Thanks for taking part! "),n("br"),e._v(" This experiment first introduces a background scenario, which we ask you to read carefully. You will be asked to answer basic comprehension questions about the scenario. We then ask you about your interpretation of some utterances of some characters in the story. ")]),n("InstructionScreen",{attrs:{title:"Instructions"}},[n("p",[e._v(" In this experiment, you will play the role of an anthropologist visiting a faraway island. A long time ago, the inhabitants of the island discovered an ancient artifact: "),n("strong",[e._v("the marble machine")]),e._v(". Nobody knows where the marble machine came from, but everybody knows how it works. "),n("br"),e._v(" The compartment on the the left of the marble machine contains blue and yellow marbles, and the compartment on the right contains red and green marbles (see picture below). When someone presses the ‘Start’ button, one marble is released from each compartment of the machine. On each side, the marble is chosen completely at random. ")]),n("p",[n("img",{attrs:{src:"images/marble-machine.png"}})]),e._v(" When the two marbles reach the center, the machine makes a sound. The islanders have discovered a simple rule that always determines the sound that the machine makes: "),n("ul",[n("li",[e._v("When the machine releases "),n("strong",[e._v(e._s("conjunctive"==e.mechanism?"both a red and a blue marble":"either a red or a blue marble"))]),e._v(", the machine makes sound A.")]),n("li",[e._v("Otherwise, the machine makes sound B.")])]),n("strong",[e._v("Sound B is a simple tone, "+e._s("neutral"==e.effect_valence?"and Sound A is also a simple tone":"pleasant"==e.effect_valence?"while Sound A is a very pleasant melody":"while Sound A is a distressing screeching noise"))]),e._v(". "),n("p",[e._v(" Here is a picture of the possible outcomes: ")]),n("p",[n("img",{style:{width:"75%"},attrs:{src:e.outcomes_picture}})])]),e._l(e.comprehension_trials,(function(t,r){return[n("Screen",[n("Slide",[e._v(" Remember the rule that determines the sound that the machine makes: "),n("div",{staticStyle:{color:"gray"}},[e._v(" When the machine releases "),n("strong",[e._v(e._s("conjunctive"==e.mechanism?"both a red and a blue marble":"either a red or a blue marble"))]),e._v(", the machine makes sound A. Otherwise, the machine makes sound B. ")]),e._v(" To make sure you understand, please select the sound that the machine makes when the following marbles are released: "),n("p",[n("img",{attrs:{src:t.picture}})]),n("ForcedChoiceInput",{attrs:{response:e.$magpie.measurements.response,options:["Sound A","Sound B"]},on:{"update:response":[function(n){return e.$set(e.$magpie.measurements,"response",n)},function(n){return e.$magpie.saveAndNextScreen()}]}}),n("Record",{attrs:{data:{trialType:"comprehension",trialNr:r+1,correctResponse:t.correctResponse,response:e.$magpie.measurements.response,actual_cause:e.actual_cause,effect_valence:e.effect_valence,mechanism:e.mechanism}}})],1)],1)]})),n("InstructionScreen",{attrs:{title:"Further Instructions"}},[e._v(" There are two religions on the island. In religion 1, the color Red is thought to be impure---for example, believers in Religion 1 avoid wearing red clothes. So when they use the marble machine, they think `Red marbles should not be released’. "),n("br"),n("br"),e._v(" In religion 2, the color Blue is thought to be sinful---for example, believers in Religion 2 avoid using blue paint in their artwork. So when they use the marble machine, they think `Blue marbles should not be released’. "),n("br"),n("br"),n("p",[n("img",{attrs:{src:"images/color-preferences.png"}})]),e._v(" Of course, the users of the marble machine cannot control which marbles will come out. So, red and blue marbles are equally likely to be released, no matter who presses the Start button. Everyone on the island knows how the marble machine works. Even people of different religions completely agree with each other about how the machine works. ")]),n("Screen",{attrs:{title:"Comprehension Test"}},[n("Slide",[e._v(" Please answer the following comprehension question: "),n("p",[n("strong",[e._v(" On the island, who knows how the machine works? ")])]),n("p"),n("ForcedChoiceInput",{attrs:{response:e.$magpie.measurements.response,options:["Everyone","Followers of Religion 1","Followers of Religion 2"]},on:{"update:response":[function(n){return e.$set(e.$magpie.measurements,"response",n)},function(n){return e.$magpie.saveAndNextScreen()}]}}),n("Record",{attrs:{data:{trialType:"comprehension-2",trialNr:1,correctResponse:"Everyone",response:e.$magpie.measurements.response,actual_cause:e.actual_cause,effect_valence:e.effect_valence,mechanism:e.mechanism}}})],1)],1),n("Screen",{attrs:{title:"Comprehension Test"}},[n("Slide",[e._v(" Please answer the following comprehension question: "),n("p",[n("strong",[e._v(" When you activate the machine, you can control which colors get released. ")])]),n("p"),n("ForcedChoiceInput",{attrs:{response:e.$magpie.measurements.response,options:["TRUE","FALSE"]},on:{"update:response":[function(n){return e.$set(e.$magpie.measurements,"response",n)},function(n){return e.$magpie.saveAndNextScreen()}]}}),n("Record",{attrs:{data:{trialType:"comprehension-2",trialNr:2,correctResponse:"FALSE",response:e.$magpie.measurements.response,actual_cause:e.actual_cause,effect_valence:e.effect_valence,mechanism:e.mechanism}}})],1)],1),n("Screen",[n("Slide",[n("p",[e._v(" You see an islander press the Start button to activate the machine. So, one marble is randomly released from each compartment at the same time. The marble released from the left compartment is red, and the marble released from the right compartment is blue. Because "+e._s("conjunctive"==e.mechanism?"both a blue and a red marble have been released":"at least a red marble or a blue marble has been released")+", the machine emits sound A, "+e._s("neutral"==e.effect_valence?"a simple tone":"pleasant"==e.effect_valence?"a very pleasant melody":"a distressing, screeching noise")+". ")]),n("p",[n("img",{attrs:{src:e.final_outcome_picture}})]),n("p",[e._v(" The islander says: `"),n("strong",[e._v("The machine emitted sound A because a "+e._s("red"==e.actual_cause?"red":"blue")+" marble was released")]),e._v("’. ")]),n("p",[e._v(" Given what he said, which religion does the islander belong to? In other words, do you think it is more likely that the islander thinks that red marbles or blue marbles shouldn’t be released? "),n("br")]),n("RatingInput",{attrs:{left:"red marbles should not be released",right:"blue marbles should not be released",response:e.$magpie.measurements.response},on:{"update:response":function(n){return e.$set(e.$magpie.measurements,"response",n)}}}),n("span",{staticStyle:{color:"gray"}},[e._v("choices of 1 and 7 express relative confidence for one of the options")]),n("br"),n("span",{staticStyle:{color:"gray"}},[e._v("choice of 4 expresses total uncertainty")]),e.$magpie.measurements.response>0?n("p",[n("button",{on:{click:function(n){return e.$magpie.saveAndNextScreen()}}},[e._v("Submit")])]):e._e(),n("Record",{attrs:{data:{trialType:"critical",trialNr:1,actual_cause:e.actual_cause,effect_valence:e.effect_valence,mechanism:e.mechanism}}})],1)],1),n("PostTestScreen"),n("SubmitResultsScreen")],2)},c=[],l=t(2543),u=t.n(l),m=t(7495),h=t.n(m);const p=u().shuffle(["conjunctive","disjunctive"])[0],d=u().shuffle(["pleasant","neutral","unpleasant"])[0],f=u().shuffle(["red","blue"])[0],b="images/outcomes-"+p+"-"+d+".png",g="images/final-outcome-"+p+"-"+d+".png",v=u().filter(h(),(function(e){return e.mechanism==p}));var _={name:"App",data(){return{mechanism:p,effect_valence:d,actual_cause:f,outcomes_picture:b,final_outcome_picture:g,comprehension_trials:v}},computed:{_(){return u()}}},y=_,w=t(1656),S=(0,w.A)(y,i,c,!1,null,null,null),k=S.exports,R={experimentId:"21",serverUrl:"https://magpie-cogsciprag.fly.dev//",socketUrl:"wss://magpie-cogsciprag.fly.dev//socket",completionUrl:"https://app.prolific.com/submissions/complete?cc=C16QRRN4",contactEmail:"michael.franke@uni-tuebingen.de",mode:"prolific",language:"en"};r["default"].config.productionTip=!1,r["default"].use(a(),{prefix:"Canvas"}),r["default"].use(s.Ay,R),new r["default"]({render:e=>e(k)}).$mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,a){if(!r){var s=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var i=!0,c=0;c<r.length;c++)(!1&a||s>=a)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(i=!1,a<s&&(s=a));if(i){e.splice(u--,1);var l=o();void 0!==l&&(n=l)}}return n}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+".ec92c017.js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="magpie3-inferences-from-causal-attribution:";t.l=function(r,o,a,s){if(e[r])e[r].push(o);else{var i,c;if(void 0!==a)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var m=l[u];if(m.getAttribute("src")==r||m.getAttribute("data-webpack")==n+a){i=m;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,t.nc&&i.setAttribute("nonce",t.nc),i.setAttribute("data-webpack",n+a),i.src=r),e[r]=[o];var h=function(n,t){i.onerror=i.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){t.p="/magpie3-inferences-from-causal-attribution/"}(),function(){var e={524:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=a);var s=t.p+t.u(n),i=new Error,c=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;i.message="Loading chunk "+n+" failed.\n("+a+": "+s+")",i.name="ChunkLoadError",i.type=a,i.request=s,o[1](i)}};t.l(s,c,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,a,s=r[0],i=r[1],c=r[2],l=0;if(s.some((function(n){return 0!==e[n]}))){for(o in i)t.o(i,o)&&(t.m[o]=i[o]);if(c)var u=c(t)}for(n&&n(r);l<s.length;l++)a=s[l],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(u)},r=self["webpackChunkmagpie3_inferences_from_causal_attribution"]=self["webpackChunkmagpie3_inferences_from_causal_attribution"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[504],(function(){return t(2e3)}));r=t.O(r)})();
//# sourceMappingURL=app.166b00e5.js.map