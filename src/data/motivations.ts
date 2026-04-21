export type Motivation = {
  id: string;
  title: string;
  image: any;
  imageKey: string;
  phrases: string[];
};

export const motivations: Motivation[] = [
  {
    id: 'mot_ignis',
    title: 'Ignis Core — energy / action',
    image: require('../assets/motivation_ignis.png'),
    imageKey: 'motivation_ignis',
    phrases: [
      "You don't wait for the moment — you create it.",
      "Even a small movement is already power.",
      "Doubts disappear when you start acting.",
      "Energy comes during movement, not before it.",
      "Not perfect — just start.",
      "You are capable of more than you think right now.",
      "The fire inside is stronger than the fear outside.",
      "The decision to act changes everything.",
      "A step forward is already a victory over standing still.",
      "Don't wait for confidence — it will appear in the process.",
    ],
  },
  {
    id: 'mot_violet',
    title: 'Violet Mind — wisdom / awareness',
    image: require('../assets/motivation_violet.png'),
    imageKey: 'motivation_violet',
    phrases: [
      "Silence is the place where answers appear.",
      "You already know more than you think.",
      "Not all thoughts require attention.",
      "Clarity comes when the noise disappears.",
      "Calmness is also power.",
      "The mind is not in speed, but in depth.",
      "Stop — and you will see more.",
      "Awareness is stronger than momentum.",
      "The right answers don't scream — they are quiet.",
      "Your inner voice is worth trusting.",
    ],
  },
  {
    id: 'mot_solar',
    title: 'Solar Edge — clarity / decision',
    image: require('../assets/motivation_solar.png'),
    imageKey: 'motivation_solar',
    phrases: [
      "The clearer you see — the easier it is to choose.",
      "The choice becomes simple when you are honest with yourself.",
      "Not everything complicated is important.",
      "A decision is an action, not a thought.",
      "When you have decided — half the way is covered.",
      "Doubt is simply a lack of clarity.",
      "Clarity saves energy.",
      "You already know what to do — just admit it.",
      "Throw away the unnecessary — the main thing remains.",
      "The direct path is always shorter than the roundabout one.",
    ],
  },
  {
    id: 'mot_verdant',
    title: 'Verdant Balance — balance / stability',
    image: require('../assets/motivation_verdant.png'),
    imageKey: 'motivation_verdant',
    phrases: [
      "You are not a machine — rest is part of strength.",
      "Balance is not standing still, but moving evenly.",
      "Calm does not mean weakness.",
      "The pace should be yours, not someone else's.",
      "You have the right to take your time.",
      "Stability is built from simple actions.",
      "Not everything is needed now.",
      "Balance gives a long distance.",
      "When you are in balance, everything works better.",
      "Strength is holding yourself back, not rushing.",
    ],
  },
  {
    id: 'mot_aqua',
    title: 'Aqua Silence — calm / inner peace',
    image: require('../assets/motivation_aqua.png'),
    imageKey: 'motivation_aqua',
    phrases: [
      "Not everything requires a reaction.",
      "Calm is control, not the absence of emotions.",
      "Silence heals better than noise.",
      "You can just be — and that is enough.",
      "Let go of what is not worth your energy.",
      "The depth does not scream — it is felt.",
      "Now — it is already okay.",
      "Breathe — and it will become easier.",
      "Not all battles need to be won.",
      "Your calm is your strength.",
    ],
  },
];

export const getMotivationImageByKey = (key: string) => {
  const m = motivations.find(x => x.imageKey === key);
  return m?.image;
};