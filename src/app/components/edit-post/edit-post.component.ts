import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  job_announce!: FormGroup;
  postID: any; 
  post:any;
  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.job_announce = this.fb.group({
      title: [null, [Validators.required]],
      state: [{value:'Kosove', disabled: true}, [Validators.required]],
      city: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.route.paramMap.subscribe(res => this.postID = res.get('id'));
    this.getPost();
  }

  getPost() {
    this.dataService.getPostById(this.postID).subscribe((res) => {
      this.post = res;
      console.log(res);
      
      this.job_announce.patchValue({
        title: res.title,
        description: res.description,
        city: res.city
      })
    })  
  }

  submitForm(): void {
    const formData = new FormData();
    let newPost = this.job_announce.value;
    console.log(newPost);
    
    this.dataService.updateJob(newPost, this.postID).subscribe(res =>{
    });
    this.router.navigate(["/"])

  }

}
