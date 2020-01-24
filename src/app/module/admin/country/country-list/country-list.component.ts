import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countryArray = [];
  constructor(private  service: RestService) { }

  ngOnInit() {
    this.getAllCountry();
  }
  getAllCountry() {
    this.service.getAllCountries().subscribe( (res: any) => {
      console.log('All Country ---> ' , res);
      this.countryArray = res;
    });
  }
  deleteCountry(CountryId) {
    this.service.deleteSpecialCountry(CountryId).subscribe(res => {
      console.log('Delete Country --->' , res);
      this.getAllCountry();
    } , error => {
      alert(error.error);
    });
  }

}
