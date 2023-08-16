import DLinkNode from "./DLinkNode";
import EqualsInterface from "./EqualsInterface";

class DLinkList<T extends EqualsInterface> {
  private head: DLinkNode<T> | null;
  private tail: DLinkNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // ------------- Get -------------

  public getHead(): DLinkNode<T> | null {
    return this.head;
  }

  public getTail(): DLinkNode<T> | null {
    return this.tail;
  }

  public size(): number {
    let count = 0;
    for (const _ of this.iter()) {
      count++;
    }
    return count;
  }

  public getFirst(condition: (data: T) => boolean): T | null {
    for (const data of this.iter()) {
      if (condition(data)) {
        return data;
      }
    }
    return null;
  }

  public getLast(condition: (data: T) => boolean): T | null {
    for (const data of this.rIter()) {
      if (condition(data)) {
        return data;
      }
    }
    return null;
  }

  // ------------- Insert -------------

  public insertHead(data: T): void {
    const node = new DLinkNode<T>(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.setNext(this.head);
      this.head.setPrev(node);
      this.head = node;
    }
  }

  public insertTail(data: T): void {
    const node = new DLinkNode<T>(data);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.setPrev(this.tail);
      this.tail.setNext(node);
      this.tail = node;
    }
  }

  public push(data: T): void {
    this.insertTail(data);
  }

  public pushAll(arr: T[]): void {
    for (const data of arr) {
      this.push(data);
    }
  }

  // ------------- Remove -------------

  public removeHead(): T | null {
    if (this.head === null) {
      return null;
    }
    const node = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.getNext();
      this.head?.setPrev(null);
    }
    return node.get();
  }

  public removeTail(): T | null {
    if (this.tail === null) {
      return null;
    }
    const node = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.getPrev();
      this.tail?.setNext(null);
    }
    return node.get();
  }

  public remove(data: T): T | null {
    const node = this.find(data);
    if (node === null) {
      return null;
    }
    if (this.head && node.equals(this.head)) {
      return this.removeHead();
    }
    else if (this.tail && node.equals(this.tail)) {
      return this.removeTail();
    }
    const prev = node.getPrev();
    const next = node.getNext();
    prev?.setNext(next);
    next?.setPrev(prev);
    return node.get();
  }

  public pop(): T | null {
    return this.removeTail();
  }

  // ------------- Iterators -------------

  public *iter(): IterableIterator<T> {
    let node = this.head;
    while (node !== null) {
      yield node.get();
      node = node.getNext();
    }
  }

  public *rIter(): IterableIterator<T> {
    let node = this.tail;
    while (node !== null) {
      yield node.get();
      node = node.getPrev();
    }
  }

  private *iterNode(): IterableIterator<DLinkNode<T>> {
    let node = this.head;
    while (node !== null) {
      yield node;
      node = node.getNext();
    }
  }

  // private *rIterNode(): IterableIterator<DLinkNode<T>> {
  //   let node = this.tail;
  //   while (node !== null) {
  //     yield node;
  //     node = node.getPrev();
  //   }
  // }

  // ------------- Utils -------------

  private find(data: T): DLinkNode<T> | null {
    for (const node of this.iterNode()) {
      if (node.get().equals(data)) {
        return node;
      }
    }
    return null;
  }

  public map<U>(func: (data: T, index: number) => U): U[] {
    const result: U[] = [];
    let i = 0;
    for (const data of this.iter()) {
      result.push(func(data, i++));
    }
    return result;
  }

  public filter(func: (data: T) => boolean): T[] {
    const result: T[] = [];
    for (const data of this.iter()) {
      if (func(data)) {
        result.push(data);
      }
    }
    return result;
  }

  public reduce<U>(func: (acc: U, data: T) => U, init: U): U {
    let acc = init;
    for (const data of this.iter()) {
      acc = func(acc, data);
    }
    return acc;
  }

  public forEach(func: (data: T) => void): void {
    for (const data of this.iter()) {
      func(data);
    }
  }

  public toArray(): T[] {
    return this.map((data: T) => data);
  }
}

export default DLinkList;