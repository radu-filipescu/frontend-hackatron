import { Component, OnInit } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.scss']
})
export class ChatgptComponent implements OnInit {

  chatHidden: boolean = true;

  faQuestion = faQuestion;

  message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleChat(): void {
    this.chatHidden = !this.chatHidden;
  }

}
