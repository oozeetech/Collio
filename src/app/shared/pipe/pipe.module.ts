import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe, SortPipe } from './index'
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [SearchFilterPipe, SortPipe],
    providers: [],
    exports: [SearchFilterPipe, SortPipe]

})
export class PipeModule { }
