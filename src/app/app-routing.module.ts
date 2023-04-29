import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  {
    path: 'memoryGame',
    component: BoardComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'memoryGame'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'memoryGame'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
