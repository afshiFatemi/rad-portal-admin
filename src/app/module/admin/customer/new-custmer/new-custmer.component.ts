import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  Form: FormGroup;
  EmailEditFlag = false;
  customerEmailArray = [];
  editedEmailIndex;
  marketingArray = [];
  countryArray = [];
  params: { countryId: any; marketingId: any; };
    
  @ViewChild('FormElement', { static: true }) FormElement:any;

  constructor
  (
    private http: HttpClient,
    private service: RestService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) 
    {
      this.route.params.subscribe(params => {
        this.params={
          countryId:params.countryId,
          marketingId: params.marketingId
        }
              });
    }

  ngOnInit() {
    this.createForm();
  //  this.getAllCountries();
    this.getSpecialMarketingByID();
    this.getSpecialCountryByID();
  }

  createForm() {
    this.Form = this.fb.group({
      companyName: [null,[ Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      marketingId: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100),Validators.pattern('[a-zA-z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+')]],
      phoneTwo: [null],
      PhoneOne: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      comments: [null],
    });
  };

  AddEmail() {
    if (this.Form.controls.email.status === 'VALID') {
      this.customerEmailArray.push(this.Form.value.email );
      this.Form.get('email').setValue('');
    }
  };

  editEmailArray(item, index) {
    this.EmailEditFlag = true;
    this.editedEmailIndex = index;
    this.Form.get('email').setValue(item);
  };

  EditEmail() {
    this.customerEmailArray[this.editedEmailIndex] = this.Form.value.email;
    this.EmailEditFlag = false;
    this.Form.reset({
      email: ''
    });
    this.editedEmailIndex = null;
  };

  deleteEmailFromEmailArray(item, index) {
    this.customerEmailArray.splice(index, 1);
    this.Form.reset({
      email: ''
    });
  };

  MarketingSelected(event) {
    const countryArray = this.marketingArray.filter( obj => obj.id === event);
    this.countryArray = countryArray[0].countries;
   };

  getSpecialMarketingByID() {
    return this.service.getSpecialMarketingByID(this.params.marketingId).subscribe( (res: any) => {
      debugger
     this.Form.get('marketingId').setValue(res.name);
     this.countryArray = res.countries;
     this.Form.get('marketingId').disable();
    });
  };

  getSpecialCountryByID() {
    return this.service.getSpecialCountryByID(this.params).subscribe( (res: any) => {
      this.Form.get('countryId').setValue(res.id);
    });
  };

  OnFormSubmit(form:FormGroup,event:any) {
    debugger
    if (form.valid) {
      if (form.value.email) {
        this.customerEmailArray.push(this.Form.value.email);
        this.Form.get('email').setValue('');
      }
      if (this.customerEmailArray.length > 0) {

        this.service.addNewCustomer(form.value , this.customerEmailArray , true , this.params )
          .subscribe((res) => {
            debugger
            this.router.navigate(['marketing']);
          });
      } else {
        this.snackBar.open('please enter an Email or more', 'ok', {
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
