import { Component, OnInit } from '@angular/core';
import { UserDto } from './dto/user.dto';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: UserDto = new UserDto();

  constructor() { }

  ngOnInit(): void {
  }

}
