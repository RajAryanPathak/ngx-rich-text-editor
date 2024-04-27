import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRichTextEditorComponent } from './ngx-rich-text-editor.component';

describe('NgxRichTextEditorComponent', () => {
  let component: NgxRichTextEditorComponent;
  let fixture: ComponentFixture<NgxRichTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxRichTextEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
