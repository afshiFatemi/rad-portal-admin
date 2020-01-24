import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from 'src/services/rest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
interface SelectItem {
  id: number;
  name: string;
};
@Component({
  selector: 'app-marketing-office-add',
  templateUrl: './marketing-office-add.component.html',
  styleUrls: ['./marketing-office-add.component.scss']
})
export class MarketingOfficeAddComponent implements OnInit {
  Form: FormGroup;
  saveFlag = false;
  countryArray: SelectItem[] = [];
  countryList = [];

  @ViewChild('FormElement', { static: true }) FormElement;
  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dropdownSettings: any = {};
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private service: RestService,
    private router: Router
  ) { }

  // private newMethod() {
  //   return 'FormElement';
  // }

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
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.getAllCountries();
  };

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
      this.countryArray = res;
    })
  };

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

  // deleteFromCountryList(index) {
  //   this.countryList.splice(index, 1);
  //  // console.log('this.countryList' , this.countryList);
  // }
  OnFormSubmit(form:FormGroup,event:any) {
    debugger
    if (form.valid) {
      if (this.countryList.length > 0) {
        this.service.MarketingOffice(form.value, true, this.countryList).subscribe((res) => {
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
    
   
  };


}
