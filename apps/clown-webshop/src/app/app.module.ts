import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { FormComponent } from './form/form.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { NavbarComponent } from './_navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequestInterceptor } from './_helpers/http.interceptor';
import { ReviewComponent } from './review/review.component';
import { ReviewEditComponent } from './review/review-edit/review-edit.component';
import { RelatedComponent } from './product/related/related.component';
import { ShopcartComponent } from './shopcart/shopcart.component';
import { PurchaseComponent } from './shopcart/purchase/purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProductComponent,
    FormComponent,
    UserDetailComponent,
    UserEditComponent,
    HomeComponent,
    AboutComponent,
    ProductDetailComponent,
    ProductEditComponent,
    NavbarComponent,
    LoginComponent,
    ReviewComponent,
    ReviewEditComponent,
    RelatedComponent,
    ShopcartComponent,
    PurchaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
