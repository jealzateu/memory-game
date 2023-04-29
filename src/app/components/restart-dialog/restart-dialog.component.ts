import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-restart-dialog',
  templateUrl: './restart-dialog.component.html',
  styleUrls: ['./restart-dialog.component.scss']
})
export class RestartDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string,
      errors: number,
      successes: number
    }
    ) { }

}
