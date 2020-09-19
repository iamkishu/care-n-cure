import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentalHealthService } from 'src/app/Services/mental-health.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HomeDoctorService } from 'src/app/Services/home-doctor.service';


@Component({
  selector: 'app-mental-health',
  templateUrl: './mental-health.component.html',
  styleUrls: ['./mental-health.component.scss']
})
export class MentalHealthComponent implements OnInit {
  showDialog = false;
  logList: any;
  log: string
  role: any;
  userName: any;
  email: any;

  constructor(private router: Router, private mentalService: MentalHealthService, private toastr: ToastrManager,private homeDoctorService : HomeDoctorService) { }

  ngOnInit() {
    this.showDialog = false;
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');

    console.log(this.email);
    
  }

  onConsultClick() {
    this.router.navigateByUrl('consult');
  }

  onMeditationClick() {
    this.router.navigateByUrl('meditation');
  }

  onMentalGameClick() {
    this.router.navigateByUrl('brain-games');
  }

  onMentalBack() {
    this.router.navigateByUrl('home-page')
  }

  onDiary() {
    this.showDialog = true;

    this.patientLogList();

  }

  patientLogList() {

    const bodyData = {
      'patientEmail': this.email,
    };

    this.mentalService.logList(bodyData).subscribe(
      (data: any) => {
        console.log(data);
        this.logList = data;

      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });

  }

  closeDialog() {
    this.showDialog = false;
  }

  onLog() {
    console.log(this.log);
    if (this.log === undefined) {
      this.toastr.errorToastr('Please Enter Something', 'Error!', {
        position: 'bottom-full-width', animate: 'slideFromBottom'
      });
    }
    else {

      const logBody = {
        'patientEmail': this.email,
        'activity': this.log

      };
      this.mentalService.log(logBody).subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.successToastr('Log Saved Successfully', 'Success!', {
            position: 'bottom-full-width', animate: 'slideFromRight'
          });
          this.log = '';
        },
        err => {
          this.toastr.errorToastr(err.message, 'Error!', {
            position: 'bottom-full-width', animate: 'slideFromBottom'
          });

        });
      setTimeout(() => {
        this.patientLogList();
      }, 1500);

    }
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
