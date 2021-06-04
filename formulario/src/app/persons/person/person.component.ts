import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Person } from './../../interfaces/person';

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
        name: "",
        surnames: "",
        age: "",
        dni: "",
        birthday: "",
        favouriteColour: "",
        sex: "",
        notes: ""
  }

  favouriteColours = [
    { id: 1, value: 'Rojo' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Amarillo' },
    { id: 4, value: 'Verde' },
    { id: 5, value: 'Rosa' },
    { id: 6, value: 'Negro' },
    { id: 7, value: 'Morado' },
    { id: 8, value: 'Marrón' }
  ];


  constructor() { }

  ngOnInit(): void {}

  add( form : NgForm ){
    if( this.do === 'insert' ){

      let birthDate  = new Date(this.contact.birthday);
      let day = birthDate.getDay();
      let month = birthDate.getMonth();
      let year = birthDate.getFullYear();
      let ageNum = parseInt(this.contact.age)
      let name = this.contact.name;
      let surnames = this.contact.surnames;
      let favouriteColour = this.contact.favouriteColour;

      this.contact.birthday = `${day}/${month}/${year}`

      if(ageNum > 0 && ageNum <= 125){
      this.contacts.push( this.contact )
      }

      this.contact = {
        name: "",
        surnames: "",
        age: "",
        dni: "",
        birthday: new Date(),
        favouriteColour: "",
        sex: "",
        notes: ""
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
