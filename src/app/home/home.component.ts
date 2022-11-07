import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
books:any = [];
book: any;
basket: any = [];
showModal:  boolean = false;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  //Get all books
  getBooks(){
    this.dataService.getAllBooks()
     .subscribe((data:any) => {
      console.log(data);
      this.books = data;
     })
  }

  //Modal show book
  openModalWithBook(isbn: any){
    let book = this.books.filter((book:any)=> book.isbn == isbn)
    this.book = book;
    console.log(book);
    this.toggleModal()
  }

  //Modal Controll
  toggleModal(){
    this.showModal = !this.showModal;
  }

  //Add in the basket
  addBasket(book:any){
    this.basket.push(book);
    console.log("basket", this.basket);
    localStorage.setItem("basket", JSON.stringify(this.basket));
    this.toggleModal()
  }

}
