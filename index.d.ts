declare module "*.css";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.png";

declare const min: {
    textContent: string;
    name: number;
  };
  
  declare const sec: {
    textContent: string;
    name: number;
  };

interface Element {
    style: CSSStyleDeclaration
}

interface Array<T> {
    shuffle(): T[];
}
