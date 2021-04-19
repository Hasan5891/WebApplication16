import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { EditComponent } from './edit/edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from './app.service';

 const routes: Routes = [
  
{ path: '/edit', component: EditComponent},
  { path: ':id', component: EditComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StudentComponent,
    EditComponent
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'student', component: StudentComponent },
      { path: 'edit', component: EditComponent }, 
      { path: 'edit/:id', component: EditComponent }, 
   
    ],{ preloadingStrategy: PreloadAllModules })
  ],
 

      
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
