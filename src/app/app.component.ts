import { Component } from '@angular/core';
import {Post} from './posts/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'do-you-MEAN-it';
  storedPosts: Post[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
