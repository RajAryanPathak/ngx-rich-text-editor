import { TestBed } from '@angular/core/testing';

import { NgxRichTextEditorService } from './ngx-rich-text-editor.service';

describe('NgxRichTextEditorService', () => {
  let service: NgxRichTextEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRichTextEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
