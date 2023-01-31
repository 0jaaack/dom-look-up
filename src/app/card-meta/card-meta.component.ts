import { Component, Input } from "@angular/core";
import { MetaDataList } from "src/types";

@Component({
  selector: "app-card-meta",
  templateUrl: "./card-meta.component.html",
  styleUrls: ["./card-meta.component.scss"]
})
export class CardMetaComponent {
  @Input() meta!: MetaDataList;
}
