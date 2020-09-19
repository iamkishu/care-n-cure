import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDoctorService } from 'src/app/Services/home-doctor.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.scss']
})
export class MeditationComponent implements OnInit {
  role: any;
  email: any;
  userName: any;

  constructor(private router: Router,private homeDoctorService :HomeDoctorService, private toastr : ToastrManager) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
  }

  onBack(){
    this.router.navigateByUrl('mental-health');
  }

  onLogout() {
    const logoutBody = {
      'email': this.email
    };

    this.homeDoctorService.logOut(logoutBody).subscribe(
      (data: any) => {
        console.log(data);
        setTimeout(() => {
          console.log('loading')
          localStorage.clear();
          // Go back to the home route
          this.router.navigateByUrl('login');
        }, 1500);
        this.toastr.successToastr('Logged Out Successfully', 'Success!', {
          position: 'bottom-full-width', animate: 'slideFromRight'
        });

      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });


  }

  
}
