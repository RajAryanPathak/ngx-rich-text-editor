import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-grid-selector',
  templateUrl: './grid-selector.component.html',
  styleUrl: './grid-selector.component.css'
})
export class GridSelectorComponent  implements OnInit {


  constructor() { }
  @Output() selectionConfirmed = new EventEmitter<{ rows: number, cols: number }>();

  ngOnInit(): void {
  }
  grid = new Array(10).fill(new Array(10).fill(0));  // Example with 10x10 grid
  hoveredRows = 0;
  hoveredCols = 0;

  setHoveredCells(rows: number, cols: number): void {
    this.hoveredRows = rows;
    this.hoveredCols = cols;
  }

  confirmSelection(rows: number, cols: number): void {
    // Code to confirm the selection and possibly close the modal or send data back
    console.log(`Selected ${rows} rows and ${cols} columns`);
    this.selectionConfirmed.emit({ rows, cols });
  }

}
