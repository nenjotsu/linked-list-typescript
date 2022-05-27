import { LinkedList } from "./LinkedList";

export class FixedLinkedList<T> extends LinkedList<T> {
  public totalPushed: number = 0;
  public _append: (data: T, checkDuplicates?: boolean) => boolean;

  constructor(public size: number | T = 30, ...initialValues: T[]) {
    super();
    let values: T[] = [...initialValues]
    this.size = size;
    if (typeof size !== "number") {
      values = [size, ...initialValues]
      this.size = values.length;
    }
    this._append = this.append;
    this.append = function (data: T, checkDuplicates: boolean = false) {
        this.totalPushed++;
      
      return this.add(data, checkDuplicates);
    };

    if (values.length > 0) {
      values.forEach((value) => {
        this.append(value);
      });
    }
  }

  add(data: T, checkDuplicates: boolean = false) {
    if (this.length === this.size) {
      const isSuccess = this._append(data, checkDuplicates);
      if (isSuccess) {
        this.removeHead();
      } 
      return isSuccess
    } else {
      return this._append(data, checkDuplicates);
    }
  }
}