import { Injectable } from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';
import {filter, pairwise} from 'rxjs/operators';

@Injectable()
export class PreviousRouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {
      // console.log(e[0].urlAfterRedirects); // previous url
      this.previousUrl = e[0].urlAfterRedirects;
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
