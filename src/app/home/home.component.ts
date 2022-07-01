import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  isLoggedIn!:boolean;
  loggedInUser!:string;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.loggedInUser=auth.email!;
      }else{
        this.isLoggedIn=false;
      }
    });
  }

}
