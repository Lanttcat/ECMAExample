// Class basic use

class Car {
 constructor(data){
   this.data = data;
 }
 testMethod() {
   console.log(this.data);
 }

  static testStaticThis() {
    console.log(this);
  }
}

const car = new Car("test");
car.testMethod();
Car.testStaticThis();
