import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Classes/User';

@Injectable()
export class UserProvider {
  private readonly prefixUrl = 'http://localhost:3000/main';
  private readonly register = 'register';
  private readonly login = 'login';
  constructor(public http: HttpClient) {
  }

  registerUser(user_info: User) {
    return this.http.post(this.prefixUrl + '/' + this.register, user_info);
  }

  loginUser(user_info: User) {
    return this.http.post(this.prefixUrl + '/' + this.login, user_info);
  }


}
