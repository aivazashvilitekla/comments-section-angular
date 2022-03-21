import { Component } from '@angular/core';
import { Data, StorageService, Comment } from './data.service';
// import jsonObject from './data/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StorageService],
})
export class AppComponent {
  title = 'comments-section';
  constructor(private storageService: StorageService) {}

  emptyValue = false;
  editing = false;

  data: Data = this.storageService.getData();
  startingId = 100;
  newComment!: string;

  com: Comment | undefined;

  addNewComment() {
    this.startingId++;
    if (!this.newComment) {
      this.emptyValue = true;
      return;
    }
    this.data.comments.push({
      id: this.startingId,
      content: this.newComment,
      createdAt: 'now',
      score: 0,
      user: this.data.currentUser,
      replies: [],
    });
    this.newComment = '';
    this.emptyValue = false;
    this.storageService.setNewData(this.data);
  }
  increaseScore({ id, index }: any) {
    if (index === undefined) {
      this.data.comments.map((item) => {
        if (item.id === id) {
          item.score++;
        }
      });
    } else {
      this.data.comments[index].replies?.map((item) => {
        console.log(id);
        if (item.id === id) {
          console.log(item);
          item.score++;
        }
      });
    }
    this.storageService.setNewData(this.data);
  }
  decreaseScore({ id, index }: any) {
    if (index === undefined) {
      this.data.comments.map((item) => {
        if (item.id === id) {
          item.score--;
        }
      });
    } else {
      this.data.comments[index].replies?.map((item) => {
        if (item.id === id) {
          item.score--;
        }
      });
    }
    this.storageService.setNewData(this.data);
  }
  deleteComment({ id, index }: any) {
    if (index === undefined) {
      this.data.comments = this.data.comments.filter((item) => item.id !== id);
    } else {
      this.data.comments[index].replies = this.data.comments[
        index
      ].replies?.filter((item) => item.id !== id);
    }
    this.storageService.setNewData(this.data);
  }
  updateComment({ id, text, index }: any) {
    if (index === undefined) {
      this.data.comments.map((item) => {
        if (item.id === id) {
          item.content = text;
        }
      });
    } else {
      this.data.comments[index].replies?.map((item) => {
        if (item.id === id) {
          item.content = text;
        }
      });
    }
    this.storageService.setNewData(this.data);
  }
  replyComment({ id, text, mainCommentIndex }: any) {
    this.startingId++;
    this.data.comments[mainCommentIndex].replies?.push({
      id: this.startingId,
      content: text,
      createdAt: 'now',
      score: 0,
      user: this.data.currentUser,
      replies: [],
      replyingTo: this.data.comments[mainCommentIndex].user.username,
    });
    this.storageService.setNewData(this.data);
  }
}
