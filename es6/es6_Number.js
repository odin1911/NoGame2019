// 数值的扩展
{
    // ES6 进一步明确，要使用前缀0o表示

    // 要将0b和0o前缀的字符串数值转为十进制，要使用Number方法
    Number('0b111')  // 7
    Number('0o10')  // 8
}

{
    // Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity
    // 如果参数类型不是数值，Number.isFinite一律返回false
    Number.isFinite(15); // true
    Number.isFinite(0.8); // true
    Number.isFinite(NaN); // false
    Number.isFinite(Infinity); // false
    Number.isFinite(-Infinity); // false
    Number.isFinite('foo'); // false
    Number.isFinite('15'); // false
    Number.isFinite(true); // false

    // Number.isNaN()用来检查一个值是否为NaN
    // 如果参数类型不是NaN，Number.isNaN一律返回false
    Number.isNaN(NaN) // true
    Number.isNaN(15) // false
    Number.isNaN('15') // false
    Number.isNaN(true) // false
    Number.isNaN(9 / NaN) // true
    Number.isNaN('true' / 0); // true
    Number.isNaN('true' / 'true'); // true

    // 与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，
    // 而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false
    isFinite(25) // true
    isFinite("25") // true
    Number.isFinite(25) // true
    Number.isFinite("25") // false

    isNaN(NaN) // true
    isNaN("NaN") // true
    Number.isNaN(NaN) // true
    Number.isNaN("NaN") // false
    Number.isNaN(1) // false
}

{
    // ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变
    // ES5的写法
    parseInt('12.34') // 12
    parseFloat('123.45#') // 123.45

    // ES6的写法
    Number.parseInt('12.34') // 12
    Number.parseFloat('123.45#') // 123.45
}

{
    // Number.isInteger()用来判断一个数值是否为整数
    // 如果参数不是数值，Number.isInteger返回false
    Number.isInteger(25) // true
    Number.isInteger(25.1) // false

    Number.isInteger(25) // true
    Number.isInteger(25.0) // true

    Number.isInteger() // false
    Number.isInteger(null) // false
    Number.isInteger('15') // false
    Number.isInteger(true) // false
}

{
    // Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差
    // Number.EPSILON实际上是 JavaScript 能够表示的最小精度, 2 的 -52 次方

    Number.EPSILON === Math.pow(2, -52)
    // true
    Number.EPSILON
    // 2.220446049250313e-16
    Number.EPSILON.toFixed(20)
    // "0.00000000000000022204"
}

{
    // 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点）
    // 超出了精度范围，导致在计算机内部，以9007199254740992的形式储存
    Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

    // ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限
    // Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内
    Number.isSafeInteger('a') // false
    Number.isSafeInteger(null) // false
    Number.isSafeInteger(NaN) // false
    Number.isSafeInteger(Infinity) // false
    Number.isSafeInteger(-Infinity) // false

    Number.isSafeInteger(3) // true
    Number.isSafeInteger(1.2) // false
    Number.isSafeInteger(9007199254740990) // true
    Number.isSafeInteger(9007199254740992) // false

    Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
    Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
}

{
    // Math.trunc方法用于去除一个数的小数部分，返回整数部分
    Math.trunc(4.1) // 4
    Math.trunc(4.9) // 4
    Math.trunc(-4.1) // -4
    Math.trunc(-4.9) // -4
    Math.trunc(-0.1234) // -0

    // 对于非数值，Math.trunc内部使用Number方法将其先转为数值
    Math.trunc('123.456') // 123
    Math.trunc(true) //1
    Math.trunc(false) // 0
    Math.trunc(null) // 0

    // 对于空值和无法截取整数的值，返回NaN
    Math.trunc(NaN);      // NaN
    Math.trunc('foo');    // NaN
    Math.trunc();         // NaN
    Math.trunc(undefined) // NaN

    // 对于没有部署这个方法的环境，可以用下面的代码模拟
    Math.trunc = Math.trunc || function (x) {
        return x < 0 ? Math.ceil(x) : Math.floor(x);
    };
}

{
    // Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值
    // 参数为正数，返回 + 1；
    // 参数为负数，返回 - 1；
    // 参数为 0，返回0；
    // 参数为 - 0，返回 - 0;
    // 其他值，返回NaN
    Math.sign(-5) // -1
    Math.sign(5) // +1
    Math.sign(0) // +0
    Math.sign(-0) // -0
    Math.sign(NaN) // NaN

    // 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN
    Math.sign('')  // 0
    Math.sign(true)  // +1
    Math.sign(false)  // 0
    Math.sign(null)  // 0
    Math.sign('9')  // +1
    Math.sign('foo')  // NaN
    Math.sign()  // NaN
    Math.sign(undefined)  // NaN

    // 对于没有部署这个方法的环境，可以用下面的代码模拟
    Math.sign = Math.sign || function (x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    };
}

