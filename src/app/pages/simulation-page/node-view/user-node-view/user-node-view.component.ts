import { Component, Input, OnInit } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { userDTO } from 'src/app/shared/DTOs/user';

@Component({
  selector: 'app-user-node-view',
  templateUrl: './user-node-view.component.html',
  styleUrls: ['./user-node-view.component.scss']
})
export class UserNodeViewComponent implements OnInit {

  faCircleUser = faCircleUser;

  @Input() userDTO: userDTO = new userDTO();

  constructor() { }

  ngOnInit(): void {
  }

}
