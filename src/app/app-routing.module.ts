import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchComponent } from "./search/search.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  { path: "", component: SearchComponent },
  { path: "/view", component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
