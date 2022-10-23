import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonResponse } from '../interface/pokemon';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private pokemons: Pokemon[] = [];
  private pokemons$ = new BehaviorSubject<Pokemon[]>(this.pokemons);
  pokemonList$ = this.pokemons$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getPokemon(name: string) {
    return this.http.get<PokemonResponse>(this.baseUrl + name);
  }

  getAllPokemons(): Observable<string[]> {
    return this.http.get<Pokemon>(this.baseUrl).pipe(
      map(({ results }: Pokemon) => {
        return results.map((data: any) => data.name);
      })
    );
  }
}
