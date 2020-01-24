import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { RestService } from 'src/services/rest.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {
  CountryForm: FormGroup;
  saveFlag = false;
  countryId;
  constructor(private http: HttpClient ,
              private service: RestService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      this.countryId = params.id;
      console.log('this.marketingId ' , this.countryId );
    });
  }

  ngOnInit() {
    this.createForm();
    this.getSpecificCountry();
  }
  createForm() {
    this.CountryForm = new FormGroup({
      countryName: new FormControl(null, Validators.required),
    });
  }
  getSpecificCountry() {
    this.service.getSpecialCountryByID(this.countryId).subscribe((res: any) => {
      console.log('specific country ===>' , res);
      this.CountryForm.setValue({
        countryName : res.name
      });
    });
  }

  OnFormSubmit() {
    if (this.CountryForm.valid) {
      this.saveFlag = true;
      this.service.AddNewCountry(this.CountryForm.value , false, this.countryId)
        .subscribe( (res) => {
          console.log('add new country res ->', res);
          this.saveFlag = false;
          this.router.navigate(['/country/country-list']);
        });
    }
  }

}
