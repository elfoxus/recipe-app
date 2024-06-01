import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, filter, zip} from "rxjs";
import {DishGetModel} from "../shared/dto/dish-get.model";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {RecipeService} from "../shared/services/recipe.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslationDirective} from "../shared/translation/translation.directive";
import {HlmIconComponent} from "@spartan-ng/ui-icon-helm";
import {RecipeGetModel} from "../shared/dto/recipe-get.model";
import {RecipeCardItemComponent} from "../recipe-card-item/recipe-card-item.component";
import {TagGetModel} from "../shared/dto/tag-get.model";
import {DietGetModel} from "../shared/dto/diet-get.model";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    [HlmIconComponent],
    ReactiveFormsModule,
    TranslationDirective,
    RouterLink,
    RecipeCardItemComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() diet?: String;
  @Input() dish?: String;

  private recipeService: RecipeService = inject(RecipeService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  queryParams$ = this.route.queryParams; //wszystkie parametry wyszukiwania przepisu
  private recipe = new BehaviorSubject<RecipeGetModel[]>([]);
  recipes$ = this.recipe.asObservable();
  dishes!: DishGetModel[];
  diets!: DietGetModel[];
  tags!: TagGetModel[];
  form: FormGroup = new FormGroup({
    dishes: new FormArray([]),
    diets: new FormArray([]),
    tags: new FormArray([])
  });

    ngOnInit(): void {

      // this.queryParams$.subscribe(params => {
      //   console.log(params);
      //   this.recipeService.getRecipes(
      //     params["dishes"],
      //     params["categories"],
      //     params["tags"],
      //     params["search"],
      //     params["page"],
      //     params["size"],
      //     params["sort"]
      //   )
      //     .subscribe({
      //       next: (page) => {
      //         this.recipe.next(page.content)
      //         console.log(page.content)
      //       }
      //   })
      // })

      var dishesLoaded = new BehaviorSubject<boolean>(false);
      var dietsLoaded = new BehaviorSubject<boolean>(false);
      var tagsLoaded = new BehaviorSubject<boolean>(false);

      var areLoaded = zip(
        dishesLoaded.pipe(filter(loaded => loaded)),
        dietsLoaded.pipe(filter(loaded => loaded)),
        tagsLoaded.pipe(filter(loaded => loaded))
      ).subscribe(loaded => {
          console.log(loaded)
          this.form = new FormGroup({
            dishes: new FormArray(this.dishes.map(dish => new FormControl( false))),
            diets: new FormArray(this.diets.map(diet => new FormControl( false))),
            tags: new FormArray(this.tags.map(tag => new FormControl( false)))
          })
        })

      this.recipeService.getDishes().subscribe({
        next: (dishes) => {
          this.dishes = dishes;
          dishesLoaded.next(true);
        }
      });

      this.recipeService.getDiets().subscribe({
        next: (diets) => {
          this.diets = diets
          dietsLoaded.next(true);
        }
      });

      this.recipeService.getTags().subscribe({
        next: (tags) => {
          this.tags = tags;
          tagsLoaded.next(true);
        }
      });

    }

    ngOnDestroy() {
    }

    get dishesFormArray() {
      return this.form.controls["dishes"] as FormArray;
    }

    get dietsFormArray() {
      return this.form.controls["diets"] as FormArray;
    }

    get tagsFormArray() {
      return this.form.controls["tags"] as FormArray;
    }

    submit() {
      const selectedDishesNames = this.form.value.dishes
        .map((checked: boolean, i: number) => checked ? this.dishes[i].name : null)
        .filter((v: string | null) => v !== null);
      console.log(selectedDishesNames);

      const selectedDietsNames = this.form.value.diets
        .map((checked: boolean, i: number) => checked ? this.diets[i].name : null)
        .filter((v: string | null) => v !== null);
      console.log(selectedDietsNames);

      const selectedTagsNames = this.form.value.tags
        .map((checked: boolean, i: number) => checked ? this.tags[i].name : null)
        .filter((v: string | null) => v !== null);
      console.log(selectedTagsNames);

      this.recipeService.getRecipes(
        selectedDishesNames.join(','),
        selectedDietsNames.join(','),
        selectedTagsNames.join(',')
      ).subscribe({
        next: (page) => {
          this.recipe.next(page.content)
          console.log(page.content)
        }
      })
  }

}