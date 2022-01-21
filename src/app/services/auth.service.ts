import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;


  constructor(private http: HttpClient, private alertController: AlertController) { }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  
  getProducts():Observable<any> {
    return this.http.get(`${this.url}/api/list`);
  }

  delete(id) {
    return this.http.delete(`${this.url}/api/list/${id}`);  
  }

}
