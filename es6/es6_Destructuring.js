// 解构
{
    // 解构
    let data = { first: 111, second: 222 }
    let { first, second } = data
    console.log('first, second', first, second)
    console.log();

    // 使用别名
    let { first: f, second: s } = data
    console.log('f, s', f, s)
    console.log();
}

{
    // 嵌套结构
    let obj = {
        p: [
            'Hello',
            { y: 'World' }
        ]
    };

    let { p: [x, { y }] } = obj;
    console.log('x, y', x, y)
    console.log();
}

{
    // 嵌套结构
    const node = {
        loc: {
            start: {
                line: 1,
                column: 5
            }
        }
    };

    let { loc, loc: { start }, loc: { start: { line } } } = node;
    console.log('loc', loc);
    console.log('start', start);
    console.log('line', line);
    console.log();
}

{
    // 嵌套赋值
    let obj = {};
    let arr = [];

    ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
    console.log('obj, arr', obj, arr);
    console.log();
}

{
    // 默认值
    let { x1, y1 = 5 } = { x1: 1 };
    console.log('x1, y1', x1, y1)

    let { x: y2 = 3 } = {};
    console.log('y2', y2)

    let { x: y3 = 3 } = { x: 5 };
    console.log('y3', y3)

    let { x4 = 3 } = { x4: undefined };
    console.log('x4', x4)

    let { x5 = 3 } = { x5: null };
    console.log('x5', x5)
    console.log()
}

{
    // 错误
    // let x;
    // { x } = { x: 1 };

    // 正确
    let x;
    ({ x } = { x: 1 });
}

{
    // 对数组进行对象属性的解构
    let arr = [1, 2, 3];
    let { 0: first, [arr.length - 1]: last } = arr;
    console.log('first, last', first, last)
    console.log()
}

{
    // 字符串解构
    const [a, b, c, d, e] = 'hello';
    console.log('a, b, c, d, e', a, b, c, d, e)
    let { length: len } = 'hello';
    console.log('len', len);
    console.log();
}

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象

{
    // 函数的参数
    function add([x, y]) {
        return x + y;
    }
    console.log('add', add([1, 2]))
    //
    console.log('[[1, 2], [3, 4]].map(([a, b]) => a + b)', [[1, 2], [3, 4]].map(([a, b]) => a + b))
    console.log()
}

{
    // 函数参数默认值, x和y指定默认值
    function move({ x = 0, y = 0 } = {}) {
        return [x, y];
    }

    console.log('move({ x: 3, y: 8 })', move({ x: 3, y: 8 }))
    console.log('move({ x: 3 })', move({ x: 3 }))
    console.log('move({})', move({}))
    console.log('move()', move())
    console.log()
}

{
    // 函数参数默认值2
    function move2({ x, y } = { x: 0, y: 0 }) {
        return [x, y];
    }

    console.log('move2({ x: 3, y: 8 })', move2({ x: 3, y: 8 }))
    console.log('move2({ x: 3 })', move2({ x: 3 }))
    console.log('move2({})', move2({}))
    console.log('move2()', move2())
    console.log()
}

{
    // 遍历 Map 结构
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
        console.log(key + " is " + value);
    }
    console.log()
}