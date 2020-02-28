import { NgModule, Injectable, forwardRef, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { BASE_URL } from '../app.properties';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';







/** Component List
* 1. core component
* 2. tree list component
*/

/**------------------------------------------------------------------------------------------------- */
/** CoreComponent component */

@Component({
  selector: 'app-core',
  template: `
<!-- Header -->
<mat-toolbar>
  <mat-icon class="mat-menu" (click)="toggleSidenav()" aria-label="hide sidenav">menu</mat-icon>
  <span style="padding-left: 10px;">Application Logo</span>
  <span class="example-spacer"></span>

  <mat-icon [matBadge]="listCount" matBadgeColor="warn" class="example-icon" aria-hidden="false" aria-label="Example delete icon">delete</mat-icon>
  <mat-icon aria-label="Book Mark">bookmark</mat-icon>

</mat-toolbar>

<!-- SideNav container -->
<mat-sidenav-container class="example-container">
  <!-- sidenav -->
  <mat-sidenav mode="side" [opened]="isSideNavOpen">
    <!-- Tree view -->
    <tree-flat-overview-example></tree-flat-overview-example>

  </mat-sidenav>

  <mat-sidenav-content>
    <!-- Main content area -->
    <router-outlet> </router-outlet>

  </mat-sidenav-content>
</mat-sidenav-container>


<style>
  .mat-menu:hover {
    background-color: #eee;
  }

  .mat-menu:active {
    opacity: 0.5;
  }

  .example-icon {
    margin: 0 14px;
  }

  .example-spacer {
    flex: 1 1 auto;
  }



  mat-sidenav-container {
    height: 100%;

  }

  mat-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

  :host {
    /* display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column; */
    position: absolute;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  mat-sidenav {
    /* padding-right: 30px;
        padding-top: 30px; */
    width: 18%
  }

  mat-sidenav-content {
    padding-top: 10px;
  }
</style>
`
})
export class CoreComponent implements OnInit {

  public isSideNavOpen = true;

  public listCount = 0;

  public commSubscription;

  constructor(private _commService: CommunicationService) {
    this.commSubscription = this._commService.observable$.subscribe((data: number) => this.listCount = data);
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.isSideNavOpen = this.isSideNavOpen === true ? false : true;
  }

}

/**------------------------------------------------------------------------------------------------- */
/** TreeFlatOverviewExample component */


/**
* Food data with nested structure.
* Each node has a name and an optional list of children.
*/
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Users',
    children: [
      { name: 'All' },
      { name: 'Admin' },
      { name: 'Test' },
    ]
  }, {
    name: 'Configuration'

  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
* @title Tree with flat nodes
*/
@Component({
  selector: 'tree-flat-overview-example',
  template: `
<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <!-- This is the tree node template for leaf nodes -->
  <mat-tree-node (click)="select(node)" *matTreeNodeDef="let node" matTreeNodePadding>
    <!-- use a disabled button to provide padding for tree leaf -->
    <button mat-icon-button disabled></button>
    {{node.name}}
  </mat-tree-node>
  <!-- This is the tree node template for expandable nodes -->
  <mat-tree-node (click)="select(node)" *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
    <button mat-icon-button matTreeNodeToggle [attr.aria-label]="'toggle ' + node.name">
      <mat-icon class="mat-icon-rtl-mirror">
        {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
      </mat-icon>
    </button>
    {{node.name}}
  </mat-tree-node>
</mat-tree>
<style>
  mat-tree-node:hover {
    background-color: #eee;
  }

  mat-tree-node:active {
    opacity: 0.5;
  }
</style>
`
})
export class TreeFlatOverviewExample {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  select(node: ExampleFlatNode) {
    console.log(node);
    if (node.name == 'All') {
      this._router.navigate(['home/all']);
    }


  }
}

/**------------------------------------------------------------------------------------------------- */

/** Tree component */

/* User Interface def */
interface User {
  id?: number;
  name: string;
  email: string;
  phone: number;
  address: string;
}

/* data list for testing */

const USER_DATA: User[] = [{
  name: 'Test Name1',
  email: 'Test Email1',
  phone: 123456789,
  address: 'Test Address'
},
{
  name: 'Test Name2',
  email: 'Test Email2',
  phone: 123456789,
  address: 'Test Address'
},
{
  name: 'Test Name3',
  email: 'Test Email3',
  phone: 123456789,
  address: 'Test Address'
},
{
  name: 'Test Name4',
  email: 'Test Email4',
  phone: 123456789,
  address: 'Test Address'
},
]

@Component({
  selector: 'tree-host',
  template: `

  <!-- Table Header -->

  <mat-toolbar color="primary">
    <button style="margin:5px" mat-raised-button (click)="openCreateNewUserDailog()"> Create User </button>
  </mat-toolbar>

  <!-- Pop up model for user form template -->

  <ng-template #userDailogRef let-data>
    <!-- User form -->
    
    <form class='cust-form' [formGroup]='userForm'
    (ngSubmit) = 'this.editFlag ? this.submitEditForm(data.id) : this.submitUserForm()' [style.fontSize.px]="'15'">
      <mat-form-field class='cust-full-width'>
        <mat-label> Name </mat-label>
        <input formControlName = 'name' type="text" matInput>
        <mat-error *ngIf="userForm.get('name').hasError('required')"> Name is required </mat-error>
      </mat-form-field>

      <mat-form-field class='cust-full-width'>
        <mat-label> Email </mat-label>
        <input formControlName = 'email' type="email" matInput>
        <mat-error *ngIf="email.invalid"> {{EmailValidationErrors}} </mat-error>
      </mat-form-field>

      <mat-form-field class='cust-full-width'>
        <mat-label> Phone </mat-label>
        <input formControlName='phone' type="text" matInput>
      </mat-form-field>

      <mat-form-field class='cust-full-width'>
        <mat-label> Address </mat-label>
        <input formControlName='address' type="text" matInput>
      </mat-form-field>
  
      <button [disabled]='!userForm.valid' style='margin:10px'  mat-raised-button type="submit"> Submit </button>
      <button mat-raised-button type="reset" style='margin:10px'> Reset </button>
      <button mat-raised-button type='button' (click)="this._dailog.closeAll(); this.editFlag = false; this.userForm.reset()" > Cancel </button>
    </form>
  </ng-template>

  <!-- Table defination -->
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
    <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> name </th>
      <td mat-cell *matCellDef="let element"> {{element.name}} </td>
    </ng-container>

    <!-- email Column -->
    <ng-container matColumnDef="email">
      <th mat-header-cell *matHeaderCellDef> email </th>
      <td mat-cell *matCellDef="let element"> {{element.email}} </td>
    </ng-container>

    <!-- phone Column -->
    <ng-container matColumnDef="phone">
      <th mat-header-cell *matHeaderCellDef> phone </th>
      <td mat-cell *matCellDef="let element"> {{element.phone}} </td>
    </ng-container>

    <!-- address Column -->
    <ng-container matColumnDef="address">
      <th mat-header-cell *matHeaderCellDef> address </th>
      <td mat-cell *matCellDef="let element"> {{element.address}} </td>
    </ng-container>

    <!-- edit and delete column -->
   <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let row"> 
        <button (click)="deleteUserById(row.id)" mat-icon-button aria-label="Delete an item">
         <mat-icon>delete</mat-icon>
        </button> 
        <button (click)="openEditDailog(row)" mat-icon-button aria-label="edit a item">
         <mat-icon>edit</mat-icon>
        </button>
      </td>
   </ng-container>

    <tr mat-header-row *matHeaderRowDef="tableColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: tableColumns;"></tr>
  </table>

  <!-- paginator template -->

  <mat-paginator (page) = "pageChangeEvent($event)" class="mat-elevation-z8"   [pageSizeOptions] = "[10,20,30]"> </mat-paginator>


  <style>
    table , mat-paginator {
      width: 90%;
      margin: 50px auto 2px auto;
    }

    .cust-form {
      min-width: 200px;
      max-width: 500px;
      width: 100%;
    }

    .cust-full-width {
      width: 45%;
      padding: 0 5px;
    }
  </style>
  `,
})
export class TreeHost implements OnInit, OnDestroy {
  /* table data source */
  public dataSource: MatTableDataSource<User>;
  /* table columns */
  public tableColumns = ['name', 'email', 'phone', 'address', 'actions'];
  /* data source observable subscription */
  public subscription;
  /* edit flag  */
  public editFlag = false;

  public matDailogRef: MatDialogRef<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  /* get reference of the user form dailog */
  @ViewChild('userDailogRef', { read: TemplateRef, static: false }) userDailogTemplate: TemplateRef<any>;
  /* user form data structure */
  public userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    address: new FormControl('')
  });
  /* init tree host with user service and mat-dailog reference */
  constructor(private _userService: UserService,
    private _dailog: MatDialog,
    private _matSnakBar: MatSnackBar,
    private _commService: CommunicationService) {


  }

  /* initilize the component by getting data from the server */
  ngOnInit() {
    this.getAllUsers();
  }

  openSnakBar(message: string, action: string = "Dismiss") {
    this._matSnakBar.open(message, action, { duration: 2000 });
  }


  getAllUsers() {
    this.subscription = this._userService.getAllUsers()
      .subscribe(
        (data: User[]) => {
          console.log(data);
          console.log('get all users successfull')
          this.dataSource = new MatTableDataSource<User>(data);
          this.dataSource.paginator = this.paginator;

          this._commService.sendMessageToSubscribers(this.dataSource.data.length);
          this.openSnakBar('get all users successfull');
          // this.paginationProp.length = this.dataSource.length;
          /* initilize the paginator based on the number of items returned */
        },
        (error: any) => {
          console.log('failed to get all the users');
          this.openSnakBar('get all users Failed');
        });
  }

  /** 1.open edit dailog
   *  2.set edit flag
   * 
   */
  openEditDailog(row) {
    this.editFlag = true;
    /* open the dailog */
    this.matDailogRef = this._dailog.open(this.userDailogTemplate, { data: { id: row.id }, disableClose: true });
    /* remove id */
    delete row.id;
    /* load the form from the row */
    this.userForm.setValue(row);
  }
  /**1 submit edit form
   * 2 reload all items || find and replace the edited item
   * 3 unset edit flag
   */
  submitEditForm(id: number) {

    this._userService.editUser(this.userForm.value, id)
      .subscribe(
        /* successfull edit */
        (data) => {
          /* intimate user  */
          this.openSnakBar("successfully edited the user");
          console.log(data);
          /* load all users */
          this.getAllUsers();
          /* unset the edit flag */
          this.editFlag = false;
          /* close the edit dailog */
          this.matDailogRef.close();
          /* clear the edit form */
          this.userForm.reset();
        },
        /* falied to submit the edit */
        (error) => {
          /* intimate the user */
          this.openSnakBar("User does not Exists!!!");
          /* TODO: impliment error handling in service using catchError & retry ...
           handle rest transaction error in service  */
          /*  */
          /* unset the edit flag */
          this.editFlag = false;

          /* close the edit dailog */
          this.matDailogRef.close();
          /* clear the form after submit */
          this.userForm.reset();
        })
  }
  /** post data to REST API 
   * get response back 
   * show success message in the snakbar
   * show spinner during REST transactions
   * listen to http events
   * update the table if nessary
   * handle rest transaction error in service
   * 
   */



  /* open a dailog */
  openCreateNewUserDailog() {
    this.matDailogRef = this._dailog.open(this.userDailogTemplate, { disableClose: true });
  }
  /* post data to Rest API */
  submitUserForm() {
    this._userService.createNewUser(this.userForm.value)
      .subscribe(
        (data) => {
          this.openSnakBar('user created successfully');
          this.matDailogRef.close();
          /* get all users again */
          this.getAllUsers();
          /* update the global count */
          this._commService.sendMessageToSubscribers(this.dataSource.data.length);
          /* clear the form after submit */
          this.userForm.reset();
          console.dir(data);
        },
        (error: any) => {
          this.openSnakBar('user created Failed');
        });
  }

  get email() {
    return this.userForm.get('email') as FormControl;
  }

  get EmailValidationErrors() {
    return this.userForm.get('email').hasError('required') ? 'Email is required' : this.userForm.get('email').hasError('email') ? 'Enter a Valid email' : '';
  }

  deleteUserById(id: number) {

    this._userService.deleteUser(id)
      .subscribe((data) => {
        /* display the snakbar */
        this.openSnakBar("deleted user successfully");
        /* reload users or filter the deleted user from the list */
        this.getAllUsers();
        /* decriment the global listcount */

      },
        (error) => {
          /* display error snakbar */
          this.openSnakBar("Not able to delete the user");
        })
  }



  pageChangeEvent(pageEvent: EventEmitter<PageEvent>) {
    console.log(pageEvent);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


@Component(
  { template: ` <h3> Page Not Found </h3> ` }
)
export class PageNotFound {

}





@NgModule({
  declarations: [
    CoreComponent,
    TreeFlatOverviewExample,
    TreeHost/* tree-host */,
    PageNotFound],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    /* matireal modules */
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatBadgeModule



  ],
  exports: [CoreComponent],
  providers: []

})
export class AppCoreModule { }


