import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {errorRoute} from "./error/error.routes";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ActivateComponent} from "./activate/activate.component";
import {ActivateSuccessComponent} from "./activate-success/activate-success.component";
import {RegisterSuccessComponent} from "./register-success/register-success.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {DishComponent} from "./dish/dish.component";
import {DietComponent} from "./diet/diet.component";
import {RecipeAddComponent} from "./recipe-add/recipe-add.component";
import {protectedRoutesGuard} from "./core/auth/protectedRoutesGuard";
import {AboutComponent} from "./about/about.component";
import {RecipeFavouriteComponent} from "./recipe-favourite/recipe-favourite.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeAuthorComponent} from "./recipe-author/recipe-author.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home.title'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login.title'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'register.title'
  },
  {
    path: 'activate',
    component: ActivateComponent,
    title: 'activate.title'
  },
  {
    path: 'activate-success',
    component: ActivateSuccessComponent,
    title: 'activate-success.title'
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
    title: 'register-success.title'
  },
  {
    path: 'recipe/:recipeId',
    component: RecipeDetailsComponent,
    title: 'recipe-details.title'
  },
  {
    path: 'recipe-edit/:recipeId',
    canActivate: [protectedRoutesGuard],
    component: RecipeEditComponent,
    title: 'recipe-edit.title'
  },
  {
    path: 'dish/:dishName',
    component: DishComponent,
    title: 'dish.title'
  },
  {
    path: 'diet/:dietName',
    component: DietComponent,
    title: 'diet.title'
  },
  {
    path: 'recipe-add',
    canActivate: [protectedRoutesGuard],
    component: RecipeAddComponent,
    title: 'recipe-add.title'
  },
  {
    path: 'admin',
    title: 'admin-panel.title',
    loadChildren: () => import('./admin-panel/admin.routes')
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'about.title',
  },
  {
    path: 'recipe-favourite',
    canActivate: [protectedRoutesGuard],
    component: RecipeFavouriteComponent,
    title: 'recipe-favourite.title',
  },
  {
    path: 'recipe-author/:profileUrl',
    component: RecipeAuthorComponent,
    title: 'recipe-author.title',
  },
  ...errorRoute
];
