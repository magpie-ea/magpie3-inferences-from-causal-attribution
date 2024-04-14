(function(){"use strict";var e={9768:function(e,t,n){var r=n(5471),o=n(4302),a=n.n(o),i=n(6093),s=function(){var e=this,t=e._self._c;return t("Experiment",{attrs:{title:"causal-implicature-variation"}},[t("InstructionScreen",{attrs:{title:"Welcome"}},[e._v(" Hi! Thanks for taking part! "),t("br"),e._v(" This experiment first introduces a background scenario, which we ask you to read carefully. You will be asked to answer basic comprehension questions about the scenario. We then ask you about your interpretation of some utterances of some characters in the story. ")]),t("InstructionScreen",{attrs:{title:"Instructions"}},[t("p",[e._v(" In this experiment, you will play the role of an anthropologist visiting a faraway island. A long time ago, the inhabitants of the island discovered an ancient artifact: the marble machine. Nobody knows where the marble machine comes from, but everybody knows how it works. "),t("br"),e._v(" The compartment on the right of the marble machine contains red and green marbles, and the one on the left contains blue and yellow marbles. When someone presses the ‘Start’ button, one marble is released from each compartment of the machine. On each side, the marble is chosen completely at random. ")]),t("p",[e._v("[Machine picture]")]),e._v(" When the two marbles reach the center, the machine makes a sound. The islanders have discovered a simple rule that always determines the sound that the machine makes: "),t("ul",[t("li",[e._v("When the machine releases "),t("strong",[e._v(e._s("conjunctive"==e.mechanism?"both a red and a blue marble":"either a red or a blue marble"))]),e._v(", the machine makes sound A.")]),t("li",[e._v("Otherwise, the machine makes sound B.")])]),t("strong",[e._v("Sound B is a simple tone, "+e._s("neutral"==e.effect_valence?"and Sound A is also a simple tone":"pleasant"==e.effect_valence?"while Sound A is a very pleasant melody":"while Sound A is a distressing screeching noise"))]),e._v(". ")]),t("InstructionScreen",{attrs:{title:"Comprehension questions"}},[e._v(" FILL ME ")]),t("InstructionScreen",{attrs:{title:"Welcome"}},[e._v(" There are two religions on the island. In religion 1, the color Red is thought to be impure---for example, believers in Religion 1 avoid wearing red clothes. So when they use the marble machine, they think `Red marbles should not be released’. "),t("br"),t("br"),e._v(" In religion 2, the color Blue is thought to be sinful---for example, believers in Religion 2 avoid using blue paint in their artwork. So when they use the marble machine, they think `Blue marbles should not be released’. "),t("br"),t("br"),e._v(" Of course, the users of the marble machine cannot control which marbles will come out. So, red and blue marbles are equally likely to be released, no matter who presses the Start button. Everyone on the island knows how the marble machine works. Even people of different religions completely agree with each other about how the machine works. ")]),t("InstructionScreen",{attrs:{title:"Comprehension questions"}},[e._v(" [Comprehension questions: -On the island, who knows how the machine works? Everyone / only people who believe in Religion 1 / only people who believe in Religion 2 / Noone -When you activate the machine, you can control which colors get released. True / False] ")]),t("Screen",[t("Slide",[t("p",[e._v(" You see an islander press the Start button to activate the machine. So, one marble is randomly released from each compartment at the same time. The marble released from the left compartment is red, and the marble released from the right compartment is blue. Because "+e._s("conjunctive"==e.mechanism?"both a blue and a red marble have been released":"at least a red marble or a blue marble has been released")+", the machine emits sound A, "+e._s("neutral"==e.effect_valence?"a simple tone":"pleasant"==e.effect_valence?"a very pleasant melody":"a distressing, screeching noise")+". ")]),t("p",[e._v("[Machine picture with outcome]")]),t("p",[e._v(" The islander says: `"),t("strong",[e._v("The machine emitted sound A because a "+e._s("red"==e.actual_cause?"red":"blue")+" marble was released")]),e._v("’. ")]),t("p",[e._v(" Given what he said, which religion does the islander belong to? In other words, do you think it is more likely that the islander thinks that red marbles or blue marbles shouldn’t be released? "),t("br")]),t("RatingInput",{attrs:{left:"red balls should not be released",right:"blue balls should not be released",response:e.$magpie.measurements.response},on:{"update:response":function(t){return e.$set(e.$magpie.measurements,"response",t)}}}),t("span",{staticStyle:{color:"gray"}},[e._v("choices of 1 and 7 express relative confidence for one of the options")]),t("br"),t("span",{staticStyle:{color:"gray"}},[e._v("choice of 4 expresses total uncertainty")]),e.$magpie.measurements.response>0?t("p",[t("button",{on:{click:function(t){return e.$magpie.saveAndNextScreen()}}},[e._v("Submit")])]):e._e(),t("Record",{attrs:{data:{actual_cause:e.actual_cause,effect_valence:e.effect_valence,mechanism:e.mechanism}}})],1)],1),t("PostTestScreen"),t("SubmitResultsScreen")],1)},l=[],c=n(2543),u=n.n(c);const h=u().shuffle(["conjunctive","disjunctive"])[0],m=u().shuffle(["pleasant","neutral","unpleasant"])[0],d=u().shuffle(["red","blue"])[0];var f={name:"App",data(){return{mechanism:h,effect_valence:m,actual_cause:d}},computed:{_(){return u()}}},p=f,b=n(1656),v=(0,b.A)(p,s,l,!1,null,null,null),g=v.exports,y={experimentId:"9",serverUrl:"https://magpie-demo.herokuapp.com/",socketUrl:"wss://magpie-demo.herokuapp.com/socket",completionUrl:"https://...",contactEmail:"test@random.com",mode:"debug",language:"en"};r["default"].config.productionTip=!1,r["default"].use(a(),{prefix:"Canvas"}),r["default"].use(i.Ay,y),new r["default"]({render:e=>e(g)}).$mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var s=!0,l=0;l<r.length;l++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[l])}))?r.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+".9d6bf921.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="magpie3-inferences-from-causal-attribution:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var h=c[u];if(h.getAttribute("src")==r||h.getAttribute("data-webpack")==t+a){s=h;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var m=function(t,n){s.onerror=s.onload=null,clearTimeout(d);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},d=setTimeout(m.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=m.bind(null,s.onerror),s.onload=m.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/magpie3-inferences-from-causal-attribution/"}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),s=new Error,l=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};n.l(i,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],s=r[1],l=r[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var u=l(n)}for(t&&t(r);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},r=self["webpackChunkmagpie3_inferences_from_causal_attribution"]=self["webpackChunkmagpie3_inferences_from_causal_attribution"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(9768)}));r=n.O(r)})();
//# sourceMappingURL=app.2315c033.js.map