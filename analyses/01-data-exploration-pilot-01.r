# load packages
library(tidyverse)
library(ggbeeswarm)
library(brms)
library(tidyboot)
library(tidyjson)
library(tidybayes)
library(patchwork)
library(GGally)
library(cowplot)
library(BayesFactor)
library(aida)   # custom helpers: https://github.com/michael-franke/aida-package
library(faintr) # custom helpers: https://michael-franke.github.io/faintr/index.html
library(cspplot)

##################################################

# these options help Stan run faster
options(mc.cores = parallel::detectCores(),
        brms.backend = "cmdstanr")

# use the CSP-theme for plotting
theme_set(theme_csp())

# global color scheme from CSP
project_colors = cspplot::list_colors() |> pull(hex)

# setting theme colors globally
scale_colour_discrete <- function(...) {
  scale_colour_manual(..., values = project_colors)
}
scale_fill_discrete <- function(...) {
  scale_fill_manual(..., values = project_colors)
}

##################################################



# import data
d <- read.csv('../data/01-pilot/01-data-raw-pilot-01.csv')

# identify if response is correct (for comprehension questions)
d <- d %>% mutate(correct = 
                  ifelse(is.na(correctResponse), 1,
                         correctResponse==response))

# identify participants failing comprehension question(s)
getCorrectness <- function(id){
  g <- d %>% filter(prolific_pid==id)
  if(sum(g$correct)==nrow(g)){return(1)}
  else{return(0)}
  
}

d <- d %>% mutate(participantCorrect = unlist(
  pmap(
    list(prolific_pid),
    getCorrectness
  )
))

# remove bad participants
d <- d %>% filter(participantCorrect==1)
# n for final sample
length(unique(d$prolific_pid))

# focus on critical trials, recode response variable
d2 <- d %>%  filter() %>%
  filter(trialType=='critical') %>% 
  mutate(response=ifelse(actual_cause=='red', 8-as.numeric(response),
                                  as.numeric(response)))
# figure
d2 %>% 
  ggplot(aes(x=mechanism, y=response, color=effect_valence))+
  stat_summary(fun='mean')+
  stat_summary(fun='mean', geom='line', aes(group=effect_valence))+
  stat_summary(fun.data='mean_se')+
  scale_color_manual(values=c('blue', 'darkgreen', 'red'))+
  scale_y_continuous(breaks=1:7)+
  coord_cartesian(ylim=c(1,7))+
  geom_hline(aes(yintercept=4), linetype='dashed')+
  theme_classic()

# t-test in the neutral condition
dneutral <- d2 %>% filter(effect_valence=='neutral')
t.test(response~mechanism, data=dneutral)

# "omnibus" regression model:
fit <- brms::brm(response ~ mechanism * effect_valence,
                 data=d2 |> mutate(response = factor(response, ordered=T)),
                 family=brms::cumulative("logit"),
                 iter=4000, warmup=2000)

# some tests

## unpleasant > neutral? (yes)
faintr::compare_groups(
  fit, 
  higher = effect_valence == 'unpleasant', 
  lower = effect_valence == 'neutral')

## neutral > pleasant? (yes)
faintr::compare_groups(
  fit, 
  higher = effect_valence == 'neutral', 
  lower = effect_valence == 'pleasant')

## disjunctive vs conjunctive for each level of effect_valence

### pleasant (no effect)
faintr::compare_groups(
  fit, 
  higher = effect_valence == 'pleasant' & mechanism == 'conjunctive',
  lower  = effect_valence == 'pleasant' & mechanism == 'disjunctive' 
)

### neutral (no effect)
faintr::compare_groups(
  fit, 
  higher = effect_valence == 'neutral' & mechanism == 'conjunctive',
  lower = effect_valence == 'neutral' & mechanism == 'disjunctive' 
  )                       

### unpleasant (no effect)
faintr::compare_groups(
  fit, 
  higher = effect_valence == 'unpleasant' & mechanism == 'disjunctive',
  lower  = effect_valence == 'unpleasant' & mechanism == 'conjunctive'
)                       
