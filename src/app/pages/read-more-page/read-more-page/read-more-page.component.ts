import { Component, OnInit } from '@angular/core';
import { faComputer, faSquareCheck, faHandshake } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-read-more-page',
  templateUrl: './read-more-page.component.html',
  styleUrls: ['./read-more-page.component.scss']
})
export class ReadMorePageComponent implements OnInit {

  faComputer = faComputer;
  faSquareCheck = faSquareCheck;
  faHandshake = faHandshake;

  constructor() { }

  ngOnInit(): void {
  }

}
