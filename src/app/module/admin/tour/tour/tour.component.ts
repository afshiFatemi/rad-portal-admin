import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  TourForm: FormGroup;
  customerId;
  saveFlag = false;
  constructor(private service: RestService ,
              private route: ActivatedRoute,
              private router: Router ) {
    this.route.params.subscribe(params => {
      this.customerId = params.customerId;
      console.log('this.customerId ' , this.customerId );
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.TourForm = new FormGroup({
      TourCode: new FormControl(null, Validators.required),
      TourGuide: new FormControl(null, Validators.required),
      TourStartDate: new FormControl(null, Validators.required),
      TourEndDate: new FormControl(null, [Validators.required]),
    });
  }
  OnFormSubmit() {
    if (this.TourForm.valid) {
      if (this.TourForm.value.TourStartDate > this.TourForm.value.TourEndDate ) {
        alert('Tour End Date must be greater than Tour Start Date');
        return;
      }
      this.saveFlag = true;
      this.service.AddNewTour(this.TourForm.value , this.customerId , true)
        .subscribe( res => {
          console.log('New Tour Added');
          this.saveFlag = false;
          this.router.navigate(['/tour/tour-list/' + this.customerId]);
        });
    }
  }

}
