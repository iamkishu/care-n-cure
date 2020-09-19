import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { interval } from 'rxjs/internal/observable/interval';
import { ConsultationService } from 'src/app/Services/consultation.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HomeDoctorService } from 'src/app/Services/home-doctor.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  doctorList: any;
  consultFlag = false;
  progressbarValue = 0;
  curSec: number = 0;
  showDialog = false;
  showDialog1 = false;
  presList: any;
  callFlag = false;
  doctorEmail: any;
  temp = '';
  oxy = '';
  bp = '';
  hb = '';
  chatId = '';
  apiUrl = 'https://carencure-api.azurewebsites.net';
  videoUrl = '';
  role: any;
  userName: any;
  email: any;

  constructor(public toastr: ToastrManager, private router: Router, private consultationService: ConsultationService, private homeDoctorService: HomeDoctorService) { }

  ngOnInit() {
    this.consultFlag = false;
    this.showDialog = false;
    this.showDialog1 = false;
    this.callFlag = false;

    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');

    console.log(this.email);
    this.doctorTableList();

  }

  doctorTableList() {
    this.consultationService.doctorList().subscribe(
      (data: any) => {
        console.log(data);
        if (data.length === 0) {
          this.toastr.errorToastr('No Doctors Available', 'Error!', {
            position: 'bottom-full-width', animate: 'slideFromBottom'
          });
        }
        this.doctorList = data;
      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });
  }

  onBackConsult() {
    this.router.navigateByUrl('home-page')
  }

  onConsult(email) {
    console.log(email);
    this.doctorEmail = email;
    const consultBody = {
      "patientEmail": this.email,
      'doctorEmail': this.doctorEmail

    };
    this.consultationService.consultDoctor(consultBody).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.successToastr('Doctor Booked successfully', 'Success!', {
          position: 'bottom-full-width', animate: 'slideFromRight'
        });

      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });


    setTimeout(() => {
      this.consultFlag = true;
    }, 4000);
  }

  onBackConsultBack() {
    this.consultFlag = false;
    this.progressbarValue = 0;
    this.doctorTableList();
  }

  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue = 0 + sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
      }
    });
  }


  videoCall() {
    console.log(this.temp);

    if (this.temp === '' || this.bp === '' || this.oxy === '' || this.hb === '') {
      this.toastr.errorToastr('Enter all fields', 'Error!', {
        position: 'bottom-full-width', animate: 'slideFromBottom'
      });
    }

    else {
      console.log(this.doctorEmail);
      const body = {
        'doctorEmail': this.doctorEmail
      };

      const bodyData = {
        'patientEmail': this.email,
        'temperature': this.temp,
        'bp': this.bp,
        'oxy': this.oxy,
        'heartbpm': this.hb
      };

      this.consultationService.patientVitalsDataSave(bodyData).subscribe(
        (data: any) => {
          console.log(data);

        },
        err => {
          this.toastr.errorToastr(err.message, 'Error!', {
            position: 'bottom-full-width', animate: 'slideFromBottom'
          });

        });



      this.callFlag = true;


      this.consultationService.videoCallLink(body).subscribe(
        (data: any) => {
          console.log(data);
          this.chatId = data.chatId;
          console.log(this.chatId);
          this.videoUrl = this.apiUrl + '/' + this.chatId;
        });

      setTimeout(() => {
        this.showDialog = true;
        this.callFlag = false;

      }, 2000);

    }
  }

  closeDialog() {
    this.showDialog = false;
    this.callFlag = false;
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

  onRefresh() {
    this.doctorTableList();
  }

  onPres() {
    this.showDialog1 = true;
    const presBody = {
      'email': this.email
    };

    this.consultationService.presList(presBody).subscribe(
      (data: any) => {
        console.log(data);
        this.presList = data;
      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });
  }

  closeDialog1() {
    this.showDialog1 = false;
  }

}

