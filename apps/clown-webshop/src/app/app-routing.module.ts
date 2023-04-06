import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import  {ProductComponent} from './product/product.component';
// import { FormComponent } from './form/form.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '',   redirectTo: '/home', pathMatch: 'full' },
    {path: 'about', component: AboutComponent},
    {path: 'products', component: ProductComponent},
    {path: 'products/:productId', component: ProductDetailComponent},
    {path: 'products/edit/:productId', component: ProductEditComponent},
    // {path: 'form', component: FormComponent},
    {path: 'users', component: UserComponent},
    {path: 'users/:userId', component: UserDetailComponent},
    {path: 'users/edit/:userId', component: UserEditComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
