import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  posts: any;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(res => {
      this.posts = res;
    })
  }

  goToPost(id) {
    this.router.navigate(['posts/', id])
  }
}
