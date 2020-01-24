import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RestService } from 'src/services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import formTemplate from '../../Model/form-template';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActionStatusIcon} from '../../Model/RestModel';

@Component({
  selector: 'app-tourist-list-task',
  templateUrl: './tourist-list-task.component.html',
  styleUrls: ['./tourist-list-task.component.scss']
})
export class TouristListTaskComponent implements OnInit , AfterViewChecked {
  @ViewChild ('scrollMe' , {static: false}) private myScrollContainer: ElementRef;
  tourId;
  customerId;
  myFormGroup: FormGroup;
  formTemplate = formTemplate;
  actionList = [];
  optionElm = ActionStatusIcon;
  loading = false;
  iconsArray = ActionStatusIcon;
  fileName = '';
  fileType;
  attachedFlag = false;
  constructor(private service: RestService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.route.params.subscribe(params => {
      this.tourId = params.tourId;
      this.customerId = params.customerId;
    });
  }


  ngOnInit() {
    this.scrollToBottom();
    this.myFormGroup = this.formBuilder.group({
      File: [null ],
      Comment: [null , Validators.required],
      Status: [null , Validators.required],
    });
    this.getSpecificTour();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getSpecificTour() {
    this.service.getSpecialCountryByTour(this.customerId, this.tourId)
      .subscribe((res: any) => {
          this.actionList = res.touristsListTask.actions;
          console.log('this.actionList ->', this.actionList);
          this.actionList.forEach(elm => {
            this.iconsArray.forEach(item => {
              if (elm.status === item.status) {
                elm.icon = item.icon;
                elm.color = item.color;
                elm.statusName = item.StatusName;
                // console.log('elm ->' , elm);
              }
            });
            if (elm.performer.role === 0) {
              elm.isAdmin = true;
            } else {
              elm.isAdmin = false;
            }
          });
        }
      );
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].type !== '') {
        if (event.target.files[0].type !== 'application/pdf' &&  event.target.files[0].type !== 'application/vnd.ms-excel') {
          alert('this format of file is unacceptable');
          return;
        } else {
          this.fileType = event.target.files[0].type === 'application/pdf' ? 1 : 0;
        }
      } else if (event.target.files[0].name.includes('.pdf')  || event.target.files[0].name.includes('.xlsx') )  {
        this.fileType = event.target.files[0].name.includes('.pdf') ? 1 : 0;
      } else {
        alert('please choose another file');
        return;
      }
      this.fileName = event.target.files[0].name;
      const file = event.target.files[0];
      const fd = new FormData();
      // console.log('const fd ===> ' , fd);
      fd.append('file', file, file.name);
      this.myFormGroup.patchValue({
        File: fd
      });
      this.attachedFlag = true;
      console.log(this.myFormGroup.value);
    }
  }

  removeFile() {
    this.myFormGroup.patchValue({
      File: null
    });
    this.attachedFlag = false;
    this.fileName = '';
    console.log(this.myFormGroup.value);
  }

  getAttachedFile( item, itemFileId, index) {
    console.log('itemFileId' , item  );
    this.service.DownloadFile(itemFileId).subscribe(response => {
      console.log('download file response ---> ', response);
     // const newBlob = new Blob([response], { type: 'application/pdf' });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(response);
          return;
        }
      const res = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = res;
      link.download = item.file.name;
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(() => {
          window.URL.revokeObjectURL(res);
          link.remove();
        }, 100);
      },
      error => {
        console.log(error);
      });
  }

  ReadMoreBtn(action) {
    if (action.file) {
      this.service.readSpecificFileAction(this.tourId , action.id).subscribe(
        res => {
          console.log('response from  read Specific File Action' , res);
          this.getSpecificTour();
        }
      );
    } else {
      this.service.readSpecificAction(this.tourId , action.id).subscribe(
        res => {
          console.log('response from  read Specific  Action' , res);
          this.getSpecificTour();
        }
      );
    }
  }
  onSubmit() {
    console.log(this.myFormGroup.value.File);
    this.loading = true;
    if (this.myFormGroup.valid) {
     this.service.AddAction(this.myFormGroup.value, this.fileName , this.fileType, this.tourId ).then(res => {
     res.subscribe(response => {
       // console.log('res ---> ', response );
       this.getSpecificTour();
       this.myFormGroup.reset();
       this.attachedFlag = false;
       this.loading = false;
     }, error => {
       this.loading = false;
       alert(error.error);
     });
   });
 } else {
   this.loading = false;
   alert('please fill form');
   }
  }
}
