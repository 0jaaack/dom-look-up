import { Component, OnDestroy, OnInit } from "@angular/core";
import { debounceTime, Subject, switchMap, filter, tap } from "rxjs";
import { DomTreeService } from "../dom-tree.service";
import { Router } from "@angular/router";

const urlRegExp = new RegExp(
  /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
);

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  inputEventSubject$ = new Subject();
  enterEventSubject$ = new Subject();
  message = "";

  constructor(
    private tree: DomTreeService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.inputEventSubject$
      .pipe(
        debounceTime<any>(300),
        filter((url: string) => urlRegExp.test(url)),
        switchMap(async (url) => url && this.tree.parseDomTree((url as string)))
      )
      .subscribe();

    this.enterEventSubject$
      .pipe(
        tap((url) => this.message = urlRegExp.test(url) ? "" : "url을 제대로 입력해주세요."),
        filter<any>((url: string) => urlRegExp.test(url)),
      )
      .subscribe((url) => {
        this.router.navigateByUrl("/view");
      });
  }

  ngOnDestroy() {
    this.inputEventSubject$.unsubscribe();
    this.enterEventSubject$.unsubscribe();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.enterEventSubject$.next((event.target as HTMLInputElement).value);
    }
  }

  handleInput(event: Event) {
    this.inputEventSubject$.next((event.target as HTMLInputElement).value);
  }
}