{
    // Math.cbrt方法用于计算一个数的立方根
    Math.cbrt(-1) // -1
    Math.cbrt(0)  // 0
    Math.cbrt(1)  // 1
    Math.cbrt(2)  // 1.2599210498948734

    // 对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值
    Math.cbrt('8') // 2
    Math.cbrt('hello') // NaN

    // 对于没有部署这个方法的环境，可以用下面的代码模拟
    Math.cbrt = Math.cbrt || function (x) {
        var y = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
    };
}

{
    // Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0
    // clz32这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。
    Math.clz32(0) // 32
    Math.clz32(1) // 31
    Math.clz32(1000) // 22
    Math.clz32(0b01000000000000000000000000000000) // 1
    Math.clz32(0b00100000000000000000000000000000) // 2

    // Math.clz32方法只考虑整数部分
    Math.clz32(3.2) // 30
    Math.clz32(3.9) // 30

    // 对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算
    Math.clz32() // 32
    Math.clz32(NaN) // 32
    Math.clz32(Infinity) // 32
    Math.clz32(null) // 32
    Math.clz32('foo') // 32
    Math.clz32([]) // 32
    Math.clz32({}) // 32
    Math.clz32(true) // 31
}

{
    // Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数
    Math.imul(2, 4)   // 8
    Math.imul(-1, 8)  // -8
    Math.imul(-2, -2); // 4

    // 因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值
    (0x7fffffff * 0x7fffffff) | 0 // 0
    Math.imul(0x7fffffff, 0x7fffffff) // 1
}

{
    // Math.fround方法返回一个数的32位单精度浮点数形式
    // 如果参数的绝对值大于 2的24次方，返回的结果便开始丢失精度
    Math.fround(2 ** 24 - 1)   // 16777215
    Math.fround(2 ** 24)       // 16777216
    Math.fround(2 ** 24 + 1)   // 16777216

    // Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）
    // 未丢失有效精度
    Math.fround(1.125) // 1.125
    Math.fround(7.25)  // 7.25

    // 丢失精度
    Math.fround(0.3)   // 0.30000001192092896
    Math.fround(0.7)   // 0.699999988079071
    Math.fround(1.0000000123) // 1

    // 对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数
    Math.fround(NaN)      // NaN
    Math.fround(Infinity) // Infinity

    Math.fround('5')      // 5
    Math.fround(true)     // 1
    Math.fround(null)     // 0
    Math.fround([])       // 0
    Math.fround({})       // NaN

    // 对于没有部署这个方法的环境，可以用下面的代码模拟
    Math.fround = Math.fround || function (x) {
        return new Float32Array([x])[0];
    };
}

{
    // Math.hypot方法返回所有参数的平方和的平方根
    Math.hypot(3, 4);        // 5
    Math.hypot(3, 4, 5);     // 7.0710678118654755
    Math.hypot();            // 0
    Math.hypot(NaN);         // NaN
    Math.hypot(3, 4, 'foo'); // NaN
    Math.hypot(3, 4, '5');   // 7.0710678118654755
    Math.hypot(-3);          // 3

    // 如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN
}

{
    // 对数相关方法
    // Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1
    Math.expm1(-1) // -0.6321205588285577
    Math.expm1(0)  // 0
    Math.expm1(1)  // 1.718281828459045

    // Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN
    Math.log1p(1)  // 0.6931471805599453
    Math.log1p(0)  // 0
    Math.log1p(-1) // -Infinity
    Math.log1p(-2) // NaN

    // Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN
    Math.log10(2)      // 0.3010299956639812
    Math.log10(1)      // 0
    Math.log10(0)      // -Infinity
    Math.log10(-2)     // NaN
    Math.log10(100000) // 5

    // Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN
    Math.log2(3)       // 1.584962500721156
    Math.log2(2)       // 1
    Math.log2(1)       // 0
    Math.log2(0)       // -Infinity
    Math.log2(-2)      // NaN
    Math.log2(1024)    // 10
    Math.log2(1 << 29) // 29
}

{
    // 双曲函数方法
    // Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
    // Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
    // Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
    // Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
    // Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
    // Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
}

{
    // 新增了一个指数运算符（**）
    2 ** 2 // 4
    2 ** 3 // 8

    // 右结合
    // 相当于 2 ** (3 ** 2)
    2 ** 3 ** 2 // 512

    // 新的赋值运算符（**=）
    let a = 1.5;
    a **= 2;
    // 等同于 a = a * a;
    let b = 4;
    b **= 3;
    // 等同于 b = b * b * b;
}