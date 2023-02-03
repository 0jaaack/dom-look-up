import { Injectable } from "@angular/core";
import { URL } from "src/types";

@Injectable({
  providedIn: "root"
})
export class UrlService {
  url: string = "";

  setUrl(url: URL) {
    this.url = url;
  }
}
