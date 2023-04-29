import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardData } from '../../interfaces/card-data.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})
export class CardComponent {

  @Input() data: CardData;

  @Output() cardClicked = new EventEmitter();

  constructor() { }

}
