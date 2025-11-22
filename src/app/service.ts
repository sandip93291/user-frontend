import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './constant/env';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private currentUserRole = ''
  private currentUserId = ''
  private currentName = ''

  // ---------- ROLE ----------
  setUserRole(role: string) {
    this.currentUserRole = role;
  }

  getUserRole(): string {
    return this.currentUserRole;
  }

  // ---------- ID ----------
  setUserId(id: string) {
    this.currentUserId = id;
  }

  getUserId(): string {
    return this.currentUserId;
  }

  // ---------- NAME ----------
  setName(name: string) {
    this.currentName = name;
  }

  getName(): string {
    return this.currentName;
  }
  
  constructor(private http: HttpClient) { }

  // Call API to get user by ID
  getUserById(id: string, role: string): Observable<any> {

    // Read token from cookie using document.cookie
    const token = this.getCookie('UserSession');

    // Set headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make API call
    return this.http.get<any>(`${environment.serviceHot}/${role}/users/${id}`, { headers });
  }

  saveUser(user: any, role: string): Observable<any> {

    // Get token from cookie
    const token = this.getCookie('UserSession');

    // Headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (user.id && user.id !== '0') {
      // Update user
      return this.http.put<any>(`${environment.serviceHot}/${role}/users/${user.id}`, user, { headers });
    } else {
      // Create user
      return this.http.post<any>(`${environment.serviceHot}/${role}/users`, user, { headers });
    }
  }

  login(username: string, password: string): Observable<any> {
    const req = {
      "identifier": username,
      "password": password
    }
    return this.http.post<any>(`${environment.serviceHot}/auth/login`, req);
  }

  public setUserSessionCookie(key: string, value: string, path: string = '/', maxAge: number = 3600) {
    if (key && value) {
      document.cookie = `${key}=${encodeURIComponent(value)}; path=${path}; max-age=${maxAge}; secure`;
    }
  }

  public removeUserSessionCookie(key: string, path: string = '/') {
    document.cookie = `${key}=; path=${path}; max-age=0; secure`;
  }

  getUsers(page: number = 1, role: string): Observable<any> {

    // Get token using document.cookie
    const token = this.getCookie('UserSession');

    // Params
    const params = new HttpParams().set('page', page);

    // URL
    const url = `${environment.serviceHot}/${role}/users`;

    // Add token in header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(url, {
      params,
      headers
    });
  }

  public getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()!.split(';')[0];
    }
    return '';
  }
}
