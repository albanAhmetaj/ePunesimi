import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-job-announce-form',
  templateUrl: './job-announce-form.component.html',
  styleUrls: ['./job-announce-form.component.css']
})
export class JobAnnounceFormComponent implements OnInit {
  job_announce!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.job_announce = this.fb.group({
      title: [null, [Validators.required]],
      state: [{value:'Kosove', disabled: true}, [Validators.required]],
      city: [null, [Validators.required]],
      description: [null, [Validators.required]],

    });
  }

  submitForm(): void {
    const formData = new FormData();
    let newPost = this.job_announce.value;
    console.log(newPost);
    
    this.dataService.createJob(newPost).subscribe({
      next: (newPost) => {
        this.job_announce.reset();
        this.router.navigate(['/'])
      },
      error: (err) => console.log(err),
    });
  }
}
