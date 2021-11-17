import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SudokuSolverPage } from './sudoku-solver.page';

const routes: Routes = [
  {
    path: '',
    component: SudokuSolverPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SudokuSolverPageRoutingModule {}
