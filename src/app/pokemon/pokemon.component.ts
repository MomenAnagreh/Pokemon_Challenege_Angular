import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonResponse } from '../interface/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemonList: any[] = [];
  showRequest: boolean = false;
  chosen!: any;
  hideMain: boolean = false;

  constructor(public pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokemonService.getAllPokemons().subscribe((item) => {
      item.forEach((name) => {
        this.pokemonService.getPokemon(name).subscribe((pokemon) => {
          const item = {
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            id: pokemon.id,
            weight: pokemon.weight,
            height: pokemon.height,
            types: pokemon.types.map((type) => {
              return type.type.name;
            }),
          };
          this.pokemonList.push(item);
        });
      });
    });
  }

  cardClicked(name: string) {
    this.pokemonService.getPokemon(name).subscribe((pokemon) => {
      const item = {
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        id: pokemon.id,
        weight: pokemon.weight,
        height: pokemon.height,
        types: pokemon.types.map((type) => {
          return type.type.name;
        }),
      };

      this.chosen = item;
    });
    this.showRequest = true;
  }

  cancel() {
    this.showRequest = false;
  }

  display() {
    this.hideMain = true;
    this.showRequest = false;
  }

  goBack() {
    this.hideMain = false;
  }
}
