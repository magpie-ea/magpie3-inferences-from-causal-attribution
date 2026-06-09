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
library(knitr)

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

df1 <- as_tibble(read.csv('01-experiments/03-phase-speaker-and-listener-oriented/03-exp-prescrStatisNorm-speakerListener/01 data/results-pilot01.csv'))

df1 <- df1 %>%
  rename(trial_type = trialType) %>%
  rename(trial_nr = trialNr) %>%
  mutate(response = if_else(!is.na(correct_response_bias), correct_response_bias, response)) %>%
  select(-correct_response_bias) %>%
  select(where(~!all(is.na(.)))) %>%
  mutate(correct = ifelse(is.na(correct_response), TRUE, correct_response == response))

getComprehensionPass <- function(id) {
  participant <- df1 %>% filter(prolific_pid == id)

  comp1 <- participant %>%
    filter(trial_type %in% c("comprehension-1-1", "comprehension-1-2")) %>%
    group_by(trial_type) %>%
    summarise(all_correct = all(correct), .groups = "drop") %>%
    arrange(trial_type) %>%
    pull(all_correct)

  comp2 <- participant %>%
    filter(trial_type == 'comprehension-2') %>%
    summarise(all_correct = all(correct), .groups = "drop") %>%
    pull(all_correct)

  comp3 <- participant %>%
    filter(trial_type == 'comprehension-3') %>%
    summarise(all_correct = all(correct), .groups = "drop") %>%
    pull(all_correct)

  return(c(
    comp1_1Correct = comp1[1],
    comp1_2Correct = comp1[2],
    comp2Correct = comp2,
    comp3Correct = comp3,
    compCorrect = (comp1[1] || comp1[2]) && comp2 && comp3
  ))
}

correct_df <- map_dfr(df1$prolific_pid, getComprehensionPass)
df1 <- bind_cols(df1, correct_df)


# How many participants failed the first round of comprehension 1?
df1 %>%
  filter(!comp1_1Correct) %>%
  distinct(prolific_pid) %>%
  nrow()
# How many participants failed the second round of comprehension 1?
df1 %>%
  filter(!comp1_2Correct) %>%
  distinct(prolific_pid) %>%
  nrow()
# How many participants failed comprehension 2?
df1 %>%
  filter(!comp2Correct) %>%
  distinct(prolific_pid) %>%
  nrow()
# How many participants failed comprehension 3?
df1 %>%
  filter(!comp3Correct) %>%
  distinct(prolific_pid) %>%
  nrow()

# remove participants who failed the comprehension checks
df <- df1 %>%
  filter(compCorrect)

df1 %>%
  select(prolific_pid, comp1_1Correct, comp1_2Correct, comp2Correct, comp3Correct, compCorrect) %>%
  group_by(prolific_pid) %>%
  summarise(across(everything(), first)) %>%
  select(-prolific_pid) %>%
  mutate(participantID = row_number(), .before = 1) %>%
  kable(format = 'markdown')


# final sample size
df %>%
  distinct(prolific_pid) %>%
  nrow()

df_speaker <- df %>%
  filter(trial_type == 'critical-speaker') %>%
  select(where(~!all(is.na(.))))

df_speaker_key_trials <- df_speaker %>%
  filter(left_marble == 'blue' & right_marble == 'red')

df_speaker_key_trials <- df_speaker_key_trials %>%
  pivot_longer(
    cols = c(response_relig_1_left, response_relig_1_right, response_relig_2_left, response_relig_2_right),
    names_to = 'response_map',
    values_to = 'speaker_likelihood'
  ) %>%
  mutate(presc_normality = ifelse(response_map == "response_relig_1_left" | response_map == "response_relig_2_right", 'normal', 'abnormal')) %>%
  mutate(
    stat_normality = case_when(
      stat_norm == "blue" & grepl("left", response_map, ignore.case = TRUE) ~ "normal",
      stat_norm == "red" & grepl("right", response_map, ignore.case = TRUE) ~ "normal",
      TRUE ~ "abnormal")
  ) %>%
  mutate(religion = ifelse(grepl('relig_1', response_map), 'Rel 1 (red bad)', 'Rel 2 (blue bad)')) %>%
  mutate(cause = ifelse(grepl('left', response_map), 'blue', 'red'))

df_listener <- df %>%
  filter(trial_type == 'critical-listener') %>%
  select(where(~!all(is.na(.))))

df_listener_key_trials <- df_listener %>%
  filter(left_marble == 'blue' & right_marble == 'red') %>%
  mutate(response = ifelse(actual_outcome == 'right', 8 - as.numeric(response_relig_unk),
                           as.numeric(response_relig_unk))) %>%
  mutate(
    stat_normality = case_when(
      stat_norm == "blue" & actual_outcome == 'left' ~ "normal",
      stat_norm == "red" & actual_outcome == 'right' ~ "normal",
      TRUE ~ "abnormal")
  )

df_speaker_key_trials %>%
  count(mechanism, effect_valence, presc_normality, stat_normality) %>%
  kable(format = 'markdown')

df_listener_key_trials %>%
  count(mechanism, effect_valence, stat_normality) %>%
  kable(format = 'markdown')


# effect_valence, mechanism, presc_normality, stat_normality -> speaker_likelihood
dodgewidth <- .3


