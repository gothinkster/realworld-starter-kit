import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './+state/auth.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([AuthState])]
})
export class DataAccessModule {}
