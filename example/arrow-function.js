// arrow function

// 1. 基本使用
const baseFunc1 = () => {
  console.log("Yes");
};

// 2. 带参数（一个参数时候，可以不加括号）
const baseFunc2 = param => {
  console.log(param);
};

// 3.也可以使用括号
const baseFunc3 = (param) => {
  console.log(param);
};

// 4.作为匿名函数，非常便利
setTimeout(() => {
  console.log("Yes");
}, 0);

// 5. 如果代码块只有一条语句，可以不用大括号
const baseFunc4 = (value1, value2) => value1 > value2;

// 复杂的来了
setTimeout(function () {
  console.log(this);
});

setTimeout(() => {
  console.log(this);
}, 0);

