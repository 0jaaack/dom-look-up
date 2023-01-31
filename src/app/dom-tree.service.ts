import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Subject } from "rxjs";
import { DomTree, URL, HTTPResponse, MetaDataList, CARD } from "src/types";

@Injectable({
  providedIn: "root"
})
export class DomTreeService {
  tree = new Subject<DomTree>();
  meta = new Subject<MetaDataList>();

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
  }

  parseDomTree(url: URL) {
    return this.http
      .get<HTTPResponse>(`/api/?url=${url}`)
      .pipe(
        catchError(async (error) => console.log(error))
      )
      .subscribe((val) => {
        const parser = new DOMParser();
        const html = val!.body;
        const document = parser.parseFromString(html, "text/html");
        const body = document.querySelector("body")!;

        const aa = this.parseElement(body);
        console.log(aa)

        this.meta.next(this.parseMetaData(document));
        this.tree.next(aa);
      });
  }
}
