import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  termino:string = '';
  heroes:Heroe[] = []
  heroeSeleccionado:Heroe;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes=heroes)
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent ){
    const heroe:Heroe = event.option.value
    if(heroe){
      this.termino = heroe.superhero    
      this.heroesService.getHeroeByID(heroe.id)
        .subscribe(heroe => this.heroeSeleccionado = heroe)
    } else {
      this.heroeSeleccionado = undefined
    }
  }

}
