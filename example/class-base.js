// Class basic use

class A {
 constructor(data){
   this.data = data;
 }
  testMethod() {
   console.log(this.data);
 }
}

const a = new A("test");
a.testMethod();
