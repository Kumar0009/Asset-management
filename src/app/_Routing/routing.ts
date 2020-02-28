import { RouterModule, Router, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent, PageNotFound, TreeHost } from '../app-core/core.module';

/* Route definations */

const ROUTES: Route[] = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {

        path: 'home', component: CoreComponent, children: [

            { path: 'all', component: TreeHost }

        ]

    },

    { path: '**', component: PageNotFound },

];




/* Routing module definations */

@NgModule({




    imports: [

        RouterModule.forRoot(ROUTES)

    ],




    exports: [RouterModule]




})

export class CoreRoutingModule {

    constructor() { console.log(this) }

} 