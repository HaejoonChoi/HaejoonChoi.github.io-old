import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/assets/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'haejoon-website';
  public readonly CONSTANTS = Constants;

  constructor(private router: Router) {}

  public onHomeClicked(): void {
    this.router.navigateByUrl('/');
  }

  public onProjectsClicked(): void {
    this.router.navigateByUrl('/projects');
  }
}
