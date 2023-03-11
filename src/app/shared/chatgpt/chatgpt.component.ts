import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.scss']
})
export class ChatgptComponent implements OnInit {

  chatHidden: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChat(): void {
    this.chatHidden = !this.chatHidden;
  }

}
