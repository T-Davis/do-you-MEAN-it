import {Post} from './post';

export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    return [...this.posts];
  }

  addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.posts.push(post);
  }
}
