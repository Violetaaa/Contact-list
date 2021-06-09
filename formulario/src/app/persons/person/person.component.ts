import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

import { Person } from './../../interfaces/person';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent implements OnInit {

  do: String = "insert"
  position: any = 0
  mostrarListado: boolean = true;
  contacts: Array<Person> = []

  contact: Person = {
    nombre: "",
    apellidos: "",
    edad: "",
    dni: "",
    cumpleanos: new Date(),
    colorFav: "",
    sexo: ""
  }

  colorsFav = [
    { id: 1, value: 'Rojo' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Amarillo' },
    { id: 4, value: 'Verde' },
    { id: 5, value: 'Rosa' },
    { id: 6, value: 'Negro' },
    { id: 7, value: 'Morado' },
    { id: 8, value: 'Marrón' }
  ];


  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(data => this.contacts = data);
  }

  add(form: NgForm) {
    //añadir nuevo
    if (this.do === 'insert') {
      let edadNum = parseInt(this.contact.edad);
      if (edadNum > 0 && edadNum <= 125) {
        this._userService.postUser(this.contact).subscribe(data => {
          this._userService.getUsers().subscribe(data => {
            // this.contacts[this.position] = this.contact
            this.contacts = data;

            form.resetForm();

            // this.contact = {
            //   nombre: "",
            //   apellidos: "",
            //   edad: "",
            //   dni: "",
            //   cumpleanos: new Date(),
            //   colorFav: "",
            //   sexo: ""
            // }
          })
        });
      }
      form.resetForm();

      //actualizar
    } else {

      this._userService.updateUser(this.contact._id, this.contact).subscribe(data => {
        this._userService.getUsers().subscribe(data => {
          this.contacts[this.position] = this.contact
          this.contacts = data;

          this.do = 'insert';
          this.mostrarListado = true;

          form.resetForm();
        })
      })
    }
  }

  delete(delPosition: number): void {
    this._userService.deleteUser(delPosition).subscribe(data => {
      this._userService.getUsers().subscribe(data => {
        this.contacts = data
      })
    })
  }

  update(contact: Person, position: number): void {
    this.mostrarListado = false;
    this.do = 'update';
    this.contact = contact;
    this.position = position;
  }
}

