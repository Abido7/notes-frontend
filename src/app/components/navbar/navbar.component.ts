import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService, private _Router:Router) {

   }

  ngOnInit(): void {
  }

  logOut(){
    this._Router.navigate(['/signin'])
    localStorage.removeItem('TOKEN');
  }
}
