import {Post} from './post';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();
  private url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>(this.url)
      .subscribe((postsData) => {
        this.posts = postsData.posts;
        this.postsUpdate.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.http.post<{ message: string }>(this.url, post).subscribe(responseData => {
      console.log(responseData.message);
      this.posts.push({id: null, title, content});
      this.postsUpdate.next([...this.posts]);
    });
  }
}
