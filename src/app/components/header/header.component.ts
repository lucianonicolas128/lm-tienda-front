import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public cart;  

  constructor() { }

  ngOnInit(): void {
    this.cartElements();
  }

  cartElements(){
    this.cart = localStorage.length;
    // this.ngOnInit();
  }

}
