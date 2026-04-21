export type TestQuestion = {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C'; text: string }[];
};

export const testQuestions: TestQuestion[] = [
  { id: 1, question: 'When a new task comes up, you:', options: [
    { key: 'A', text: 'start acting immediately' },
    { key: 'B', text: 'think a little and then start' },
    { key: 'C', text: 'postpone it for later' },
  ]},
  { id: 2, question: 'How do you react to complexity:', options: [
    { key: 'A', text: 'perceive it as a challenge' },
    { key: 'B', text: 'depends on your mood' },
    { key: 'C', text: 'try to avoid' },
  ]},
  { id: 3, question: 'When you doubt:', options: [
    { key: 'A', text: 'move anyway' },
    { key: 'B', text: 'look for more information' },
    { key: 'C', text: 'stop' },
  ]},
  { id: 4, question: 'Your attitude towards mistakes:', options: [
    { key: 'A', text: 'it is part of the process' },
    { key: 'B', text: 'unpleasant, but normal' },
    { key: 'C', text: 'try to avoid them' },
  ]},
  { id: 5, question: 'You more often:', options: [
    { key: 'A', text: 'act' },
    { key: 'B', text: 'analyze' },
    { key: 'C', text: 'postpone' },
  ]},
  { id: 6, question: 'When there is no motivation:', options: [
    { key: 'A', text: 'do it anyway' },
    { key: 'B', text: 'do it partially' },
    { key: 'C', text: 'do nothing' },
  ]},
  { id: 7, question: 'Do you trust your decisions:', options: [
    { key: 'A', text: 'yes' },
    { key: 'B', text: 'sometimes' },
    { key: 'C', text: 'rarely' },
  ]},
  { id: 8, question: 'Your pace of life:', options: [
    { key: 'A', text: 'stable' },
    { key: 'B', text: 'unstable' },
    { key: 'C', text: 'chaotic' },
  ]},
  { id: 9, question: 'How do you deal with change:', options: [
    { key: 'A', text: 'accept' },
    { key: 'B', text: 'get used to it over time' },
    { key: 'C', text: 'avoid' },
  ]},
  { id: 10, question: "When something doesn't work out:", options: [
    { key: 'A', text: 'try again' },
    { key: 'B', text: 'take a break' },
    { key: 'C', text: 'quit' },
  ]},
  { id: 11, question: 'You often feel:', options: [
    { key: 'A', text: 'control' },
    { key: 'B', text: 'hesitation' },
    { key: 'C', text: 'confusion' },
  ]},
  { id: 12, question: 'When there is a choice:', options: [
    { key: 'A', text: 'make decisions quickly' },
    { key: 'B', text: 'think for a long time' },
    { key: 'C', text: 'postpone' },
  ]},
  { id: 13, question: 'Do you know how to rest:', options: [
    { key: 'A', text: 'yes' },
    { key: 'B', text: 'not always' },
    { key: 'C', text: 'almost never' },
  ]},
  { id: 14, question: 'Which is closer to you:', options: [
    { key: 'A', text: 'action' },
    { key: 'B', text: 'balance' },
    { key: 'C', text: 'peace without action' },
  ]},
  { id: 15, question: 'When you are tired:', options: [
    { key: 'A', text: 'recover and move on' },
    { key: 'B', text: 'take a break' },
    { key: 'C', text: 'fall out for a long time' },
  ]},
  { id: 16, question: 'You are more:', options: [
    { key: 'A', text: 'focused' },
    { key: 'B', text: 'sometimes scattered' },
    { key: 'C', text: 'often scattered' },
  ]},
  { id: 17, question: 'How do you feel about the future:', options: [
    { key: 'A', text: 'confidently' },
    { key: 'B', text: 'cautiously' },
    { key: 'C', text: 'anxiously' },
  ]},
  { id: 18, question: 'When there is a chance:', options: [
    { key: 'A', text: 'take advantage' },
    { key: 'B', text: 'think' },
    { key: 'C', text: 'miss' },
  ]},
  { id: 19, question: 'Do you feel your direction:', options: [
    { key: 'A', text: 'clearly' },
    { key: 'B', text: 'roughly' },
    { key: 'C', text: 'not very' },
  ]},
  { id: 20, question: 'You are currently:', options: [
    { key: 'A', text: 'moving forward' },
    { key: 'B', text: 'seeking balance' },
    { key: 'C', text: 'standing still' },
  ]},
];

export const calculateResult = (answers: ('A' | 'B' | 'C')[]): number => {
  let score = 0;
  answers.forEach(a => {
    if (a === 'A') score += 5;
    else if (a === 'B') score += 3;
    else score += 1;
  });
  const max = answers.length * 5;
  return Math.round((score / max) * 100);
};

export const getResultText = (percent: number): string => {
  if (percent >= 70) {
    return "You move confidently and consciously.\nThere is a balance between action, thinking and calm.\nThe main thing is not to lose this rhythm.";
  }
  if (percent >= 45) {
    return "You are in the process of finding balance.\nSome areas need more attention.\nSmall steps will bring clarity.";
  }
  return "It's time to pause and reconsider.\nYou deserve a calmer pace.\nStart with one small change.";
};