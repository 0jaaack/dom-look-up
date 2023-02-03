export type URL = "string";

export type HTTPResponse = {
  body: string,
};

export enum CARD {
  DOM_TREE = "CARD/DOM_TREE",
  META_DATA_LIST = "CARD/META_DATA_LIST",
}

export type DomTree = {
  kind: CARD.DOM_TREE,
  tag: string,
  id: string,
  class: string,
  text: string,
  style: string,
  children: DomTree[],
};

export type Link = {
  rel: string,
  href: string,
}

export type MetaDataList = {
  kind: CARD.META_DATA_LIST,
  title: string,
  description: string,
  linkList: Link[],
  viewport: string,
};
