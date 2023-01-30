import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, switchMap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DomTreeService {
  data: any;

  constructor(
    private http: HttpClient
  ) { }

  parseElement(el: any): any {
    return {
      tag: el.tagName.toLowerCase(),
      id: `#${el.id}`,
      class: Array.from(el.classList).map(el => "." + el).join(" "),
      style: el.getAttribute("style"),
      text: el.lastChild?.nodeName === "#text" ? el.lastChild.data : "",
      chlidren: Array.from(el.children).map((el) => this.parseElement(el)),
    };
  }

  parseDomTree(url: string) {
    return this.http
      .get(`/api/?url=${url}`)
      .pipe(
        catchError(async (error) => console.log(error))
      )
      .subscribe((val: any) => {
        const parser = new DOMParser();
        const html = val.body;
        const document = parser.parseFromString(html, "text/html");
        const body = document.querySelector("body")!;

        this.data = this.parseElement(body);
      });
  }
}
