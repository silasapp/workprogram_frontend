import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  AuthenticationService,
  GenericService,
  ModalService,
} from '../services';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private genk: GenericService,
    private userdat: ModalService,
    private locate: Location,
    private router: Router
  ) {}

        }
        if (err.status === 400) {
          debugger;
          const head = 'An error occurred';
          //this.userdat.logYawa(err.error.message, head);
          return EMPTY;
        }
        return EMPTY;
      })
    );
  }
}
