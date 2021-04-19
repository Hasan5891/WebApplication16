
import { HttpClient} from "@angular/common/http"
import { Student } from './models/Student';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';  

@Injectable({  
  providedIn: 'root'  
})  
  


export class ServiceService {



    private apiURL: string = 'https://localhost:44325/api/Student/';

    constructor(private http: HttpClient) {

    }
    

        getData(){  
       
            return this.http.get(this.apiURL);   
          }  
          getDataid(id):Observable<any>{  
       
            return this.http.get(this.apiURL+id);   
          }  
          

  postData(formData: any){  
            return this.http.post(this.apiURL,formData);  
          }  
          
          
          putDataStudent(id:any,formData:any){  
            console.log('putDataStudent id:',id,' formdata',formData);
            return this.http.post('https://localhost:44325/api/Student/PostStudents',formData);  
          }  
            
          deleteData(id):Observable<any>{  
            return this.http.delete(this.apiURL+id);  
          }  
            
    

   

    getAllStudentsWithPaging(dtParams: any): Observable<any> {
        return this.http.put(this.apiURL, dtParams);        
    }
}
