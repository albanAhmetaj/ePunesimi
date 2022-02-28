import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  postId: any = '';
  post: any;
  applyForm!: FormGroup;
  attachment: any;
  applications: any;
  allowApplications: boolean = false;
  filesUrl = environment.filesUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private dataService: DataService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.applyForm = this.fb.group({
      email: [null, [Validators.required]],
      telNum: [null, [Validators.required]],
      attachment: [this.attachment],
    });

    this.activatedRoute.params.subscribe((res) => {
      this.postId = res.id;
      this.dataService.getPostById(this.postId).subscribe((res) => {
        this.post = res;
        console.log(res);
        this.post.image = 'assets/images/img_avatar.png';
        this.isMyPost()
      });
    });

    this.dataService.getApplications(this.postId).subscribe((res) => {
      this.applications = res.applications;
    });    
  }

  handleUpload(event) {
    if (event.target.files.length > 0) {
      const file = <File>event.target.files[0];
      this.attachment = file;
    }
  }

  showFile(fileName) {
    window.open(this.filesUrl + fileName, '_blank');
  }

  isMyPost() {
    let admin_id = localStorage.getItem('admin_id');
    if(admin_id != '' && admin_id == this.post.user) {
        this.allowApplications = true;
    }
  }

  submitForm(): void {
    const formdata = new FormData();
    let formData = this.applyForm.value;
    formdata.append('email', formData.email);
    formdata.append('telNum', formData.telNum);
    formdata.append('attachment', this.attachment);
    console.log(formData);
    this.dataService.applyToJob(this.postId, formdata).subscribe(
      (res) => {
        this.applyForm.reset();
      },
      (err) => console.log(err)
    );
  }
}
