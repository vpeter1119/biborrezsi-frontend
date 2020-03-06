import { Injectable } from '@angular/core';
import {   
  faExclamation,
  faUser,
  faQuestionCircle,
   } from '@fortawesome/free-solid-svg-icons';

@Injectable({providedIn: "root"})
export class IconsService {

  //Icons
  icons = {    
    exclamation: faExclamation,
    question: faQuestionCircle,
    user: faUser,
  }  

  constructor() { }

  getIcons() {
    return this.icons;
  }

}