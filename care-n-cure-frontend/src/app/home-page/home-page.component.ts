import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDoctorService } from '../Services/home-doctor.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private homeDoctorService: HomeDoctorService, private toastr: ToastrManager) { }
  role: any;
  userName: any;
  email: any;
  doctorFlag = false;
  patientFlag = false;
  chatId: any;
  patientEmail: any;
  patientName: any;
  patientListArray: any;
  showDialog = false;
  showDialog1 = false;
  showDialog2 = false;
  apiUrl = 'https://carencure-api.azurewebsites.net';
  videoUrl = '';
  prescription: string;
  buttonFlag = false;

  ngOnInit() {
    this.showDialog = false;
    this.showDialog1 = false;
    this.showDialog2 = false;
    this.buttonFlag = false;
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');

    console.log(this.role + this.email + this.userName);

    if (this.role === 'Doctor') {
      this.doctorFlag = true;
      this.patientFlag = false;
      this.patientLogList();
    }

    if (this.role === 'Patient') {
      this.doctorFlag = false;
      this.patientFlag = true;
    }
  }

  onConsultationClick() {
    console.log('clicked');
    this.router.navigateByUrl('consultation');
  }

  onMentalHealthClick() {
    this.router.navigateByUrl('mental-health');
  }

  onLabClick() {
    this.router.navigateByUrl('diagnostics');
  }

  patientLogList() {
    console.log(this.email);

    const bodyData = {
      'doctorEmail': this.email,
    };

    this.homeDoctorService.patientList(bodyData).subscribe(
      (data: any) => {
        console.log(data.length);
        if (data.length === 0) {
          this.buttonFlag = false;
          this.toastr.errorToastr('No Patient Available', 'Error!', {
            position: 'bottom-full-width', animate: 'slideFromBottom'
          });
          this.patientEmail = '';
          this.patientName = '';

        }
        else {
          this.buttonFlag = true;
        }

        this.chatId = data[0].chatId;
        this.patientName = data[0].patientName;
        this.patientEmail = data[0].patientEmail;
        console.log(this.patientName);
        console.log('got');
      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });

    setTimeout(() => {
      this.patientVitalList();
    }, 1500);
  }

  patientVitalList() {
    console.log('called');
    console.log(this.patientEmail);
    if (this.patientEmail === undefined) {
      this.patientLogList();
    }
    else {

      const bodyData = {
        'patientEmail': this.patientEmail,
      };

      this.homeDoctorService.patientVital(bodyData).subscribe(
        (data: any) => {
          console.log(data);
          this.patientListArray = data;
        },
        err => {
          this.toastr.errorToastr(err.message, 'Error!', {
            position: 'bottom-full-width', animate: 'slideFromBottom'
          });

        });
    }
  }

  prescribe() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  closeDialog1() {
    this.showDialog1 = false;
  }

  connect() {
    this.showDialog1 = true;
    this.videoUrl = this.apiUrl + '/' + this.chatId;
  }

  onLog() {

    if (this.prescription === undefined) {
      this.toastr.errorToastr('Please Enter Something', 'Error!', {
        position: 'bottom-full-width', animate: 'slideFromBottom'
      });
    }
    else {

      const logBody = {
        'patientEmail': this.patientEmail,
        'prescription': this.prescription

      };
      this.homeDoctorService.logPrescribe(logBody).subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.successToastr('Prescription Saved Successfully', 'Success!', {
            position: 'bottom-full-width', animate: 'slideFromRight'
          });
          this.prescription = '';
        },
        err => {
          this.toastr.errorToastr(err.message, 'Error!', {
            position: 'bottom-full-width', animate: 'slideFromBottom'
          });

        });

    }

  }

  endSession() {
    this.showDialog2 = true;
  }

  closeDialog2() {
    this.showDialog2 = false;
  }

  onNo() {
    this.showDialog2 = false;
  }


  onYes() {

    console.log(this.email);
    const endBody = {
      'doctorEmail': this.email

    };
    this.homeDoctorService.endSession(endBody).subscribe(
      (data: any) => {
        console.log(data);
        setTimeout(() => {
          console.log('loading')
          this.patientLogList();
          this.showDialog2 = false;
        }, 1500);
        this.toastr.successToastr('Session Ended Successfully', 'Success!', {
          position: 'bottom-full-width', animate: 'slideFromRight'
        });

      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });


  }

  onRefresh() {
    this.patientLogList();
  }

  goToLink(url: string) {
    console.log(url);
    window.open(url, "_blank");
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

