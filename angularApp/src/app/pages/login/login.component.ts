import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpServices } from '../../httpServices';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor (
    private httpService: HttpServices, 
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
  }
  userID = new FormControl('');


  accedi () {
    console.log(this.userID.value);
    const userID = this.userID.value;

    this.spinner.show();
    setTimeout(() => {
      this.checkUserID(userID).subscribe((res) => {
        console.log(res.result)

        if(res.result){
          //this.spinner.hide();
          localStorage.setItem('user',JSON.stringify(res.result));
          this.router.navigateByUrl('/shopping-cart');
        } else {
          console.log('ko');
        }
        this.spinner.hide();

      });
    },0);
  }


  checkUserID(userID: string){
    return this.httpService.checkLogin(userID);
  }
}
