import {  Component, OnInit } from '@angular/core';
import { Product } from '../classes/Product';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  products : Product;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getProducts().subscribe(
      data=>{
        console.log(data);
        this.products=data;
        console.log(this.products);

        for(let product of this.products.result){
          console.log(product.name);
        }
      }
    );
  }

  deleteUser(id) {
    this.authService.delete(id).subscribe(() => {
      this.products.result = this.products.result.filter(product => product._id != id)
    })
  }

 
}
