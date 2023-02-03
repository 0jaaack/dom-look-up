import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { debounceTime, Subject, switchMap, filter, tap } from "rxjs";
import { DomTreeService } from "../dom-tree.service";
import { UrlService } from "../url.service";
import { Router } from "@angular/router";
import { URL } from "src/types";

const urlRegExp = new RegExp(
  /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
);

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  inputEventSubject$ = new Subject<URL>();
  enterEventSubject$ = new Subject<URL>();

  constructor(
    private url: UrlService,
    private tree: DomTreeService,
    private router: Router,
  ) { }

  input = this.url.url;

  @Input() size!: string;
  @Output() onError = new EventEmitter();

  ngOnInit() {
    this.inputEventSubject$
      .pipe(
        debounceTime(300),
        filter((url) => urlRegExp.test(url)),
        tap((url) => this.url.setUrl(url)),
        switchMap(async (url) => this.tree.parseDomTree(url))
      )
      .subscribe();

    this.enterEventSubject$
      .pipe(
        tap((url) => {
          if (!urlRegExp.test(url)) {
            this.onError.emit("Please enter the correct url");
          }
        }),
        filter((url) => urlRegExp.test(url)),
      )
      .subscribe(() => {
        this.router.navigateByUrl("/view");
      });
  }

  ngOnDestroy() {
    this.inputEventSubject$.unsubscribe();
    this.enterEventSubject$.unsubscribe();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.enterEventSubject$.next(
        ((event.target as HTMLInputElement).value as URL)
      );
    }
  }

  handleInput(event: Event) {
    this.inputEventSubject$.next(
      ((event.target as HTMLInputElement).value as URL)
    );
  }
}
