export const JOURNAL_PROMPTS: string[] = [
  'What is one small thing that went well today?',
  'Name one feeling you noticed today, without judging it.',
  'What is the simplest next step you can take tomorrow?',
  'What have you been postponing and why?',
  'When did you feel most present today?',
  'What is one thing you would like to let go of this week?',
  'What are three things you are quietly grateful for?',
  'Describe a recent moment where you felt calm. What was around you?',
  'If today had a color, what would it be and why?',
  'What would be a kinder way to speak to yourself tomorrow?',
  'What is taking more energy than it gives back?',
  'What does enough look like for you right now?',
  'Name one thing you did well — even something small.',
  'What emotion do you want to invite in more often?',
  'What have you learned about yourself this week?',
  'Where in your day would a pause help most?',
  'What story are you telling yourself that may not be true?',
  'What is one thing you can simplify this week?',
  'Who or what lifted your mood today?',
  'If you had a free hour tomorrow, how would you spend it?',
];

export const getPromptForToday = (): string => {
  const today = new Date();
  const idx =
    (today.getFullYear() * 365 + today.getMonth() * 31 + today.getDate()) %
    JOURNAL_PROMPTS.length;
  return JOURNAL_PROMPTS[idx];
};
