import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, User } from '../data.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() mainCommentIndex!: number;
  @Input() currentUser!: User;
  @Output() plus: EventEmitter<{ id: number; index?: number }> =
    new EventEmitter();
  @Output() minus: EventEmitter<{ id: number; index?: number }> =
    new EventEmitter();
  @Output() delete: EventEmitter<{ id: number; index?: number }> =
    new EventEmitter();
  @Output() update: EventEmitter<{ id: number; index?: number; text: string }> =
    new EventEmitter();
  @Output() reply: EventEmitter<{
    id: number;
    text: string;
    mainCommentIndex: number;
  }> = new EventEmitter();

  editing = false;
  replying = false;
  replyId = 0;
  ind = 0;
  updatedComment!: string;
  constructor() {}

  ngOnInit(): void {}

  editComment(id?: number, index?: number) {
    this.editing = true;
    if (id && index) {
      this.replyId = id;
      this.ind = index;
    }
  }
  closeEditing() {
    this.editing = false;
  }
  replyComment() {
    this.replying = true;
  }
  increaseScoreHandler(id: number, index?: number) {
    this.plus.emit({ id, index });
  }
  decreaseScoreHandler(id: number, index?: number) {
    this.minus.emit({ id, index });
  }
  deleteCommentHandler(id: number, index?: number) {
    this.delete.emit({ id, index });
  }
  updateCommentHandler(id: number, text: string, index?: number) {
    if (!text) {
      alert('Please fill out input field.');
    } else {
      this.editing = false;
      this.update.emit({ id, text, index });
    }
  }
  addNewReplyHandler(id: number, text: string, mainCommentIndex: number) {
    this.reply.emit({ id, text, mainCommentIndex });
    this.replying = false;
  }
}
