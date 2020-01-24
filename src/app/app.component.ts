import { Component } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {Config} from './app.config';
import {RestService} from '../services/rest.service';

export const LSSharedLanguage = {
  language: 'chosenLanguage'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rad-crm';
  chLanguage;
  toggled = false;

  constructor(private service: RestService,
              private translate: TranslateService) {

    if (window.location.href.includes('a url')){
      service.developOption('LocalHost');
    } else {
      // _service.developOption('LocalHost');
      service.developOption('Test');
      // service.developOption('Release');
      // service.developOption('DirectConnect');
    }
    translate.addLangs([Config.langs.en.name , Config.langs.fa.name]);
    this.chLanguage = Config.langs.defaultLang.name;
    translate.setDefaultLang(Config.langs.en.name);
    localStorage.setItem(LSSharedLanguage.language, JSON.stringify(Config.langs.defaultLang.name));
  }

  hideSidebar() {
    this.toggled = !this.toggled;
  }


}



