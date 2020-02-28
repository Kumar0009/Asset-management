import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




// angular material 




import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatRadioModule } from '@angular/material/radio';

import { MatSelectModule } from '@angular/material/select';

import { MatSliderModule } from '@angular/material/slider';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material';

import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCardModule } from '@angular/material/card';

import { MatDividerModule } from '@angular/material/divider';

import { MatListModule } from '@angular/material/list';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatGridListModule } from '@angular/material/grid-list';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatBadgeModule } from '@angular/material/badge';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatRippleModule } from '@angular/material/core';

import { MatPaginatorModule } from '@angular/material/paginator';







import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';



import { ReactiveFormsModule } from '@angular/forms';



import { AppCoreModule } from './app-core/core.module';

import { CoreRoutingModule } from './_Routing/routing';




@NgModule({

  declarations: [

    AppComponent,



    // PopupComponent 

  ],

  imports: [

    BrowserModule,



    HttpClientModule,

    ReactiveFormsModule,

    BrowserAnimationsModule,




    MatSliderModule,

    MatAutocompleteModule,

    MatFormFieldModule,

    MatInputModule,

    MatRadioModule,

    MatSelectModule,

    MatSlideToggleModule,

    MatDatepickerModule,

    MatNativeDateModule,

    MatMenuModule,

    MatButtonModule,

    MatIconModule,

    MatSidenavModule,

    MatCheckboxModule,

    MatToolbarModule,

    MatCardModule,

    MatDividerModule,

    MatListModule,

    MatExpansionModule,

    MatGridListModule,

    MatButtonToggleModule,

    MatBadgeModule,

    MatProgressSpinnerModule,

    MatProgressBarModule,

    MatRippleModule,

    MatPaginatorModule,




    //Feature Module imports 

    AppCoreModule,

    CoreRoutingModule

  ],

  providers: [],

  bootstrap: [AppComponent],

  entryComponents: []

})

export class AppModule { }


