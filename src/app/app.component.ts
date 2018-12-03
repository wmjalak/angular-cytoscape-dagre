import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readOnly = false;
  scaleValue = 1.0;

  graphData = {
    nodes: [
      {
        data: {
          id: 'a',
          name: 'a',
          shapeType: 'ellipse'
        }
      },
      {
        data: {
          id: 'b',
          name: 'b',
          shapeType: 'roundrectangle'
        }
      },
      {
        data: {
          id: 'c',
          name: 'c',
          shapeType: 'roundrectangle'
        }
      },
      {
        data: {
          id: 'd',
          name: 'd',
          shapeType: 'ellipse'
        }
      }
    ],
    edges: [
      { data: { source: 'a', target: 'b' } },
      { data: { source: 'b', target: 'c' } },
      { data: { source: 'b', target: 'd' } }
    ]
  };

  scale(value: number) {
    this.scaleValue = this.scaleValue + value;
  }
}
