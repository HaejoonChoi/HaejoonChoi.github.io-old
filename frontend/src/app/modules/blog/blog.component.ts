import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  constructor(private http: HttpClient) { }
  title = 'Blog';
  posts = [];


  ngOnInit(): void {
    // checks the files in assets/mdfiles and adds the paths to the posts array
    const files = this.http.get(`assets/mdfiles/${fileName}`, { responseType: 'text' });
    
  };
}


