import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DomTree, MetaDataList, CARD } from "src/types";
import { DomTreeService } from "../dom-tree.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {
  error = "Failed to load results. please try again.";
  // meta: MetaDataList | undefined;
  meta: MetaDataList | undefined = {
    kind: CARD.META_DATA_LIST,
    title: "title example",
    description: "description example",
    linkList: [
      {
        rel: "stylesheet",
        href: "styles.css",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
    ],
    charset: "utf-8",
    viewPort: "width=device-width, initial-scale=1",
  };
  // data: DomTree | undefined;
  data: DomTree = {
    kind: CARD.DOM_TREE,
    class: ".source .public",
    id: "asdf",
    style: "asdfasdf",
    tag: "body",
    text: "asdfasdfasdf",
    children: [
      {
        kind: CARD.DOM_TREE,
        class: ".source .public",
        id: "asdf",
        style: "asdfasdf",
        tag: "body",
        text: "asdfasdfasdf",
        children: [],
      },
      {
        kind: CARD.DOM_TREE,
        class: ".source .public",
        id: "asdf",
        style: "asdfasdf",
        tag: "body",
        text: "asdfasdfasdf",
        children: [
          {
            kind: CARD.DOM_TREE,
            class: ".source .public",
            id: "asdf",
            style: "asdfasdf",
            tag: "body",
            text: "asdfasdfasdf",
            children: [],
          },
          {
            kind: CARD.DOM_TREE,
            class: ".source .public",
            id: "asdf",
            style: "asdfasdf",
            tag: "body",
            text: "asdfasdfasdf",
            children: [],
          }
        ],
      }
    ],
  };

  constructor(
    private tree: DomTreeService,
    private router: Router,
  ) {}

  ngOnInit() {
    const errorTimer = setTimeout(() => {
      // this.error = "Failed to load results. please try again.";
    }, 3000);

    this.tree.tree
      .subscribe((tree) => {
        console.log(tree);
        this.data = tree;

        if (this.meta) {
          clearTimeout(errorTimer);
        }
      });

    this.tree.meta
      .subscribe((meta) => {
        this.meta = meta;

        if (this.data) {
          clearTimeout(errorTimer);
        }
      });
  }

  handleNavigateHome() {
    this.router.navigateByUrl("/");
  }
}
