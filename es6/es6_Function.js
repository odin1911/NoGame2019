// 函数的扩展
{
    // 函数的参数指定默认值
    function log(x, y = 'World') {
        console.log(x, y);
    }

    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello
}

{
    // 参数默认值是惰性求值的
    let x = 99;
    function foo(p = x + 1) {
        console.log(p);
    }

    foo() // 100

    x = 100;
    foo() // 101
}

{
    // 参数默认值可以与解构赋值的默认值，结合起来使用
    function foo({ x, y = 5 }) {
        console.log(x, y);
    }
    foo({}) // undefined 5
    foo({ x: 1 }) // 1 5
    foo({ x: 1, y: 2 }) // 1 2
    foo() // TypeError: Cannot read property 'x' of undefined

    function foo({ x, y = 5 } = {}) {
        console.log(x, y);
    }
    foo() // undefined 5

    // 传入undefined，将触发该参数等于默认值，null则没有这个效果
}

{
    // 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真
    (function (a) { }).length; // 1
    (function (a = 5) { }).length; // 0
    (function (a, b, c = 5) { }).length; // 2
    // length属性的含义是，该函数预期传入的参数个数

    // rest 参数也不会计入length属性
    (function (...args) { }).length; // 0

    // 设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
    (function (a = 0, b, c) { }).length; // 0
    (function (a, b = 1, c) { }).length; // 1
}

{
    // 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的
}

{
    // rest 参数
    // arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组
    // 函数的length属性，不包括 rest 参数
}

{
    // 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数
}

{
    // 递归函数
    function sum(x, y) {
        if (y > 0) {
            return sum(x + 1, y - 1);
        } else {
            return x;
        }
    }

    sum(1, 100000)
    // Uncaught RangeError: Maximum call stack size exceeded(…)

    // 蹦床函数（trampoline）可以将递归执行转为循环执行
    function trampoline(f) {
        while (f && f instanceof Function) {
            f = f();
        }
        return f;
    }

    // 将原来的递归函数，改写为每一步返回另一个函数。
    function sum(x, y) {
        if (y > 0) {
            return sum.bind(null, x + 1, y - 1);
        } else {
            return x;
        }
    }

    trampoline(sum(1, 100000))
    // 100001
}

{
    // 真正的尾递归优化
    function tco(f) {
        var value;
        var active = false;
        var accumulated = [];

        return function accumulator() {
            accumulated.push(arguments);
            if (!active) {
                active = true;
                while (accumulated.length) {
                    value = f.apply(this, accumulated.shift());
                }
                active = false;
                return value;
            }
        };
    }

    var sum = tco(function (x, y) {
        if (y > 0) {
            return sum(x + 1, y - 1)
        }
        else {
            return x
        }
    });

    sum(1, 100000)
    // 100001
}