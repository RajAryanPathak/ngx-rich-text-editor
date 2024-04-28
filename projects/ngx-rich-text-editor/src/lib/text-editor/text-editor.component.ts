import { Component, ElementRef, OnInit, ViewChild, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @ViewChild('textEditor') private textEditor!: ElementRef<HTMLDivElement>;
  @Input() initialContent: string = "<p><br></p>";  // Accept initial content from parent
  @Output() contentChange = new EventEmitter<string>();  // Emit content changes


  private savedSelection: Range | null = null;
  private subscriptions: Subscription[] = [];



  constructor() { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    // console.log("ElementRef:", this.textEditor);
    // console.log("this.initialContent",this.initialContent)
    this.setTextEditorContent(this.initialContent);
    this.addEventListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.removeEventListeners();
  }

  private setTextEditorContent(content: string): void {
    // console.log("this.initialContent",this.initialContent)
    if (this.textEditor.nativeElement) {
      // console.log("this.initialContent",this.initialContent)
      this.textEditor.nativeElement.innerHTML = content;
    }
  }

  private addEventListeners(): void {
    this.textEditor.nativeElement.addEventListener('mouseup', this.saveSelection.bind(this));
    this.textEditor.nativeElement.addEventListener('keyup', this.saveSelection.bind(this));
    this.textEditor.nativeElement.addEventListener('input', () => this.outputHtml()); // Automatically emit content on input

  }

  private removeEventListeners(): void {
    this.textEditor.nativeElement.removeEventListener('mouseup', this.saveSelection.bind(this));
    this.textEditor.nativeElement.removeEventListener('keyup', this.saveSelection.bind(this));
    this.textEditor.nativeElement.removeEventListener('input', () => this.outputHtml());
 
  }







  execCommand(command: string, value?: any): void {
    this.restoreSelection();
    switch (command) {
      case 'bold':
      case 'italic':
      case 'insertUnorderedList':
      case 'insertOrderedList':
        document.execCommand(command, false, value);
        break;
      case 'insertBlockQuote':
        this.toggleBlockQuote();
        break;
      case 'createLink':
        if (value) {
          document.execCommand('createLink', false, value);  // Directly use document.execCommand
        }
        break;
      case 'insertTable':
        const { rows, cols } = value;
        this.insertTable(rows, cols);
        break;
      default:
        console.warn(`Command ${command} is not recognized.`);
    }
    this.saveSelection();
    this.focusTextEditor();
  }

  insertTable(rows: number, cols: number): void {
    this.restoreSelection();
    const tableHtml = this.generateTableHtml(rows, cols);
    document.execCommand('insertHTML', false, tableHtml);
  }
  private generateTableHtml(rows: number, cols: number): string {
    const colWidth = 100 / cols;
    let tableHtml = '<table style="width: 100%; border-collapse: collapse; border: 1px solid black;">';
    for (let i = 0; i < rows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHtml += `<td style="width: ${colWidth}%; height: 30px; border: 1px solid black;">&nbsp;</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    return tableHtml;
  }


  private findAncestor(node: Node, tagName: string): HTMLElement | null {
    // console.log("Starting findAncestor");
    // console.log("Initial node:", node, node.nodeName, "Type:", node.nodeType);

    tagName = tagName.toUpperCase();
    if (node.childNodes.length > 0 && node.childNodes[0].nodeType === Node.ELEMENT_NODE && node.childNodes[0].nodeName === 'BLOCKQUOTE') {
      // console.log("First child is a blockquote:", node.childNodes);
      node = node.childNodes[0]
    }
    // If the node is a text node, start from its parent element.
    if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
      node = node.parentNode;
      // console.log("Adjusted to parent node:", node.nodeName, "Type:", node.nodeType);
    }

    // Now proceed as previously, ensuring we start from an element node.
    while (node && node.nodeType === Node.ELEMENT_NODE && node.nodeName !== tagName && node.nodeName !== 'BODY' && node.parentNode) {
      // console.log("Traversing node:", node, node.nodeName);
      node = node.parentNode;
    }

    // console.log("Final node before return:", node ? node.nodeName : "None");
    return node && node.nodeName === tagName ? node as HTMLElement : null;
  }



  private toggleBlockQuote(): void {
    this.restoreSelection(); // Restore the selection before toggling
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const blockquoteNode = this.findAncestor(range.startContainer, 'BLOCKQUOTE');
    // console.log("blockquoteNode", blockquoteNode)
    setTimeout(() => {
      if (blockquoteNode) {
        // console.log("hello")
        this.removeFormatting(blockquoteNode);
      } else {
        this.insertBlockQuote(range);
      }
    }, 0);
    this.focusTextEditor(); // Set focus back to the editor
  }
  private removeFormatting(node: HTMLElement): void {
    const parent = node.parentNode;
    while (parent && node.firstChild) {
      parent.insertBefore(node.firstChild, node);
    }
    if(parent){
      parent.removeChild(node);
    }
    
  }






  private insertBlockQuote(range: Range): void {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;


    if (range.collapsed) {
      // No selection, insert blockquote around the current line or the parent element
      this.insertBlockQuoteAroundParent(range.startContainer);
    } else {
      // There is a selection, wrap it in a blockquote
      const selectedText = range.extractContents();
      const blockquote = document.createElement('blockquote');
      this.setStyleForBlockQuote(blockquote);
      blockquote.appendChild(selectedText);
      range.insertNode(blockquote);
      selection.removeAllRanges(); // Clear the selection
      const newRange = document.createRange(); // Select the new blockquote
      newRange.selectNode(blockquote);
      selection.addRange(newRange);
    }

    this.focusTextEditor(); // Set focus back to the editor
  }

  private setStyleForBlockQuote(blockquote: HTMLElement): void {
    blockquote.style.borderLeft = '4px solid #ccc';
    blockquote.style.margin = '0';
    blockquote.style.paddingLeft = '16px';
    blockquote.style.color = '#666';
    blockquote.style.fontStyle = 'italic';
  }
  

  private insertBlockQuoteAroundParent(node: Node): void {
    // Initialize 'currentNode' as 'node', and check if it is an instance of HTMLElement.
    // This loop will traverse upwards through the DOM tree until it finds an HTMLElement.
    let currentNode: Node | null = node;
    while (currentNode && !(currentNode instanceof HTMLElement)) {
      currentNode = currentNode.parentNode;
    }

    // Once an HTMLElement is found or if 'currentNode' is null, check if it's not already a BLOCKQUOTE.
    if (currentNode && currentNode instanceof HTMLElement && currentNode.nodeName !== 'BLOCKQUOTE') {
      const blockquote = document.createElement('blockquote');
      this.setStyleForBlockQuote(blockquote);
      blockquote.innerHTML = currentNode.innerHTML; // Safely set HTML since 'currentNode' is confirmed to be an HTMLElement.
      currentNode.innerHTML = ''; // Clear the existing content.
      currentNode.appendChild(blockquote); // Insert the new blockquote.
    }
  }





  promptForLink(): void {
    const url = prompt('Enter the URL');
    this.focusTextEditor();
    if (url && this.validateUrl(url)) {
      this.execCommand('createLink', url);
    } else {
      alert('Please enter a valid URL.');
    }
  }

  

  outputHtml(): void {
    this.contentChange.emit(this.getHtmlContent());  // Manually emit the content when needed
  }

  private focusTextEditor(): void {
    this.textEditor.nativeElement.focus();
  }

  private validateUrl(url: string): boolean {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  }

  

  saveSelection(): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedSelection = selection.getRangeAt(0);
    }
  }

  restoreSelection(): void {
    const selection = window.getSelection();
    if (this.savedSelection && selection) {
      selection.removeAllRanges();
      selection.addRange(this.savedSelection);
    }
  }



  getHtmlContent(): string {
    return this.textEditor.nativeElement.innerHTML;
  }


}
