// User types
export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  attributes: UserAttributes;
  createdAt: string;
  updatedAt: string;
}

export interface UserAttributes {
  faith: number;
  boldness: number;
  wisdom: number;
}

// Mission types
export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  xpReward: number;
  attribute: keyof UserAttributes;
}

// Avatar types
export interface Avatar {
  id: string;
  image: string;
  name: string;
}