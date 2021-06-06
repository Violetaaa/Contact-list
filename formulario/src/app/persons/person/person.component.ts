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
    // _id: null,
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


  constructor(private _userService: UserServiceService) { }

  ngOnInit(): void {

    this._userService.getUsers().subscribe(data => {
      console.log(data);
      this.contacts = data;
    }, error => {
      console.log(error)
    })

  }

  add(form: NgForm) {
    if (this.do === 'insert') {

      let Cumpleanos = new Date(this.contact.Cumpleanos);
      let day = Cumpleanos.getDay();
      let month = Cumpleanos.getMonth();
      let year = Cumpleanos.getFullYear();
      let EdadNum = parseInt(this.contact.Edad)
      // let Nombre = this.contact.Nombre;
      // let Apellidos = this.contact.Apellidos;
      // let ColorFav = this.contact.ColorFav;
      // let Sexo = this.contact.Sexo;

      this.contact.Cumpleanos = `${year}-${month}-${day}`

      if (EdadNum > 0 && EdadNum <= 125) {
        let _that = this;
        this._userService.postUser(this.contact).subscribe(data => {
          // console.log(data)
          this._userService.getUsers().subscribe(data => {
            // _that.contacts = data
            this.contacts = data;

            this.contact = {
              // _id: null,
              Nombre: "",
              Apellidos: "",
              Edad: "",
              Dni: "",
              Cumpleanos: new Date(),
              ColorFav: "",
              Sexo: ""
            }
          })
        });
      }

    } else {
      this.contacts[this.position] = this.contact
      this.do = 'insert'
    }
    form.resetForm()
  }

  // delete(delPosition: number): void {
  //   this.contacts.splice(delPosition, 1)
  // }



    delete( delPosition : number): void {

      this._userService.deleteUser(delPosition).subscribe(data => {
        // this.http.delete(`http://localhost:5000/user/${id}`).subscribe(( res )=>{
        this._userService.getUsers().subscribe(data => {
          this.contacts = data
        })
      })
    }
  //   //this.contacts.splice( delPosition , 1 )
  // }

  update(upPosition: number): void {
    this.contact = this.contacts[upPosition];
    this.do = 'update'
    this.position = upPosition
  }
}
