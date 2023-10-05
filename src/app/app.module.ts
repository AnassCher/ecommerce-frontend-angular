import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APOLLO_FLAGS, APOLLO_OPTIONS, Apollo, ApolloModule } from 'apollo-angular';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, concat } from '@apollo/client/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphQLModule } from './graphql.module';
import { ClientsComponent } from './Clients/clients/clients.component';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { HomeComponent } from './Home/home/home.component';
import { ProductComponent } from './Product/product/product.component';
import { CartComponent } from './Cart/cart/cart.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { RegisterPageComponent } from './Register/register-page/register-page.component';
import { ProfileComponent } from './Profile/profile/profile.component';
import { NotFoundComponent } from './Error/not-found/not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule,
    ReactiveFormsModule,
   
  

   
  ],
  providers: [
    {
      provide: APOLLO_FLAGS,
      useValue: {
        useInitialLoading: true, // enable it here
      },
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const http = httpLink.create({ uri: 'http://localhost:85/graphql' });

        const authMiddleware = new ApolloLink((operation, forward) => {
          // Add the authorization to the headers
          operation.setContext({
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || null)
          });
          return forward(operation)
        });
        
        return {
          cache : new InMemoryCache(),
          link : concat(authMiddleware,http)
        }  
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
}
