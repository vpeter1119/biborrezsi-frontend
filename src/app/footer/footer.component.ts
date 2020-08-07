import { Component, OnInit } from '@angular/core';
import { IconsService } from '../common_services/icons.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  icons = {};

  constructor(
    private _icons: IconsService,
  ) { }

  ngOnInit() {
    this.icons = this._icons.getIcons();
  }

}