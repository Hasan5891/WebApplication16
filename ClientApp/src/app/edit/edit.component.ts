import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../app.service';
import { Student } from '../models/Student';
import { ConfirmationDialogService } from './ConfirmationDialogService';
import { ToastService } from '../toast.service';


@Component({
  selector: 'app-edit-component',
  templateUrl: './edit.component.html',
  
})
export class EditComponent implements OnInit {
  formMode = 'Новый';
  sub: any;
  id: any;
  StForm: FormGroup;
  error: string | undefined;
  student: Student;
  isAddNew: boolean = false;

  constructor(
    public toastService: ToastService,
    private route: ActivatedRoute,

    private ServiceService: ServiceService,
   
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      // console.log('id:',this.id);
      if (this.id !== undefined) {
        console.log('begin read event');
        this.read(this.route.snapshot.paramMap.get('id'));

        this.formMode = 'Редактировать';
      } else {
        this.isAddNew = true;
        this.formMode = 'Новый';
      }
    });
    
  }


  onCreate() {
    this.create(this.StForm.value);
    }

 
  onUpdate() {
    this.update(this.StForm.value);

  }

 
  onDelee() {
    this.confirmationDialogService
      .confirm('Студент', 'Вы уверены, что хотите удалить?')
      .then((confirmed) => {
        if (confirmed) {
          this.delete(this.StForm.get('id').value);
        
        }
      })
      
  }
  
  read(id: any): void {
    this.ServiceService.getDataid(id).subscribe(resp => {

          this.student = resp;
          console.log('student-read',this.student.hire_date);
          this.StForm.setValue({
        id: this.student.id,

        name: this.student.name,
        address: this.student.address,
        hire_date: this.student.hire_date,
       
      });
    }
    );
     
    
  }
    
  delete(id: any): void {
    this.ServiceService.deleteData(id).subscribe(resp => {
    
            this.student = resp;
            this.showSuccess('Отличная работа!!', 'Данные удалены');
            this.StForm.reset();
            this.isAddNew = true;

    });}


  

 
  create(data: any): void {
    var val={d:data,Name:data.name, address:data.address,Hire_date:data.hire_date,GroupId:1}
    this.ServiceService.postData(val).subscribe((resp) => {

     this.id = resp; 
      this.showSuccess('Отличная работа!!', 'Данные вставлены');
      this.StForm.reset();
    
    });
  }
   
  update(data: any): void {
    
    var val={Id:data.id,Name:data.name, address:data.address,Hire_date:data.hire_date,GroupId:1}
    
    this.ServiceService.putDataStudent(val.Id,val);
        this.showSuccess('Отличная работа!!', 'Данные вставлены');

  }


  private createForm() {
    this.StForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      hire_date: new FormControl('', [Validators.required]),
    });

   
  }

  showSuccess(headerText: string, bodyText: string) {
    this.toastService.show(bodyText, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: headerText,
    });
  }
}
