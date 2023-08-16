import EqualsInterface from "./EqualsInterface";

class DLinkNode<T extends EqualsInterface> implements EqualsInterface {
  private data: T;
  private _prev: DLinkNode<T> | null;
  private _next: DLinkNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this._prev = null;
    this._next = null;
  }

  public get(): T {
    return this.data;
  }

  public set(data: T): void {
    this.data = data;
  }

  public getPrev(): DLinkNode<T> | null {
    return this._prev;
  }

  public setPrev(node: DLinkNode<T> | null): void {
    this._prev = node;
  }

  public getNext(): DLinkNode<T> | null {
    return this._next;
  }

  public setNext(node: DLinkNode<T> | null): void {
    this._next = node;
  }

  public equals(obj: DLinkNode<T>): boolean {
    return this == obj || this.get().equals(obj.get());
  }
}

export default DLinkNode;