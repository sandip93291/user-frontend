import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-moving-text',
  standalone: false,
  templateUrl: './moving-text.html',
  styleUrl: './moving-text.scss',
    animations: [
    trigger('scroll', [
      state('on', style({right: '-100px'})),
      transition('* => *', [
        style({right: '-100px'}),
        animate(100000, style({right: '100%'}))
      ])
    ])
  ]
})
export class MovingText {
  data = ['Innovate', 'Create', 'Inspire', 'Design', 'Develop', 'Transform', 'Empower', 'Collaborate', 'Evolve', 'Achieve',
    'Innovate', 'Create', 'Inspire', 'Design', 'Develop', 'Transform', 'Empower', 'Collaborate', 'Evolve', 'Achieve'
  ];
    state = 0;

  scrollDone() {
    this.state++;
  }
}
