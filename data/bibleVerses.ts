export interface BibleVerse {
  reference: string;
  text: string;
  theme?: string;
}

// Sample Bible verses for kids/families
export const bibleVerses: BibleVerse[] = [
  {
    reference: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    theme: "courage"
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
    theme: "strength"
  },
  {
    reference: "Psalm 56:3",
    text: "When I am afraid, I put my trust in you.",
    theme: "trust"
  },
  {
    reference: "Psalm 119:105",
    text: "Your word is a lamp for my feet, a light on my path.",
    theme: "guidance"
  },
  {
    reference: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    theme: "purpose"
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    theme: "guidance"
  },
  {
    reference: "1 John 4:19",
    text: "We love because he first loved us.",
    theme: "love"
  },
  {
    reference: "Matthew 28:20",
    text: "And surely I am with you always, to the very end of the age.",
    theme: "presence"
  },
  {
    reference: "1 Corinthians 16:13-14",
    text: "Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love.",
    theme: "courage"
  },
  {
    reference: "Isaiah 41:10",
    text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    theme: "strength"
  }
];

export const getRandomVerse = (): BibleVerse => {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomIndex];
};

export const getDailyVerse = (): BibleVerse => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const verseIndex = dayOfYear % bibleVerses.length;
  return bibleVerses[verseIndex];
};