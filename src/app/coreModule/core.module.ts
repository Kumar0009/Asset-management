import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material imports
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';

import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';




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
    <span  style="padding-left: 10px;">Application Logo</span>
    <span class="example-spacer"></span>

    <mat-icon class="example-icon" aria-hidden="false" aria-label="Example delete icon">delete</mat-icon>
    <mat-icon aria-label="Book Mark">bookmark</mat-icon>

</mat-toolbar>

<!-- SideNav container -->
<mat-sidenav-container class="example-container">
    <!-- sidenav -->
    <mat-sidenav mode = "side" [opened]="isSideNavOpen">
        <!-- Tree view -->
        <tree-flat-overview-example></tree-flat-overview-example>

    </mat-sidenav>

    <mat-sidenav-content>
        Main content
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
        padding: 0 14px;
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

    mat-sidenav{
        /* padding-right: 30px;
        padding-top: 30px; */
        width: 18%
    }

    mat-sidenav-content{
        padding-top: 10px;
    }
</style>
  `
})
export class CoreComponent implements OnInit {

  isSideNavOpen = true;

  constructor() {

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
  <mat-tree-node  (click) = "select(node)" *matTreeNodeDef="let node" matTreeNodePadding>
    <!-- use a disabled button to provide padding for tree leaf -->
    <button mat-icon-button disabled></button>
    {{node.name}}
  </mat-tree-node>
  <!-- This is the tree node template for expandable nodes -->
  <mat-tree-node (click) = "select(node)" *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
    <button mat-icon-button matTreeNodeToggle
            [attr.aria-label]="'toggle ' + node.name">
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

mat-tree-node:active{
  opacity : 0.5;
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

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  select(node) {
    console.log(node);
  }
}

/**------------------------------------------------------------------------------------------------- */




@NgModule({
  declarations: [CoreComponent , TreeFlatOverviewExample],
  imports: [
//core  module
    CommonModule,
//  matireila imports
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    MatButtonModule,
  ],
  exports: [CoreComponent],
  providers: []

})
export class AppCoreModule { }