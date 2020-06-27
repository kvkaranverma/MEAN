import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    exports: [
        MatInputModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatToolbarModule,
    ]
})
export class AngularMaterialModule {

}