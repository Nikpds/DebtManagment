import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslationModule, LocalizationModule, LocaleValidationModule, LocaleService, TranslationService } from 'angular-l10n';


import { PaginationComponent } from './pagination/pagination.component';

import { LoaderService } from './loader.service';
import { UtilityService } from './utility.service';
import { PaginationService } from './pagination.service';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    TranslationModule.forRoot(),
    LocalizationModule.forRoot(),
    LocaleValidationModule.forRoot()
  ],
  declarations: [
    PaginationComponent
  ],
  providers: [
    LoaderService,
    UtilityService,
    PaginationService
  ],
  exports: [
    NgxPaginationModule,
    PaginationComponent,
    TranslationModule,
    LocalizationModule,
    LocaleValidationModule
   
  ]

})
export class SharedModule {
  constructor(public locale: LocaleService, public translation: TranslationService) {
    this.locale.addConfiguration()
      .addLanguages(['en', 'el'])
      .defineLanguage('el');

    this.translation.addConfiguration()
      .addProvider('./assets/locale-');

    this.translation.init();
  }
 }
