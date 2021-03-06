import { WebStorageSerivce } from './../../services/webStorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseListService } from 'src/app/services/course-list.service';
import { WebKeyStorage } from 'src/app/global/web-key-storage';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public listCourse = [];
  constructor(
    private router: Router,
    private courseListService: CourseListService,
    private webStorageSerivce: WebStorageSerivce
  ) { }

  ngOnInit() {
    this.getDSBaiHoc();
  }

  selectCourse(id) {
    console.log(id);
    this.router.navigateByUrl('/home/main/study-quiz/' + id);
  }

  getDSBaiHoc() {
    const setting = this.webStorageSerivce.getLocalStorage(WebKeyStorage.SettingUser);
    if (setting) {
      this.courseListService.getDsBaiHoc({ id: setting.idkhoahoc }).subscribe(res => {
        if (res && res.Success) {
          this.listCourse = res.listBaiHoc;
        }
      });
    }
  }

}
