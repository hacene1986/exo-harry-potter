import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  bookBasket: any = [];
  calcul: any = [];
  reductionEnssembleBooks: any;
  reductionPayementCaisse:any;
  reductionTranche: any;
  offre: any;
  prixAllBooks:number = 0;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.bookBasket = JSON.parse(localStorage.getItem("basket")!);
    console.log("basket loaded--------------------------------", this.bookBasket);
    this.getCalcule();
    
  }

  //Calculates 
  getCalcule(){
    let identifiants = [];
    if(this.bookBasket){
      for (let i = 0; i < this.bookBasket.length; i++){
        identifiants.push(this.bookBasket[i].isbn);
        this.calcul = identifiants;
        this.prixAllBooks += this.bookBasket[i].price;      ; 
      }
  
      //get the offers
      this.http.get("http://henri-potier.xebia.fr/books/" + this.calcul.toString() + "/commercialOffers").subscribe((res:any) =>{
        //console.log(res);
        this.offre = res;
        console.log(this.offre);
        this.calculEnssembleLivre(this.offre.offers);
        if(this.offre.offers.length > 1)
        this.calculPaiementCaisse(this.offre.offers);
        if(this.prixAllBooks >= 100) {
          this.calculeReductionTranche(this.offre.offers);
        }
          
      })
    }
 
  }

  //calcule reduction All books
  calculEnssembleLivre(offers:any){
    this.reductionEnssembleBooks = this.prixAllBooks - offers[0].value;
    console.log(this.reductionEnssembleBooks);
  }

  //calcule reduction Paiement Caisse
  calculPaiementCaisse(offers:any){
    this.reductionPayementCaisse = this.prixAllBooks - offers[1].value;
    console.log(this.reductionPayementCaisse);
  }

  //calcul reduction tranches
  calculeReductionTranche(offers:any){
    this.reductionTranche = this.prixAllBooks - offers[2].value;
    console.log(this.reductionTranche);
    
  }

  //Vider le pannier
  viderPannier(){
    this.bookBasket = null;
    localStorage.removeItem('basket');
    window.location.reload();
  }
}
