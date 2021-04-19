import { Component, OnInit,ViewChild ,OnDestroy} from '@angular/core';
import { ServiceService } from '../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { SearchCriteria } from '../models/search-criteria';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from "angular-datatables";
import { timer } from 'rxjs';
@Component({
  selector: 'app-student-component',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit, OnDestroy  {
  title = 'StudentApp';
  dtOptions: DataTables.Settings = {};
 
  students: Student[];
  name: string;

  searchCriteria: SearchCriteria = { isPageLoad: true, filter: "" };
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  timerSubscription: Subscription;
  constructor( private ServiceService: ServiceService, private http: HttpClient ) {}
  data: any;
  StForm: FormGroup;
  submitted = false;
  EventValue: any = 'Save';

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria;
this.ServiceService.getAllStudentsWithPaging(dataTablesParameters).subscribe(resp => {
  this.students = resp.data;
  console.log("call getAllStudentsWithPaging");
    callback({
    recordsTotal: resp.recordsTotal,
    recordsFiltered: resp.recordsFiltered,
    data: [],
});

});
    
      },
      columns: [{data:'id'},{data:'name'},{data:'address'},{data:'hire_date'}],
    
    };

 

  
    this.getDataAll();
    
   

    this.StForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      hire_date: new FormControl('', [Validators.required]),
    });
  }
  private refreshData(): void {
    this.rerender();
     
  }
  rerender(): void {
    this.searchCriteria.isPageLoad = false;
  this.searchCriteria.filter = this.name;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
  search() {
    this.rerender();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();    
  }
 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
 
  
  getDataAll() {
    this.ServiceService.getData().subscribe((data: any[]) => {
      this.data = data;
    });
  }
  deleteData(id:number) {
    this.ServiceService.deleteData(id).subscribe((data: any[]) => {
      this.data = data;
      this.getDataAll();
    });
  }
  
  Update() {
    this.submitted = true;

    if (this.StForm.invalid) {
      return;
    }
    this.ServiceService.putDataStudent(
      this.StForm.value.id,
      this.StForm.value
    ).subscribe((data: any) => {
      this.data = data;
      this.resetFrom();
    });
  }

  EditData(Data:any) {
    this.StForm.controls['id'].setValue(Data.id);
    this.StForm.controls['name'].setValue(Data.name);
    this.StForm.controls['address'].setValue(Data.address);
    this.StForm.controls['hire_date'].setValue(Data.hire_date);

    this.EventValue = 'Update';
  }

  resetFrom() {
    this.getDataAll();
    this.StForm.reset();
    this.EventValue = 'Save';
    this.submitted = false;
  }
}
