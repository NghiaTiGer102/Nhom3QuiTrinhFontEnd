import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginRequestModel } from '../models/login-request.model';
import { Router } from '@angular/router';
import { TaiKhoanService } from '../services/tai-khoan.service';
import { WebStorageSerivce } from '../services/webStorage.service';
import { WebKeyStorage } from '../global/web-key-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/*
  Ngày review: 2/1/2020
  Thành viên code: Huỳnh Quang Minh
  Thành viên review: Trần Hữu Nghĩa
  Thành viên sửa lỗi: 
  Tình trạng: không có lỗi
*/
export class LoginComponent implements OnInit {
  loginModel = new LoginRequestModel();
  formLogin: NgForm;
  isLoginPass = true;
  constructor(
    private router: Router,
    private taiKhoanService: TaiKhoanService,
    private webStorageSerivce: WebStorageSerivce
  ) { }

  ngOnInit() {
  }
  submitLogin() {
    this.taiKhoanService.login(this.loginModel).subscribe(result => {
      if (result && result.Success) {
        // this.router.navigateByUrl('/home/display-setting');
        this.webStorageSerivce.setLocalStorage(WebKeyStorage.AccountInfo, result.accountLogin);
        this.taiKhoanService.getDanhSachThongTinTaiKhoan({ idAccount: result.accountLogin.id }).subscribe(res => {
          if (res && res.Success) {
            this.webStorageSerivce.setLocalStorage(WebKeyStorage.SettingUser, res.thongTinTaiKhoan);
            this.router.navigateByUrl('/home/main/course-list');
          } else {
            this.router.navigateByUrl('/home/display-setting');
          }
        });
        this.isLoginPass = true;
      } else {
        this.isLoginPass = false;
      }
    });
  }

}
