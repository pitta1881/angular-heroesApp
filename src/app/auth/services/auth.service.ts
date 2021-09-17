import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBase:string = environment.apiBase;
  private auth: Auth;

  get getAuth(){
    return {...this.auth}
  }

  constructor(private http:HttpClient) { }

  verificarAutenticacion():Observable<boolean>{
    const id = localStorage.getItem('token');
    if(!id){
      return of(false);
    } else {
      return this.http.get<Auth>(`${this.apiBase}/usuarios/${id}`)
        .pipe(
          map(auth => {
            this.auth = auth
            return true
          })
      )
    }
  }

  login(){
    return this.http.get<Auth>(`${this.apiBase}/usuarios/1`)
      .pipe(
        tap(auth => this.auth = auth),
        tap(auth => localStorage.setItem('token',auth.id))
      )
  }

  logout(){
    localStorage.clear();
    this.auth = undefined
  }
}
