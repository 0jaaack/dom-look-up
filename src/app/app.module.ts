import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { ViewComponent } from "./view/view.component";
import { HeaderComponent } from './header/header.component';
import { CardMetaComponent } from './card-meta/card-meta.component';
import { CardTreeComponent } from './card-tree/card-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ViewComponent,
    HeaderComponent,
    CardMetaComponent,
    CardTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
