import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from 'src/services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
interface SelectItem {
  id: number;
  name: string;
};
@Component({
  selector: 'app-marketing-office-edit',
  templateUrl: './marketing-office-edit.component.html',
  styleUrls: ['./marketing-office-edit.component.scss']
})
export class MarketingOfficeEditComponent implements OnInit {
  Form: FormGroup;
  countryArray: SelectItem[] = [];
  countryList = [];
  
  @ViewChild('FormElement', { static: true }) FormElement:any;

  dropdownSettings: any = {};

  params: { id: any; };
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private service: RestService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.route.params.subscribe(params => {
      this.params={
        id:params.id
      }
      console.log('this.params ', this.params);
    });
  }

  ngOnInit() {
    this.createForm();
    this.dropdownSettings = {
      "singleSelection": false,
      "idField": "id",
      "textField": "name",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "itemsShowLimit": 3,
      "allowSearchFilter": true,
      "limitSelection": -1,
      "noDataAvailablePlaceholderText": 'Is Not Country',
      "closeDropDownOnSelection": false,
      "showSelectedItemsAtTop": false,
      "defaultOpen": false
    };
    this.getSpecialMarketingByID();
    this.getAllCountries();
  }

  createForm() {
    this.Form = this.fb.group({
      marketingName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      agentName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]],
      phoneTwo: [null],
      PhoneOne: [null, [Validators.required]],
      countryId: [null, [Validators.required]]
    });
  };

  getAllCountries() {
    this.service.getAllCountries().subscribe((res: any) => {
      console.log('all countries --->', res);
      this.countryArray = res;
    });
  }
  
  onSelectAllCountry(items: any) {
    debugger
    this.countryList=items;
  };
  onDeSelectCountry(item: any) {
    debugger
    let temp = this.countryList.find(obj => obj.id === item.id);
    this.countryList.splice(temp,1);

  };
   onDeSelectAllCountry(items: any) {
     debugger
     this.countryList=[];
     this.Form.get('countryId').setValue(null);
  };

  itemSelectCountry(event) {
    debugger
    this.countryList.push(event);

  };

  getSpecialMarketingByID() {
    return this.service.getSpecialMarketingByID(this.params).subscribe((res: any) => {
      debugger
      console.log('get special marketing --> ', res);
      this.countryList = res.countries;
      this.Form.setValue({
        marketingName: res.name,
        agentName: null,
        email: res.email,
        PhoneOne: res.tel,
        phoneTwo: res.tel,
        countryId: null
      });
    });
  }

  // deleteFromCountryList(index) {
  //   this.countryList.splice(index, 1);
  //   console.log('this.countryList', this.countryList);
  // }

  OnFormSubmit(form:FormGroup,event:any) {
    debugger
    if (form.valid) {
      if (this.countryList.length > 0) {
        this.service.MarketingOffice(this.Form.value, false, this.countryList, this.params).subscribe((res) => {
          debugger
          this.router.navigate(['/marketing']);
        });
      } else {
        this.snackBar.open('please choose a country or more', 'ok', {
          duration: 3000,
        });
      }
    } else {
      event.preventDefault();
     // event.stopPropagation();
     this.snackBar.open('please fill the form correctly', 'ok', {
       duration: 3000,
     });
   }
   this.FormElement.nativeElement.attributes["class"].value +=` was-validated`;
  }

}
