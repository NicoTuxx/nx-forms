import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NxInputComponent } from './nx-input/index';
import { NxSelectComponent } from './nx-select/index';
import { NxDateComponent } from './nx-date/index';
import { NxDatalistComponent } from './nx-datalist/index';
import { AssetService } from './asset.service';
import 'rxjs/add/operator/map';

export * from './asset.service';
export * from './tools';
export * from './nx-input/index';
export * from './nx-select/index';
export * from './nx-date/index';
export * from './nx-datalist/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    NxInputComponent,
    NxDateComponent,
    NxDatalistComponent,
    NxSelectComponent
  ],
  providers: [
    AssetService
  ],
  exports: [
    NxInputComponent,
    NxDateComponent,
    NxDatalistComponent,
    NxSelectComponent
  ]
})
export class NxFormsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NxFormsModule,
      providers: [AssetService]
    };
  }
}
