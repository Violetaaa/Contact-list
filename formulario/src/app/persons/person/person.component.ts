import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Person } from './../../interfaces/person';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  do: String = "insert"
  position: any = 0

  contacts: Array<Person> = []

  contact: Person = {
        Nombre: "",
        Apellidos: "",
        Edad: "",
        Dni: "",
        Cumpleanos: "",
        ColorFav: "",
        Sexo: ""
        // ,
        // notes: ""
  }

  ColorsFav = [
    { id: 1, value: 'Rojo' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Amarillo' },
    { id: 4, value: 'Verde' },
    { id: 5, value: 'Rosa' },
    { id: 6, value: 'Negro' },
    { id: 7, value: 'Morado' },
    { id: 8, value: 'Marrón' }
  ];


  constructor(private _userService: UserServiceService) {}

  ngOnInit(): void {

    this._userService.getUsers().subscribe(data => {
      console.log(data);
     this.contacts = data; 
    }, error => {
      console.log(error)
    } )

  }

  add( form : NgForm ){
    if( this.do === 'insert' ){

      let Cumpleanos  = new Date(this.contact.Cumpleanos);
      let day = Cumpleanos.getDay();
      let month = Cumpleanos.getMonth();
      let year = Cumpleanos.getFullYear();
      let EdadNum = parseInt(this.contact.Edad)
      let Nombre = this.contact.Nombre;
      let Apellidos = this.contact.Apellidos;
      let ColorFav = this.contact.ColorFav;

      this.contact.Cumpleanos = `${day}/${month}/${year}`

      if(EdadNum > 0 && EdadNum <= 125){
      this.contacts.push( this.contact )
      }

      this.contact = {
        Nombre: "",
        Apellidos: "",
        Edad: "",
        Dni: "",
        Cumpleanos: new Date(),
        ColorFav: "",
        Sexo: ""
        // ,
        // notes: ""
      }

    }else{
      this.contacts[ this.position ] = this.contact
      this.do = 'insert'
    }
    form.resetForm()
  }

  delete( delPosition : number )    : void {
    this.contacts.splice( delPosition , 1 )
  }
  update( upPosition : number ) : void {
    this.contact  = this.contacts[ upPosition ];
    this.do   = 'update'
    this.position = upPosition
  }
}
