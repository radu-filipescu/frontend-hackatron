import { Component, OnInit } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.scss']
})
export class ChatgptComponent implements OnInit {

  chatHidden: boolean = true;
  
  faQuestion = faQuestion;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChat(): void {
    this.chatHidden = !this.chatHidden;
  }

}
