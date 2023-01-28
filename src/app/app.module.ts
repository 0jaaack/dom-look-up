import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { ViewComponent } from "./view/view.component";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
