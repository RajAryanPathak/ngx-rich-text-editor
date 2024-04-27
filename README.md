# NgxRichTextEditor

This library, generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0, provides a rich text editor component for Angular applications.

## Features

- **Rich Text Editing**: Supports rich text editing capabilities, including custom text styles and formatting.
- **Formatting Options**: Offers a variety of text formatting options such as bold, italic, underline, bullet lists, numbered lists, hyperlinks, images, tables, and block quotes.
- **Customizable**: Easy to customize styles and functionalities to fit the needs of your application.
- **Events and Data Binding**: Supports Angular event bindings to easily handle data input and output.


## Installation

Install `ngx-rich-text-editor` via npm:

`npm install ngx-rich-text-editor`


```
import { NgxRichTextEditorModule } from 'ngx-rich-text-editor';

@NgModule({
  imports: [
    NgxRichTextEditorModule
  ]
})
export class YourModule {}
```




## Usage

To use the NgxRichTextEditor in your application, follow these steps:

### Step 1: Import the Module
Import the `NgxRichTextEditorModule` in your Angular module:

```typescript
import { NgxRichTextEditorModule } from 'ngx-rich-text-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxRichTextEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 2: Add the Editor Component
Add the `<lib-text-editor>` component to your component's HTML template where you want the text editor to appear:

```

  <lib-text-editor [initialContent]="defaultContent" (contentChange)="handleContentChange($event)"></lib-text-editor>

```

### Step 3: Configure the Editor
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'text-editor-workspace';
  defaultContent = "<p>Hello World</p>";

  handleContentChange(eventContent: string): void {
    console.log("Editor Content:", eventContent);
  }
}
```

This configuration initializes the text editor with the specified defaultContent. The handleContentChange function logs the content to the console every time it changes, demonstrating how to handle data output from the editor.




=======

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

