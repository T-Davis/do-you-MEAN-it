import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from './post';

@Injectable({providedIn: 'root'})
export class PostsService {
  private post: Post;
  private posts: Post[] = [];
  private postsUpdate = new Subject<Post[]>();
  private url = 'http://localhost:3000/api/posts/';

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts() {
    this.http
      .get<{ message: string, posts: any }>(this.url)
      .pipe(
        map((postData) => {
          return postData.posts.map(post => {
            return {
              id: post._id,
              title: post.title,
              content: post.content
            };
          });
        }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdate.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  getLocalPost(id: string) {
    return this.posts.find(post => (post.id === id));
  }

  getPost(id: string) {
    return this.http
      .get<{ post: any }>(this.url + id)
      .pipe(
        map((postData) => {
          return postData.post.map(post => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
              imagePath: post.imagePath
            };
          });
        }));
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string, post: Post }>(this.url, postData)
      .subscribe(res => {
        const post: Post = {
          id: res.post.id,
          title,
          content,
          imagePath: res.post.imagePath
        };
        this.posts.push(post);
        this.postsUpdate.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    this.http
      .put(this.url + post.id, post)
      .subscribe(() => {
        const postIndex = this.posts.findIndex(p => p.id === post.id);
        this.posts[postIndex] = post;
        this.postsUpdate.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(this.url + postId)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.postsUpdate.next([...this.posts]);
      });
  }
}
