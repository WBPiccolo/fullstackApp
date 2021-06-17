import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpServices } from './httpServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  userID = new FormControl('');

  constructor (private httpService: HttpServices){}

  accedi () {
    console.log(this.userID.value);
    const userID = this.userID.value;

    this.checkUserID(userID).subscribe((res) => {
      console.log(res)
    })
  }


  checkUserID(userID: string){
    return this.httpService.checkLogin(userID);
  }
}