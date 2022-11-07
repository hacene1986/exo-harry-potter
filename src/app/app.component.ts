import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exo-biblio';
  Book: any;
  numberBook!: number;
  constructor() { }

  ngDoCheck(){
    console.log("heheeheh",this.numberBook);
    this.Book = JSON.parse(localStorage.getItem("basket")!)
    if(this.Book){
      this.numberBook = this.Book.length
      console.log("heheeheh",this.numberBook);
    }
  }

  ngOnInit() {
    //console.log("heheeheh",this.numberBook);
  }
}