plot_speaker <- function(speaker_trials) {
  plot <- speaker_trials %>%
    ggplot(aes(x = presc_normality, y = speaker_likelihood, color = stat_normality, shape = stat_normality)) +
    facet_grid(mechanism ~ factor(effect_valence, levels = c('pleasant', 'neutral', 'unpleasant'))) +
    stat_summary(fun = 'mean', position = position_dodge(width = dodgewidth)) +
    stat_summary(fun = 'mean', geom = 'line', aes(group = stat_normality),
                 position = position_dodge(width = dodgewidth)) +
    stat_summary(fun.data = 'mean_se', position = position_dodge(width = dodgewidth)) +
    geom_jitter(aes(color = stat_normality, shape = stat_normality), position = position_jitterdodge(jitter.width = 0.05, jitter.height = .2, dodge.width = dodgewidth), alpha = .4, size = 2) +
    scale_y_continuous(breaks = 1:7) +
    coord_cartesian(ylim = c(1, 7)) +
    labs(x = 'Prescriptive normality', y = 'Assigned likelihood that the speaker would say this') +
    geom_hline(aes(yintercept = 4), linetype = 'dashed') +
    theme_classic()
  return(plot)
}

exp3_speaker <- plot_speaker(df_speaker_key_trials)
exp3_speaker
# ggsave("01-experiments/03-phase-speaker-and-listener-oriented/images/exp3_speaker.png", plot = exp3_speaker, width = 6, height = 6, dpi = 150)


plot_listener <- function(listener_trials) {
  plot <- listener_trials %>%
    ggplot(aes(x = mechanism, response, color = stat_normality, shape = stat_normality)) +
    facet_grid(~factor(effect_valence, levels = c('pleasant', 'neutral', 'unpleasant'))) +
    stat_summary(fun = 'mean', position = position_dodge(width = dodgewidth)) +
    stat_summary(fun = 'mean', geom = 'line', aes(group = stat_normality),
                 position = position_dodge(width = dodgewidth)) +
    stat_summary(fun.data = 'mean_se', position = position_dodge(width = dodgewidth)) +
    geom_jitter(aes(color = stat_normality), position = position_jitterdodge(jitter.width = 0.05, jitter.height = .2, dodge.width = dodgewidth), alpha = .4) +
    scale_y_continuous(breaks = 1:7) +
    coord_cartesian(ylim = c(1, 7)) +
    labs(x = 'Prescriptive normality', y = 'Inference that cause is (prescriptive) norm-violating') +
    geom_hline(aes(yintercept = 4), linetype = 'dashed') +
    theme_classic()
  return(plot)
}

exp3_listener <- plot_listener(df_listener_key_trials)
exp3_listener
# ggsave("01-experiments/03-phase-speaker-and-listener-oriented/images/exp3_listener.png", plot = exp3_listener, width = 6, height = 6, dpi = 150)

# Generate predictions
get_speaker_samples <- function(presc_normality, stat_normality, mechanism, valence, mean, sd, size = 50) {
  scale <- 1:7
  probs <- dnorm(scale, mean = mean, sd = sd)
  probs <- probs / sum(probs)
  df <- data.frame(
    speaker_likelihood = sample(scale, size = size, replace = TRUE, prob = probs),
    presc_normality = rep(presc_normality, size),
    stat_normality = rep(stat_normality, size),
    effect_valence = rep(valence, size),
    mechanism = rep(mechanism, size)
  )
  return(df)
}


get_listener_samples <- function(stat_normality, mechanism, valence, mean, sd, size = 50) {
  scale <- 1:7
  probs <- dnorm(scale, mean = mean, sd = sd)
  probs <- probs / sum(probs)
  df <- data.frame(
    response = sample(scale, size = size, replace = TRUE, prob = probs),
    effect_valence = rep(valence, size),
    stat_normality = rep(stat_normality, size),
    mechanism = rep(mechanism, size)
  )
  return(df)
}

set.seed(864529)

speaker_conditions <- read.csv('01-experiments/03-phase-speaker-and-listener-oriented/03-exp-prescrStatisNorm-speakerListener/02 analysis/speaker_conditions_pilot01.csv', stringsAsFactors = FALSE)
listener_conditions <- read.csv('01-experiments/03-phase-speaker-and-listener-oriented/03-exp-prescrStatisNorm-speakerListener/02 analysis/listener_conditions_pilot01.csv', stringsAsFactors = FALSE)


df_speaker_hypo_trials <- do.call(rbind, apply(speaker_conditions, 1, function(row) {
  get_speaker_samples(row["presc_normality"], row["stat_normality"], row["mechanism"], row["valence"], as.numeric(row["mean"]), as.numeric(row["sd"]))
}))
plot_speaker(df_speaker_hypo_trials)
ggsave("01-experiments/03-phase-speaker-and-listener-oriented/images/exp3_hypo_speaker.png", plot = plot_speaker(df_speaker_hypo_trials), width = 6, height = 6, dpi = 300)

df_listener_hypo_trials <- do.call(rbind, apply(listener_conditions, 1, function(row) {
  get_listener_samples(row["stat_normality"], row["mechanism"], row["valence"], as.numeric(row["mean"]), as.numeric(row["sd"]))
}))
plot_listener(df_listener_hypo_trials)
ggsave("01-experiments/03-phase-speaker-and-listener-oriented/images/exp3_hypo_listener.png", plot = plot_listener(df_listener_hypo_trials), width = 6, height = 6, dpi = 300)

per_speaker <- df_speaker_key_trials %>%
  ggplot(aes(x = religion, y = speaker_likelihood, color = cause, shape = interaction(stat_normality,mechanism, effect_valence))) +
  geom_jitter(size = 3, width = 0.2, height = 0.2)+
  scale_y_continuous(breaks = 1:7) +
  coord_cartesian(ylim = c(1, 7)) +
  geom_hline(aes(yintercept = 4), linetype = 'dashed') +
  facet_wrap(~prolific_pid) +
  theme_classic()
per_speaker
ggsave("01-experiments/03-phase-speaker-and-listener-oriented/images/exp3_per_speaker.png", plot = per_speaker, width = 10, height = 10, dpi = 300)
