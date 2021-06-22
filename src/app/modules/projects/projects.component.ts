import { Component, OnInit } from '@angular/core';
import { exampleProjects, Project } from 'src/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];

  constructor() {
    this.projects = exampleProjects;
  }

  ngOnInit(): void {}
}
