# Cavaleiros da Bíblia - Quiz Game

Um jogo educativo de quiz bíblico desenvolvido com React Native e Expo, inspirado no estilo do Duolingo.

## Características

- Interface moderna e intuitiva
- Múltiplas categorias de perguntas bíblicas
- Diferentes níveis de dificuldade
- Sistema de pontuação e vidas
- Barra de progresso
- Feedback visual imediato
- Animações suaves
- Efeitos sonoros
- Sistema de conquistas
- Timer opcional por questão

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Expo AV (para efeitos sonoros)
- React Navigation
- NativeWind (para estilização)

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/cavaleiros-da-biblia.git
cd cavaleiros-da-biblia
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o projeto:

```bash
npm start
# ou
yarn start
```

4. Escaneie o QR code com o aplicativo Expo Go no seu dispositivo móvel ou pressione 'a' para abrir no emulador Android, 'i' para iOS.

## Estrutura do Projeto

```
cavaleiros-da-biblia/
├── app/
│   └── (tabs)/
│       └── quiz.tsx
├── components/
│   ├── QuizGame.tsx
│   ├── QuizCategorySelection.tsx
│   ├── QuizDifficultySelection.tsx
│   ├── QuizGameOver.tsx
│   ├── QuizAchievements.tsx
│   ├── QuizTimer.tsx
│   └── SoundManager.tsx
├── data/
│   └── quizQuestions.ts
├── types/
│   └── quiz.ts
├── assets/
│   └── sounds/
└── package.json
```

## Componentes Principais

- `QuizGame`: Componente principal do jogo
- `QuizCategorySelection`: Seleção de categorias
- `QuizDifficultySelection`: Seleção de dificuldade
- `QuizGameOver`: Tela de fim de jogo
- `QuizAchievements`: Sistema de conquistas
- `QuizTimer`: Timer para questões
- `SoundManager`: Gerenciador de efeitos sonoros

## Adicionando Novas Perguntas

Para adicionar novas perguntas, edite o arquivo `data/quizQuestions.ts`. Cada pergunta deve seguir a estrutura:

```typescript
{
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  bibleReference: string;
  explanation: string;
}
```

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

Seu Nome - [@seu-twitter](https://twitter.com/seu-twitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/cavaleiros-da-biblia](https://github.com/seu-usuario/cavaleiros-da-biblia)
