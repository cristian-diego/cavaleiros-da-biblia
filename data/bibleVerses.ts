export interface BibleVerse {
  reference: string;
  text: string;
  theme?: string;
}

// Sample Bible verses for kids/families
export const bibleVerses: BibleVerse[] = [
  {
    reference: 'Josué 1:9',
    text: 'Seja forte e corajoso! Não se apavore, nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.',
    theme: 'coragem',
  },
  {
    reference: 'Filipenses 4:13',
    text: 'Tudo posso naquele que me fortalece.',
    theme: 'força',
  },
  {
    reference: 'Salmos 56:3',
    text: 'Quando estou com medo, confio em ti.',
    theme: 'confiança',
  },
  {
    reference: 'Salmos 119:105',
    text: 'A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.',
    theme: 'orientação',
  },
  {
    reference: 'Romanos 8:28',
    text: 'Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito.',
    theme: 'propósito',
  },
  {
    reference: 'Provérbios 3:5-6',
    text: 'Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.',
    theme: 'orientação',
  },
  {
    reference: '1 João 4:19',
    text: 'Nós amamos porque ele nos amou primeiro.',
    theme: 'amor',
  },
  {
    reference: 'Mateus 28:20',
    text: 'E eu estarei sempre com vocês, até o fim dos tempos.',
    theme: 'presença',
  },
  {
    reference: '1 Coríntios 16:13-14',
    text: 'Estejam vigilantes, mantenham-se firmes na fé, sejam homens de coragem, sejam fortes. Façam tudo com amor.',
    theme: 'coragem',
  },
  {
    reference: 'Isaías 41:10',
    text: 'Não tenha medo, pois estou com você; não se desespere, pois eu sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa.',
    theme: 'força',
  },
];

export const getRandomVerse = (): BibleVerse => {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  return bibleVerses[randomIndex];
};

export const getDailyVerse = (): BibleVerse => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const verseIndex = dayOfYear % bibleVerses.length;
  return bibleVerses[verseIndex];
};
