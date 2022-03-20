import jsonObject from './data/data.json';
export interface Data {
  currentUser: User;
  comments: Comment[];
}
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: Replies[];
}
type Replies = Comment & { replyingTo: string };
export interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
export class StorageService {
  constructor() {
    if (!localStorage.getItem('data')) {
      localStorage.setItem('data', JSON.stringify(jsonObject));
    }
  }
  setNewData(data: Data) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  getData() {
    return JSON.parse(localStorage.getItem('data') || '{}');
  }
}
