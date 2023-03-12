import { Component, OnInit } from '@angular/core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { ChatWithBot, ResponseModel } from './dto/gpt-response';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.scss']
})
export class ChatgptComponent implements OnInit {

  chatConversation: ChatWithBot[]=[];

  chatHidden: boolean = true;

  faQuestion = faQuestion;

  message: string = '';

  response!: ResponseModel | undefined;
  showSpinner = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChat(): void {
    this.chatHidden = !this.chatHidden;
  }


  //openai integration https://github.com/learnsmartcoding/ai-chat-bot-app-in-angular-using-chatGPT/blob/main/src/app/customer-support/customer-support.component.ts
  async invokeGPT() {

    if(this.message.length<2)
      return;

    try{
      this.response = undefined;
      let configuration = new Configuration({apiKey: environment.openai.OPENAI_API_KEY});
      let openai = new OpenAIApi(configuration);

      let requestData={
        model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
        prompt: this.message,
        max_tokens: 150
      };
      this.showSpinner = true;
      let apiResponse =  await openai.createCompletion(requestData);

      this.response = apiResponse.data as ResponseModel;
      this.pushChatContent(this.response.choices[0].text.trim(),'ChatGPT','bot');
      this.showSpinner = false;
    }catch(error:any) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);

      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);

      }
    }
  }

  pushChatContent(content:string, person:string, cssClass:string) {
    const chatToPush: ChatWithBot = { person:person, response:content, cssClass:cssClass};
    this.chatConversation.push(chatToPush);
  }

  checkResponse() {
    this.pushChatContent(this.message,'You','person');
    this.invokeGPT();
  }

  getText(data:string) {
    return data.split('\n').filter(f=>f.length>0);
  }

}
