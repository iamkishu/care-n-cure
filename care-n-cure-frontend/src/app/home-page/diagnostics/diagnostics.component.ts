import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDoctorService } from 'src/app/Services/home-doctor.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.scss']
})
export class DiagnosticsComponent implements OnInit {
  showDialog = false;
  constructor(private router: Router, private homeDoctorService: HomeDoctorService, private toastr: ToastrManager) { }
  role: any;
  email: any;
  userName: any;

  ngOnInit() {
    this.showDialog = false;
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
  }


  onDiagnosticsBack() {
    this.router.navigateByUrl('home-page');
  }

  onTestClick() {
    this.showDialog = true;
  }

  onLungClick() {
    this.router.navigateByUrl('xray');
  }

  onCovidClick() {
    this.router.navigateByUrl('covid');
  }

  closeDialog() {
    this.showDialog = false;
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
