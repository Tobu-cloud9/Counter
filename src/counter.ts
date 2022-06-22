export class Counter {
  name: string; //Name of Counter
  point: number; //Point of Counter
  static total: number = 0;
  //Constructor 
  constructor(name: string){
    this.name = name;
    this.point = 0;
  }
  //Add point +1
  add(): void{
    this.point +=1;
    Counter.total += 1;
  }
  //Substruction point -1
  sub(): void{
    if(this.point > 0)this.point -=1;
    Counter.total -= 1;
  }
  //Reset point *0
  reset(): void{
    Counter.total -= this.point;
    this.point *=0;
  }

  //Rename
  rename(name: string): void{
    this.name = name;
  }

  //Total points
  sum() : number{
    return Counter.total;
  }
}
