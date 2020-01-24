import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
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
    this.deleteSpecialCustomer();
    this.getAllMarketing();
    // this.getSpecialMarketingByID();
    // this.getSpecialCountryByID();
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

  deleteSpecialCustomer() {
    this.service.getSpecialCustomerByID(this.params )
      .subscribe((res: any) => {
        console.log('res from get specific customer' , (res));
        res[0].emails.forEach( elm => {
          this.customerEmailArray.push(elm.emailAddress);
        });
        this.Form.setValue({
          companyName: res[0].companyName,
          agent: res[0].agent,
          phoneNumber: res[0].tel,
          country: res[0].country.name,
          address: res[0].address,
          email: null,
          marketingId: res[0].marketingOffice.id,
          comments: res[0].comment,
        });
      });
  }

  AddEmail() {
    if (this.Form.controls.email.status === 'VALID') {
      this.customerEmailArray.push(this.Form.value.email );
      this.Form.reset({
        email: ''
      });
      // console.log('this.hotelEmailArray', this.customerEmailArray);
    }
  }
  editEmailArray(item, index) {
    this.EmailEditFlag = true;
    this.editedEmailIndex = index;
    this.Form.get('email').setValue(item);
    // console.log('this.hotelEmailArray', this.customerEmailArray);
  }
  EditEmail() {
    this.customerEmailArray[this.editedEmailIndex] = this.Form.value.email;
    this.EmailEditFlag = false;
    this.Form.reset({
      email: ''
    });
    this.editedEmailIndex = null;
    // console.log('this.hotelEmailArray', this.customerEmailArray);
  }
  deleteEmailFromEmailArray(item, index) {
    this.customerEmailArray.splice(index, 1);
    this.Form.reset({
      email: ''
    });
    // console.log('this.hotelEmailArray', this.customerEmailArray);
  }
  MarketingSelected(event) {
    console.log('tourId' , event);
  }
  getAllMarketing() {
    return this.service.getAllMarketing().subscribe( (res: any) => {
      console.log('get all Marketing ->' , res);
      this.marketingArray = res;
    });
  }
  OnFormSubmit(form:FormGroup , event:any) {
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
