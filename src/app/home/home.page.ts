import { Component } from '@angular/core';

@Component({
     selector: 'app-home',
     templateUrl: 'home.page.html',
     styleUrls: ['home.page.scss'],
})
export class HomePage {
     demoMode = false;
     readonly gridSize = 9;
     gridValues : any = [];

     constructor() {
          this.initGrid();
     }

     analyzeGrid() {
          // Validate that at least 1 cell is filled in
          let hasData = false;
          let possiblesChanged = false;

          // Validate that the grid has at least 1 cell filled in
          for (let rowCounter=0;rowCounter<this.gridSize;rowCounter++) {
               for (let columnCounter=0;columnCounter<this.gridSize;columnCounter++) {
                    if (this.gridValues[rowCounter][columnCounter][0] != "") {
                         hasData=true;
                    }
               }
          }
     
          if (hasData == false) {
               alert("Please enter the numbers you have before trying to analyze the Sudoku grid");
               return;
          }

          for (let rowCounter=0;rowCounter<this.gridSize;rowCounter++) {
               for (let columnCounter=0;columnCounter<this.gridSize;columnCounter++) {
                    if (this.gridValues[rowCounter][columnCounter][0] == "") {
                         let rowPossibles : any = [9];

                         for (let numCounter=1; numCounter<=9;numCounter++)
                              rowPossibles[numCounter-1]=numCounter.toString();

                         for (let subColumnCounter=0;subColumnCounter<this.gridSize;subColumnCounter++) {
                              for (let numCounter=1; numCounter<=9;numCounter++) {
                                   // Analyze row
                                   if (this.gridValues[rowCounter][subColumnCounter][0] == numCounter)
                                        rowPossibles[numCounter-1]="";

                                   // Analyze column
                                   if (this.gridValues[subColumnCounter][columnCounter][0] == numCounter)
                                        rowPossibles[numCounter-1]="";
                              }
                         }

                         let startSquareColumn=0;
                         let endSquareColumn=0;
                         let startSquareRow=0;
                         let endSquareRow=0;

                         if (rowCounter >=0 && rowCounter<=2) {
                              startSquareRow=0;
                              endSquareRow=2;
                         } else if (rowCounter >=3 && rowCounter<=5) {
                              startSquareRow=3;
                              endSquareRow=5;
                         } else if (rowCounter >=6 && rowCounter<=8) {
                              startSquareRow=6;
                              endSquareRow=8;
                         }

                         if (columnCounter >=0 && columnCounter<=2) {
                              startSquareColumn=0;
                              endSquareColumn=2;
                         } else if (columnCounter >=3 && columnCounter<=5) {
                              startSquareColumn=3;
                              endSquareColumn=5;
                         } else if (columnCounter >=6 && columnCounter<=8) {
                              startSquareColumn=6;
                              endSquareColumn=8;
                         }

                         for (let subColumnCounter=startSquareColumn;subColumnCounter<=endSquareColumn;subColumnCounter++) {
                              for (let subRowCounter=startSquareRow;subRowCounter<=endSquareRow;subRowCounter++) {                                   

                                   for (let numCounter=1; numCounter<=9;numCounter++) {
                                        if (this.gridValues[subRowCounter][subColumnCounter][0] == numCounter)
                                             rowPossibles[numCounter-1]="";
                                   }
                              }
                         }

                         // Build string with possible answers
                         let currentPossibles = "";

                         for (let numCounter=1; numCounter<=9;numCounter++) {
                              if (rowPossibles[numCounter-1] != "")
                                   currentPossibles+=`${rowPossibles[numCounter-1]},`
                         }

                         if (currentPossibles.endsWith(","))
                              currentPossibles=currentPossibles.slice(0,-1);

                         currentPossibles=currentPossibles.trim();

                         if (currentPossibles.length > 1) { // Changes to the title property of ion-input do not propogate down to the input element so I manipulate the title property of input instead
                              if (document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["title"] != currentPossibles)
                                   possiblesChanged=true;

                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["title"]=currentPossibles;
                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["style"].color="black";
                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["style"].fontWeight="normal";
                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["disabled"]=false;
                         } else if (currentPossibles != "") {
                              this.gridValues[rowCounter][columnCounter][0]=currentPossibles;
                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["style"].color="red";
                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["style"].fontWeight="bold";
                              document.getElementsByClassName("Item" + rowCounter + columnCounter)[0].childNodes[0]["disabled"]=true;
                         }
                    }
               }
          }

          // Check if the grid is complete
          let isComplete = true;

          for (let rowCounter=0;rowCounter<this.gridSize;rowCounter++) {
               for (let columnCounter=0;columnCounter<this.gridSize;columnCounter++) {
                    if (this.gridValues[rowCounter][columnCounter][0] == "") {
                         isComplete=false;
                    }
               }
          }
     
          if (isComplete == true) {
               setTimeout(function() {
                    alert("The Sudoku grid has been solved!");
               }, 500);
          } else if (possiblesChanged == false) {
               alert("There are no more possible solutions for this Sudoku grid");
          }
     }

