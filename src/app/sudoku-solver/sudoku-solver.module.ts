import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SudokuSolverPage } from './sudoku-solver.page';

import { SudokuSolverPageRoutingModule } from './sudoku-solver-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SudokuSolverPageRoutingModule
  ],
  declarations: [SudokuSolverPage]
})
export class SudokuSolverPageModule {}
