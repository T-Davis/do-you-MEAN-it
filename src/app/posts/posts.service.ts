import {Post} from './post';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((postsData) => {
        this.posts = postsData.posts;
        this.postsUpdate.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    this.posts.push({id: null, title, content});
    this.postsUpdate.next([...this.posts]);
  }
}
