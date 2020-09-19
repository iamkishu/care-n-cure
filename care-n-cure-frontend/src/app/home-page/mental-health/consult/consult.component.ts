import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { ConsultationService } from 'src/app/Services/consultation.service';
import { HomeDoctorService } from 'src/app/Services/home-doctor.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {
  doctorList: any;
  consultFlag = false;
  progressbarValue = 0;
  curSec: number = 0;
  showDialog = false;
  callFlag = false;
  doctorEmail: '';
  temp = '';
  oxy = '';
  bp = '';
  hb = '';
  chatId = '';
  apiUrl = 'https://carencure-api.azurewebsites.net';
  videoUrl = '';
  role:any;
  email:any;
  userName:any;

  constructor(public toastr: ToastrManager, private router: Router, private consultationService: ConsultationService, private homeDoctorService: HomeDoctorService) { }

  ngOnInit() {
    this.doctorTableList();
    this.showDialog = false;
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');

    console.log(this.email);
  }

  doctorTableList() {
    this.consultationService.doctorList().subscribe(
      (data: any) => {
        console.log(data);
        this.doctorList = data;
      },
      err => {
        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });

      });
  }

  videoCall(email) {
    this.showDialog = true;
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


    const body = {
      'doctorEmail': this.doctorEmail
    };
    this.consultationService.videoCallLink(body).subscribe(
      (data: any) => {
        console.log(data);
        this.chatId = data.chatId;
        this.videoUrl = this.apiUrl + '/' + this.chatId;
      });


  }


  closeDialog() {
    this.showDialog = false;
    this.doctorTableList();
  }

  onBackConsult() {
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
