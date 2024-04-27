import { NgModule } from '@angular/core';
import { NgxRichTextEditorComponent } from './ngx-rich-text-editor.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { GridSelectorComponent } from './grid-selector/grid-selector.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgxRichTextEditorComponent,
    TextEditorComponent,
    GridSelectorComponent,
    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxRichTextEditorComponent,
    TextEditorComponent
    
  ]
})
export class NgxRichTextEditorModule { }
