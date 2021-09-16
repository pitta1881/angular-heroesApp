import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe:Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics
  };

  constructor(private heroeService:HeroesService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.router.url.includes('editar')){
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroeService.getHeroeByID(id))
        )
        .subscribe(heroe => this.heroe = heroe)        
      }
  }

  guardar(){
    if(this.heroe.superhero.trim().length > 0)
      if(this.heroe.id){  //update
        this.heroeService.updateHeroe(this.heroe)
          .subscribe(heroeResp => this.openSnackBar('Registro actualizado'))
      } else {          //create
        this.heroeService.createHeroe(this.heroe)
          .subscribe(heroeResp => {
            this.router.navigate(['/heroes/editar',heroeResp.id])
            this.openSnackBar('Registro creado')
          })
      }
  }

  borrar(){
    const dialog = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data:this.heroe
    })

    dialog.afterClosed()
      .subscribe(result => {
        if(result){
          this.heroeService.deleteHeroe(this.heroe.id)
          .subscribe(heroeResp => {
            this.router.navigate(['heroes'])
            this.openSnackBar('Registro borrado')
          })
        }
      })    
  }

  openSnackBar(mensaje:string) {
    this.snackBar.open(mensaje, 'Cerrar',{
      duration:2500
    });
  }

}
