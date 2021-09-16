import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe:Heroe;

  constructor(
      private activatedRoute:ActivatedRoute,
      private heroeService:HeroesService,
      private router:Router
      ) { }

  ngOnInit(): void {
    //En vez de hacer esto y tener dos subscribe, se hace un 'mapeo'
    // this.activatedRoute.params
    //   .subscribe( ({id}) => {
    //     this.heroeService.getHeroeByID(id)
    //       .subscribe(heroe => this.heroe = heroe)
    //   })
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroeService.getHeroeByID(id))
      )
      .subscribe( (heroe) => this.heroe = heroe)
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
