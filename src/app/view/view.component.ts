import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DomTreeService } from "../dom-tree.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {
  error = "";
  meta = this.tree.meta;
  data = this.tree.tree;

  constructor(
    private tree: DomTreeService,
    private router: Router,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (!this.meta || !this.data) {
        this.error = "Failed to get data. please try again";
      }
    }, 3000);
  }

  handleNavigateHome() {
    this.router.navigateByUrl("/");
  }
}
