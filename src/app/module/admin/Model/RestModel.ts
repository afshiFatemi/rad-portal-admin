
export interface CustomerVM {
  companyName: string;
  agent: string;
  country: string;
  address: string;
  emails: string[];
  tel: string;
  comment: string;
  MarketingOfficeId: string;
}
export interface MarketingVM {
  Name: string;
  Email: string;
  Tel: string;
  Comment: string;
  Id: string;
  AccountNumber: string;
  CountriesIds: string[];
}
export interface TourVm {
  Code: string;
  Guide: string;
  StartDate: string;
  EndDate: string;
}
export interface CountryVM {
  Name: string;

}

export interface ActionVM {
  Comment: string;
  Status: number;
  File: FileVM;

}
export interface FileVM {
    Id: string;
    Name: string;
    Extension: number;
}

export  class UploadVM {
  Files: string[];
}
export interface IEmail {
  emailAddress: string;
}

export const  ActionStatusIcon = [
  {status: 0 , icon : 'fa fa-bomb' , StatusName : 'Warning' , color: '#dada5ddb'},
  {status: 1 , icon : 'fa fa-asterisk ',  StatusName : 'Revise' , color: 'green'},
  {status: 2 , icon : 'fa fa-times-circle' ,  StatusName : 'Rejected' , color: '#b94c38e0'},
  {status: 3 , icon : 'fa fa-pause-circle',  StatusName : 'Pending' , color: '#98cb95'},
  {status: 4 , icon : 'fa fa-check-circle ' ,  StatusName : 'Confirmed' , color: 'green'},
  {status: 5 , icon : 'fa fa-info-circle ' ,  StatusName : 'Info' , color: 'rgb(16, 87, 109)'},
]

