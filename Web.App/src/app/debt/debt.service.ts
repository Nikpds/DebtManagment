import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

import { Debt, User } from '../appModel';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class DebtService implements OnInit {
  private debtUrl = environment.api + 'debt';

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {

  }

  getDebts(id: string): Observable<Array<Debt>> {
    return this.auth.get(this.debtUrl + "/debts/" + id)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'))
  }
}
