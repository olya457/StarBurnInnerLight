export type Story = {
  id: string;
  title: string;
  image: any;
  imageKey: string;
  text: string;
};

export const stories: Story[] = [
  {
    id: 'story_ignis_core',
    title: 'Ignis Core — The Spark That Never Dies',
    image: require('../assets/story_ignis_core.png'),
    imageKey: 'story_ignis_core',
    text: "Once upon a time, deep within the earth, there was a core that had no form, but it had power. It didn't glow constantly — only when a person who doubted himself appeared nearby. This spark felt hesitation, fear, and fatigue. And that's when it began to burn brighter. Not to light the way, but to remind you — the energy was already inside. People who found Ignis Core didn't become stronger instantly. But they started to act. In small steps. Without guarantees. And that was enough to change everything. They say this crystal never goes out — it's just waiting for you to remember that you can start now.",
  },
  {
    id: 'story_violet_mind',
    title: 'Violet Mind — The Silence That Reveals Meaning',
    image: require('../assets/story_violet_mind.png'),
    imageKey: 'story_violet_mind',
    text: "In the old mountains, where the wind sounds like a whisper, a crystal appeared that doesn't give answers. It doesn't tell you what to do. Instead, it removes the noise. People who held the Violet Mind suddenly stopped rushing. Their thoughts no longer ran chaotically. They became clear. And in this silence, answers were born that were always there. Not from outside — from inside. This crystal does not add knowledge. It opens up access to what is already there. And that is why it is called the most honest of all.",
  },
  {
    id: 'story_solar_edge',
    title: 'Solar Edge — The Light That Cuts Doubt',
    image: require('../assets/story_solar_edge.png'),
    imageKey: 'story_solar_edge',
    text: "Solar Edge was formed not from heat, but from a decision. Legend has it that it appeared at the moment when someone first stopped hesitating. Its edges are sharp not physically, but symbolically — they cut off the unnecessary. When a person looks at this crystal, he begins to see more clearly: where is fear, and where is reality. Where is an excuse, and where is a chance. It does not force action, but makes inaction obvious. And after that, the choice becomes simple. Not easy — but simple.",
  },
  {
    id: 'story_verdant_balance',
    title: 'Verdant Balance — Calmness That Is Not Weakness',
    image: require('../assets/story_verdant_balance.png'),
    imageKey: 'story_verdant_balance',
    text: "Verdant Balance was born where nature never rushed. It is not bright, not aggressive and does not require attention. But it is the most stable. People who found this crystal stopped fussing. They did not lose ambition — they simply stopped burning out. The balance it gives is not about doing nothing. It is about doing enough and not breaking yourself. And it is this state that allows you to move longer than any motivation.",
  },
  {
    id: 'story_aqua_silence',
    title: 'Aqua Silence — Depth Without Noise',
    image: require('../assets/story_aqua_silence.png'),
    imageKey: 'story_aqua_silence',
    text: "Aqua Silence was found without looking. It appeared when a person was already tired of constant stress. Its strength is in the calmness that does not depend on circumstances. When you look at it, you seem to be plunging into water, where there are no screams, deadlines and anxiety. There is only you. And in this silence it becomes clear: not everything requires a reaction. Not everything is worth the energy. Sometimes the strongest step is not to move right away. But to wait until it becomes clear where exactly.",
  },
];

export const getStoryImageByKey = (key: string) => {
  const s = stories.find(x => x.imageKey === key);
  return s?.image;
};