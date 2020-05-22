import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../posts.service';
import {Post} from '../post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  private isNewPost = true;
  form: FormGroup;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.isNewPost = false;
        this.post = this.postsService.getLocalPost(paramMap.get('postId'));
        this.form.setValue({
          title: this.post.title, content: this.post.content
        });
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.isNewPost) {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost({
        id: this.post.id,
        title: this.form.value.title,
        content: this.form.value.content
      });
    }
    this.form.reset();
  }
}
