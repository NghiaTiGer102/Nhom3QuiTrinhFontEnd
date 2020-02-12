import { Injectable } from '@angular/core';
import { AppService } from './app-service';
@Injectable()
export class HomeService extends AppService {
    getDsThongBao(request: any = {}) {
        return this.CallByResquestService('https://weblaptrinh.azurewebsites.net/api/thongbao/danhsachthongbao', request);
    }
}
