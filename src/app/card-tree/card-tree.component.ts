import { Component, Input } from "@angular/core";
import { DomTree } from "src/types";

@Component({
  selector: "app-card-tree",
  templateUrl: "./card-tree.component.html",
  styleUrls: ["./card-tree.component.scss"]
})
export class CardTreeComponent {
  @Input() node!: DomTree;
}
