import {Component, Input} from '@angular/core';
import {Post} from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  @Input()
  posts: Post[] = [
    // {title: 'first post', content: 'first post content'},
    // {title: 'second post', content: 'second post content'},
    // {title: 'third post', content: 'third post content'}
  ];
}
