import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Player } from './player'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url = 'http://localhost:8080/players';
  private detailurl = 'http://localhost:8080/players/${id}';

  constructor(
    private http: HttpClient) { }
    
  /** GET players from the server */
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.url)
  }

  getPlayer(id: number): Observable<Player> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    return this.http.get<Player>(this.detailurl)
  }
}
