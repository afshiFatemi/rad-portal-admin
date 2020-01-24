import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, fromEvent, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ActionVM, CountryVM, CustomerVM, FileVM, IEmail, MarketingVM, TourVm, UploadVM} from '../../src/app/module/admin/Model/RestModel';


@Injectable()
export class RestService {
  apiAddress;
  ipgAddress;
  ftpAddress;
  token = '';
  headers;
  options;
  currentLang: string;
  private loginAuth = new BehaviorSubject(false);
  currentAuth = this.loginAuth.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  restHeaderOption() {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      /*  'Cache-Control': 'no-cache',*/
      'Content-Type': 'application/json', 'token': this.token
    });
    this.options = {
      headers: this.headers
    };
    return this.options;
  }

  changeAuth(Auth: boolean) {
    this.loginAuth.next(Auth);
    console.log('Auth', Auth);
    console.log('currentAuth', this.currentAuth);
  }

  developOption(developType) {
    switch (developType) {
      case 'Release':
        this.apiAddress = 'http://apiinvoice.radoffice.net/';
        this.ftpAddress = 'http://invoice-test.radoffice.net:5050/';
        break;
      case 'Test':
        this.apiAddress = 'http://portal-admin-api-test.radoffice.net/';
        this.ftpAddress = 'http://invoice-test.radoffice.net:5050/';
        break;
      case 'LocalHost':
        this.apiAddress = 'http://localhost:8080/';
        this.ftpAddress = 'http://invoice-test.radoffice.net:5050/';
        break;
      case 'DirectConnect':
        /*	this.apiAddress = 'http://192.168.1.104:5001/';*/
        this.apiAddress = 'http://88.198.46.88:5050/';
        break;
    }
    console.log(developType + ' Mode is running on api :'
      + this.apiAddress + ' & '
      + developType +
      ' Mode is running on ipg :'
      + this.ipgAddress);
  }

  apiUrl(serviceName?) {
    const date = new Date();
    return this.apiAddress.concat(serviceName + '?date=' + date.getMilliseconds());
    // return this.apiAddress.concat(serviceName+'?date='+date.getMilliseconds());
  }

  apiUrlIpg(serviceName?) {
    return this.ipgAddress.concat(serviceName);
  }

  ftpUrl(serviceName?) {
    return this.ftpAddress.concat(serviceName);
  }

  handleError(error: any) {
    console.log(error);
    console.log('Catch On error Handler :', error.json());
    // this.errorReporting(error);
    return Observable.throw(error.json());
  }

  onError(res: Response) {
    return throwError(res);
  }

  getAllMarketing() {
    return this.httpClient.get(this.apiUrl('api/MarketingOffice')).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  MarketingOffice(formValue, newFlag, countryList, marketingId? ) {
    const countryArray = [];
    countryList.forEach( elm => {
      countryArray .push( elm.id);
    });
    const marketingVM = {} as MarketingVM;
    marketingVM.Name = formValue.marketingName;
    // marketingVM.AccountNumber = formValue.accountNumber;
    // marketingVM.Comment = formValue.comment;
    marketingVM.Email = formValue.email;
    marketingVM.Tel = formValue.phone;
    marketingVM.CountriesIds = countryArray;
    if (newFlag) {
      return this.httpClient.post(this.apiUrl('api/MarketingOffice'), marketingVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    } else {
      return this.httpClient.put(this.apiUrl('api/MarketingOffice/' + marketingId), marketingVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    }
  }

  getSpecialMarketingByID(marketingId) {
    return this.httpClient.get(this.apiUrl('api/MarketingOffice/' + marketingId)).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  deleteSpecialMarketing(marketingId) {
    return this.httpClient.delete(this.apiUrl('api/MarketingOffice/' + marketingId)).pipe(
      map((res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  addNewCustomer(formValue, emailList, newFlag, params) {
    debugger
    //console.log('email array ' , emailList , formValue.marketingId , formValue.countryId);
    const EmailArray = [];
    emailList.forEach( (item) => {
      const Email = {} as IEmail;
      Email.emailAddress = item;
      EmailArray.push(Email);
    });
    const customerVM = {} as CustomerVM;
    customerVM.companyName = formValue.companyName;
    customerVM.emails = EmailArray;
    customerVM.tel = formValue.phoneNumber;
    customerVM.address = formValue.address;
   // customerVM.agent = formValue.agent;
    customerVM.comment = formValue.comments;
    if (newFlag) {
      return this.httpClient.post(this.apiUrl('api/MarketingOffice/'
        + params.marketerId + '/Country/' + formValue.countryId + '/Customer'), customerVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    } else {
      return this.httpClient.put(this.apiUrl('api/MarketingOffice/'
        + params.marketerId + '/Country/' + formValue.countryId + '/Customer'), customerVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    }
  }

  getAllCustomer() {
    return this.httpClient.get(this.apiUrl('/api/customer')).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  deleteSpecialCustomer(customerId) {
    return this.httpClient.delete(this.apiUrl('api/customer/' + customerId)).pipe(
      map((res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  getSpecialCustomerByID(params:any) {
    return this.httpClient.get(this.apiUrl('api/MarketingOffice/' + params.marketingId + '/Country/' + params.countryId + '/Customer')).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  getAllCountries() {
    return this.httpClient.get(this.apiUrl('/api/Country')).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }
  deleteSpecialCountry(countryId) {
    return this.httpClient.delete(this.apiUrl('api/Country/' + countryId)).pipe(
      map((res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }
  AddNewCountry(formValue , toggle: boolean , countryId?) {
    const countryVM = {} as CountryVM;
    countryVM.Name = formValue.countryName;
    if (toggle) {
      return this.httpClient.post(this.apiUrl('api/Country'), countryVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    } else {
      return this.httpClient.put(this.apiUrl('api/Country/' + countryId), countryVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    }
  }

  getSpecialCountryByID(params:any) {
    return this.httpClient.get(this.apiUrl('api/Country/' + params.countryId)).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }


  getAllTour(customerId) {
    return this.httpClient.get(this.apiUrl('/api/Customer/' + customerId + '/Tour')).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }
  deleteSpecialTour(TourId) {
    return this.httpClient.delete(this.apiUrl('api/Tour/' + TourId)).pipe(
      map((res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  AddNewTour(formValue , customerId , toggle: boolean , TourId?) {
    const tourVM = {} as TourVm;
    tourVM.Code = formValue.TourCode;
    tourVM.Guide = formValue.TourGuide;
    tourVM.StartDate = formValue.TourStartDate;
    tourVM.EndDate = formValue.TourEndDate;
    if (toggle) {
      return this.httpClient.post(this.apiUrl('api/Customer/' + customerId + '/Tour'), tourVM).pipe(
        map((res) => res),
        catchError((response: Response) => this.onError(response))
      );
    }
  }

  getSpecialCountryByTour(customerId, tourId) {
    return this.httpClient.get(this.apiUrl('api/Customer/' + customerId + '/tour/' + tourId)).pipe(map(
      (res) => res),
      catchError((response: Response) => this.onError(response))
    );
  }

  async  AddAction(formValue , fileName , fileType, tourId) {
    const actionVM = {} as ActionVM;
    actionVM.Comment = formValue.Comment;
    actionVM.Status = +formValue.Status;
    const fileVM = {} as FileVM;
    if (formValue.File !== null) {
      fileVM.Id = await this.uploadFile(formValue.File).then();
      fileVM.Name = fileName;
      fileVM.Extension = fileType;
      actionVM.File = fileVM;
    }
    console.log('actionVM' , actionVM);
    return  this.httpClient.post(this.apiUrl('api/Tour/' + tourId + '/Task/TouristsList/Action'), actionVM).pipe(
      map((res) => res ),
      catchError((response: Response) => this.onError(response))
    );
  }

  async uploadFile(file) {
    const commitedArray = [];
    const uploadedFile = await this.httpClient.post(this.ftpUrl('api/FileUpload'), file ).toPromise().then(async (data: any) => {
        return data.FileName;
     });
    console.log('uploadedFile' , uploadedFile);
    const fileUploadVm = {} as UploadVM;
    commitedArray.push(uploadedFile);
    fileUploadVm.Files = commitedArray;
    const commited = await  this.httpClient.post(this.ftpUrl('api/MultipleFileCommit') , fileUploadVm).toPromise()
     .then(   res => {
    // console.log('commited' , res);
     });
    return  uploadedFile;
  }

  DownloadFile(fileId) {
   return this.httpClient.get(this.ftpUrl('api/Media/' + fileId) , {responseType: 'blob'} ).pipe(
        map( (res) =>   res
        ),
        catchError( (response: Response) => this.onError(response))
      );
  }
  readSpecificAction(tourId , actionId) {
    return  this.httpClient.put(this.apiUrl('api/Tour/' + tourId + '/Task/TouristsList/Action/' + actionId) , null).pipe(
      map((res) => res ),
      catchError((response: Response) => this.onError(response))
    );
  }
  readSpecificFileAction(tourId , actionId) {
    return  this.httpClient.put(this.apiUrl('api/Tour/' + tourId + '/Task/TouristsList/FileAction/' + actionId) , null).pipe(
      map((res) => res ),
      catchError((response: Response) => this.onError(response))
    );
  }


  addTourToArchiveTours(TourId) {
    return  this.httpClient.put(this.apiUrl('/api/Tour/' + TourId + '/Status/Archive') , null).pipe(
      map((res) => res ),
      catchError((response: Response) => this.onError(response))
    );
  }

}
