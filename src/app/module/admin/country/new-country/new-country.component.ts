import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { RestService } from 'src/services/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.scss']
})
export class NewCountryComponent implements OnInit {
  CountryForm: FormGroup;
  saveFlag = false;
  constructor(private http: HttpClient ,
              private service: RestService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.CountryForm = new FormGroup({
      countryName: new FormControl(null, Validators.required),
    });
  }

  OnFormSubmit() {
    if (this.CountryForm.valid) {
      this.saveFlag = true;
      this.service.AddNewCountry(this.CountryForm.value , true)
        .subscribe( (res) => {
          console.log('add new country res ->', res);
          this.saveFlag = false;
          this.router.navigate(['/country/country-list']);
        });
    }
  }
}
