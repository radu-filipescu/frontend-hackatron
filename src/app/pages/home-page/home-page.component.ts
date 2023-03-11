import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  faCoffee = faCoffee;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToSimulator() {
    this.router.navigate(['/simulation']);
  }

  goToReadMore() {
    this.router.navigate(['/readmore']);
  }

}
