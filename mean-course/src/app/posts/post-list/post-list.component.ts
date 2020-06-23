import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'First post', content: 'This is the first post content'},
  //   {title: 'Second post', content: 'This is the second post content'},
  //   {title: 'Third post', content: 'This is the third post content'},
  // ];
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
