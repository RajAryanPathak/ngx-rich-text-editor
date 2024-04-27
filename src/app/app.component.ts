import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'text-editor-workspace';
  defaultContent = "<p>Hello World</p>";
  fun(e: any){
    console.log("hello",e)
  }
}
