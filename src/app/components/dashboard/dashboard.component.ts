import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gridStyle = {
    width: '30%',
    textAlign: 'center',
    margin: '1rem'
  }

  posts: any;
  constructor(private router: Router, private dataService: DataService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.dataService.getMyPosts().subscribe(res => {
      this.posts = res;
    })
  }
  goToPost(id) {
    this.router.navigate(['posts/', id])
  }
  
  editPost(id) {
    this.router.navigate(['edit-post/', id])
  }

  deleteJob(id) {
    console.log(id);
    
    this.dataService.deleteJob(id).subscribe(res => {
      this.nzMessageService.success(res.message)
      this.getAllPosts(); 
    })
  }
}
