import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HomeDoctorService } from 'src/app/Services/home-doctor.service';
import { Router } from '@angular/router';
import { XrayService } from 'src/app/Services/xray.service';

@Component({
  selector: 'app-xray',
  templateUrl: './xray.component.html',
  styleUrls: ['./xray.component.scss']
})
export class XrayComponent implements OnInit {
  role: any;
  email: any;
  userName: any;
  imageSrc: any;
  filesCsv: any;
  imgFlag = false;
  resultFlag = false;
  showDialog = false;
  public fuploadFile: File;
  probablity: any = 0;
  tag: any =  '';
  spinnerFlag = false;
  // files: File;

  constructor(private toastr: ToastrManager, private homeDoctorService: HomeDoctorService, private router: Router,
    private xrayService: XrayService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
    this.imgFlag = false;
    this.resultFlag = false;
    this.showDialog = false;
this.probablity = 0;
this.spinnerFlag = false;

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

  onXrayBack() {
    this.router.navigateByUrl('diagnostics');
  }

  readURL(files): void {
    console.log(files.length);
    if (files.length > 0) {
      this.imgFlag = true;
      this.fuploadFile = files[0];

      const reader = new FileReader();

      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(this.fuploadFile);
      // console.log( reader.readAsDataURL(this.fuploadFile))

      this.fuploadFile = files.item(0);
      console.log(this.fuploadFile);

    }
  }

  onUpload() {
    this.spinnerFlag = true;
    const payLoad = {
      file: this.fuploadFile
    };

    this.xrayService.xrayUpload(payLoad).subscribe((res) => {
      console.log(res.predictions.length);
      if (res.predictions.length !== 0) {
        this.resultFlag = true;
        for (let i = 0; i < res.predictions.length; i++) {
          console.log(typeof (res.predictions[i].probability));
          if(res.predictions[i].probability > 0) {
            if(this.probablity < res.predictions[i].probability) {
              this.probablity = res.predictions[i].probability;
              this.tag =  res.predictions[i].tagName;
            }
          }
        }
        this.spinnerFlag = false;
        this.toastr.successToastr('Image File Uploaded. Please wait.', 'Success!', {
          position: 'bottom-full-width', animate: 'slideFromBottom'
        });
      }




    },
      err => {

        this.toastr.errorToastr(err.message, 'Error!', {
          position: 'bottom-full-width', animate: 'slideFromRight'
        });
      });
  }

  a() {
    this.imageSrc = '';
    this.filesCsv = '';
    this.imgFlag = false;
    this.resultFlag = false;
  }

  onView() {
    this.showDialog = true;
console.log(this.tag);
  
  }


  closeDialog() {
    this.showDialog = false;
  }
}
