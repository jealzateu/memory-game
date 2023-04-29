import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  cardImages = environment.URL + '/api/content/spaces/animals/types/game/entries';

  public getAllImages(request: any): Observable<any> {
    return this.http.get(this.cardImages, {
      params: request
    });
  }

}
