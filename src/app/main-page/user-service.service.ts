import { Injectable } from '@angular/core';
import { User } from '../iuser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private currentUser : User | null = null;

  setUser(users: any)
  {
    this.currentUser = users;
  }

  getUser(): any {
    console.log(this.currentUser)
    return this.currentUser;
    
  }

   clearUser() {
     this.currentUser = null;
   }
   
   getUserModules(): any[] {
    return this.currentUser ? this.currentUser.modules : [];
  }

  constructor() { }
}