/* User Service */

@Injectable({ providedIn: AppCoreModule })
export class UserService {
  /* Base url for making requests for the server */
  private _baseUrl = BASE_URL;
  /* http headers */
  private _httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  /* initialize User service with dependencies */
  constructor(private _httpClient: HttpClient) {
    console.log(this);
    this._httpOptions.set('Content-Type', 'application/json');
  }
  /* Return all users */
  getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this._baseUrl}/users`);
  }
  /* Get user by ID */
  getUserById(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this._baseUrl}/users/${id}`);
  }
  /* Create new user  */
  createNewUser(user: User): Observable<HttpResponse<User>> {
    return this._httpClient
      .post<User>(`${this._baseUrl}/users`, JSON.stringify(user), { headers: this._httpOptions, observe: 'response', reportProgress: true });
  }
  /* edit a user */
  editUser(user: User, id: number): Observable<User> {
    return this._httpClient
      .put<User>(`${this._baseUrl}/users/${id}`, JSON.stringify(user), { headers: this._httpOptions });
  }
  /* delete a user */
  deleteUser(id: number): Observable<any> {
    return this._httpClient.delete<User>(`${this._baseUrl}/users/${id}`);
  }

}

/* Communication service */

@Injectable({ providedIn: AppCoreModule })
export class CommunicationService {

  private subject$ = new Subject();

  public observable$ = this.subject$.asObservable();

  constructor() {
    console.log(this);
  }

  sendMessageToSubscribers(length: number) {
    this.subject$.next(length);
  }

}