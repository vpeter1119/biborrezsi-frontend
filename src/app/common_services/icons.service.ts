import { Injectable } from '@angular/core';
import {   
  faExclamation,
  faUser,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

@Injectable({providedIn: "root"})
export class IconsService {

  //Icons
  icons = {    
    exclamation: faExclamation,
    question: faQuestionCircle,
    user: faUser,
    github: faGithub,
  }  

  constructor() { }

  getIcons() {
    return this.icons;
  }

}