     demoModeChanged() {
          if (this.demoMode == true) {
               alert("The Sudoku grid will be partially filled in. Click on the analyze button to analyze the grid. Hovering over a square will show the possible choices for that square. You can click on analyze until this application solves the puzzle or cannot find any more possible answers")
               this.loadDummyData();
          } else {
               this.initGrid();               
          }
     }

     getItemClass(rowIndex,columnIndex) {
          const className=`Item${rowIndex}${columnIndex}` 

          return className
     }

     initGrid() {
          // Clear grid values
          this.gridValues = [];

          for (let x=0;x<this.gridSize;x++) {
               this.gridValues.push([["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""]]);
          }

          // Reset possibles
          for (let rowCounter=0;rowCounter<this.gridSize;rowCounter++) {
               for (let columnCounter=0;columnCounter<this.gridSize;columnCounter++) {
                    let currentItem=document.getElementsByClassName("Item" + rowCounter + columnCounter);

                    if (currentItem .length > 0) {
                         currentItem[0].childNodes[0]["title"]="";
                         currentItem[0].childNodes[0]["style"].color="black";
                         currentItem[0].childNodes[0]["style"].fontWeight="normal";
                         currentItem[0].childNodes[0]["disabled"]=false;
                    }
               }
          }
     }

     keyPress(event) { // only allow numbers to be entered
          if (!this.demoMode && event.target.value != "") {
               const currVal=event.target.value

               if (currVal.charCodeAt(0) < 48 || currVal.charCodeAt(0) > 57)
                    event.target.value="";
          }
     }

     loadDummyData() {
          this.gridValues[0][1][0] = 7;
          this.gridValues[0][2][0] = 1;
          this.gridValues[0][3][0] = 5;
          this.gridValues[0][5][0] = 2;
          this.gridValues[0][6][0] = 3;
          this.gridValues[0][7][0] = 6;
          this.gridValues[1][2][0] = 6;
          this.gridValues[1][4][0] = 8;
          this.gridValues[1][6][0] = 5;
          this.gridValues[2][1][0] = 3;
          this.gridValues[2][4][0] = 6;
          this.gridValues[2][7][0] = 4;
          this.gridValues[3][1][0] = 2;
          this.gridValues[3][2][0] = 5;
          this.gridValues[3][3][0] = 9;
          this.gridValues[3][5][0] = 7;
          this.gridValues[3][6][0] = 4;
          this.gridValues[3][7][0] = 8;
          this.gridValues[5][0][0] = 6;
          this.gridValues[5][3][0] = 4;
          this.gridValues[5][5][0] = 5;
          this.gridValues[5][8][0] = 2;
          this.gridValues[6][0][0] = 2;
          this.gridValues[6][2][0] = 3;
          this.gridValues[6][6][0] = 8;
          this.gridValues[6][8][0] = 5;
          this.gridValues[8][0][0] = 4;
          this.gridValues[8][2][0] = 8;
          this.gridValues[8][6][0] = 2;
          this.gridValues[8][8][0] = 7;
     }

     numSequence(n: number): Array<number> {
          return Array(n);
     }

     // Used to prevent the entire DOM tree from being re-rendered every time that there is a change
     trackByFn(index, item) {
          return index; // or item.id
     }
}