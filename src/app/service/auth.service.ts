import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = "admin";

  apiUrl = environment.apiUrl;

  private userToken: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  register(firstName: string, lastName: string, email:string, password: string) {
    const endpoint = this.apiUrl + "/users/register";
    const httpParams = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    return this.http.post(endpoint, httpParams);
  }

  login(email: string, password: string) {
    const endpoint = this.apiUrl + "/users/login";
    const httpParams = {
      email: email,
      password: password
    };

    return this.http.post<{ token: string }>(endpoint, httpParams)
      .pipe(
        map(token => {
          this.userToken = token.token;
          this.storeToken();
        })
      )
  }

  logout() {
    this.userToken = undefined;
    this.clearToken();
  }

  logoutAndRedirect() {
    this.logout();
    const url = '/login';
    this.router.navigate([url]);
  }

  isLoggedIn() {
    return typeof this.userToken !== 'undefined';
  }

  private storeToken() {
    sessionStorage.setItem(this.TOKEN_KEY, <string>this.getUserToken());
  }

  getUserToken() {
    return this.userToken;
  }

  private clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  hasStoredToken() {
    // @ts-ignore
    return sessionStorage.getItem(this.TOKEN_KEY) && sessionStorage.getItem(this.TOKEN_KEY).length > 0;
  }
}
