import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './Clients/clients/clients.component';
import { HomeComponent } from './Home/home/home.component';
import { ProductComponent } from './Product/product/product.component';
import { CartComponent } from './Cart/cart/cart.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { RegisterPageComponent } from './Register/register-page/register-page.component';
import { ProfileComponent } from './Profile/profile/profile.component';
import { NotFoundComponent } from './Error/not-found/not-found.component';

const routes: Routes = [
  {path : "", component:HomeComponent},
  {path : "admin", component : ClientsComponent},
  {path : "search/:searchTerm", component:HomeComponent},
  {path : "product/:id", component:ProductComponent},
  {path : "cart", component:CartComponent},
  {path : "login", component:LoginPageComponent},
  {path : "register", component : RegisterPageComponent},
  {path : "profile", component: ProfileComponent},
  {path : "NotFound", component : NotFoundComponent},
  {path : "**", redirectTo : "", pathMatch : "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
