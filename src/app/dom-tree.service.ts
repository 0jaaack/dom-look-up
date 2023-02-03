import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";
import { DomTree, URL, HTTPResponse, MetaDataList, CARD } from "src/types";

@Injectable({
  providedIn: "root"
})
export class DomTreeService {
  tree!: DomTree;
  meta!: MetaDataList;

  constructor(
    private http: HttpClient
  ) { }

  parseElement(el: HTMLElement): DomTree {
    return {
      kind: CARD.DOM_TREE,
      tag: el.tagName.toLowerCase(),
      id: `${el.id ? "#" + el.id : ""}`,
      class: Array.from(el.classList).map(el => "." + el).join(" "),
      style: el.getAttribute("style") ?? ""!,
      text: el.lastChild?.nodeName === "#text" ? (el.lastChild as any).data : "",
      children: Array.from(el.children).map((el) => this.parseElement((el as HTMLElement))),
    };
  }

  parseMetaData(html: Document): MetaDataList {
    return {
      kind: CARD.META_DATA_LIST,
      title: html.querySelector("title")?.textContent ?? "",
      description: html.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
      linkList: Array.from(html.querySelectorAll("link")).map(({ href, rel }) => ({ href, rel })),
      viewport: html.querySelector<HTMLMetaElement>('meta[name="viewport"]')?.content ?? "",
    };
  }

  parseDomTree(url: URL) {
    return this.http
      .get<HTTPResponse>(`/api/?url=${url}`)
      .pipe(
        tap((data) => {
          if (data.body === "error") {
            throwError(() => new Error("Failed to get data."));
          }
        }),
        catchError(async (error) => console.log(error))
      )
      .subscribe((val) => {
        const parser = new DOMParser();
        const html = val!.body;
        const document = parser.parseFromString(html, "text/html");
        const body = document.querySelector("body")!;

        this.meta = this.parseMetaData(document);
        this.tree = this.parseElement(body);
      });
  }
}
