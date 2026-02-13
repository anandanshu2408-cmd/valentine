
export interface Question {
  id: number;
  text: string;
}

export enum AppState {
  START = 'START',
  WISH = 'WISH',
  QUIZ = 'QUIZ',
  FINAL = 'FINAL'
}
