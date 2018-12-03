import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild
} from '@angular/core';

import * as cytoscape from 'cytoscape';
import * as dagre from 'cytoscape-dagre';

@Component({
  selector: 'app-modeler',
  template: '<div #cy id="cy"></div>',
  styleUrls: ['./modeler.component.css']
})
export class ModelerComponent implements OnInit {
  @Input() data: any;

  @Output() modelSelected = new EventEmitter();

  cy: any;

  readOnlyValue = true;
  @Input()
  set readOnly(value: boolean) {
    this.readOnlyValue = value;
    if (this.cy) {
      this.cy.autoungrabify(this.readOnly);
      this.cy.panningEnabled(!this.readOnly);
    }
  }
  get readOnly(): boolean {
    return this.readOnlyValue;
  }

  scaleValue: number;
  @Input()
  set scale(value: number) {
    if (this.cy) {
      this.scaleValue = !this.scaleValue ? this.cy.zoom() : this.scaleValue;
      this.cy.zoom(this.scaleValue * value);
    }
  }
  get scale(): number {
    return this.scaleValue;
  }

  @ViewChild('cy') cyElement: ElementRef;

  ngOnInit() {
    this.renderGraph();
  }

  renderGraph() {
    cytoscape.use(dagre); // register extension

    const layout = {
      name: 'dagre', // breadthfirst
      directed: true,
      rankDir: 'LR',
      padding: 20,
      fit: true
    };

    this.cy = cytoscape({
      container: this.cyElement.nativeElement,

      layout: layout,

      style: [
        {
          selector: 'node',
          style: {
            shape: 'data(shapeType)',
            width: 'mapData(50, 40, 80, 20, 60)',
            content: 'data(name)',
            'text-valign': 'bottom',
            'text-outline-width': 1,
            'text-outline-color': 'blue',
            // 'background-color': 'data(colorCode)',
            color: '#fff',
            'font-size': 10,
            'border-width': 1
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            opacity: 0.666,
            width: 'mapData(10, 10, 100, 2, 16)',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: ':selected',
          style: {
            'border-width': 1,
            'border-color': 'black'
          }
        },
        {
          selector: 'edge.questionable',
          style: {
            'line-style': 'dotted',
            'target-arrow-shape': 'diamond'
          }
        },
        {
          selector: '.faded',
          style: {
            opacity: 0.25,
            'text-opacity': 0
          }
        }
      ],
      zoom: 1,
      elements: this.data,
      userZoomingEnabled: false,
      panningEnabled: true,
      autoungrabify: this.readOnly
      /*
      boxSelectionEnabled: false,
      autounselectify: false
      */
    });
  }
}
