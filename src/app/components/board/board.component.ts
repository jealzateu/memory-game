import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardData } from 'src/app/interfaces/card-data.model';
import { RestartDialogComponent } from '../restart-dialog/restart-dialog.component';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  name: string | null;

  listCards: any = {};

  cardImages: string[] = [];

  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount: number = 0;

  errorsCount: number = 0;

  constructor(
    private cardsService: CardsService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('username') ?  localStorage.getItem('username') : null;
    const param = {
      per_page: 20
    };
    this.getCardImages(param);
  }

  openDialogName() {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      disableClose: true,
      data: { name: this.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.name = result;
      localStorage.setItem('username', result);
    });
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  getCardImages(param: any): void {
    this.cardsService.getAllImages(param).subscribe(res => {
      this.listCards = res.entries;
      this.setupCards(this.listCards);
    }, err => {
      console.log(err);
    });
  }

  setupCards(entries: any): void {
    entries.forEach((element: any) => {
      this.cardImages.push(element.fields.image.url);
    });
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageURL: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageURL === cardTwo.imageURL ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true,
            data: { 
              name: this.name,
              errors: this.errorsCount,
              successes: this.matchedCount
             }
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
      } else {
        this.errorsCount++;
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount= 0;
    this.errorsCount = 0;
    this.setupCards(this.listCards);
  }

}
