// RegExp
{
    var regex = new RegExp('xyz', 'i');
    // 等价于
    var regex = /xyz/i;

    var regex = new RegExp(/xyz/i);
    // 等价于
    var regex = /xyz/i;

    // ES5 不允许此时使用第二个参数添加修饰符
    // var regex = new RegExp(/xyz/, 'i');

    // ES6 改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符
    new RegExp(/abc/ig, 'i').flags
    // "i"
}

{
    // ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码
    // \uD83D\uDC2A是一个四个字节的 UTF-16 编码，代表一个字符。但是，ES5 不支持四个字节的 UTF-16 编码，会将其识别为两个字符，导致第二行代码结果为true。
    // 加了u修饰符以后，ES6 就会识别其为一个字符，所以第一行代码结果为false
    /^\uD83D/u.test('\uD83D\uDC2A'); // false
    /^\uD83D /.test('\uD83D\uDC2A'); // true

    // 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
    var s = '𠮷';
    /^.$/.test(s); // false
    /^.$/u.test(s); // true

    // ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
    /\u{61}/.test('a'); // false
    /\u{61}/u.test('a'); // true
    /\u{20BB7}/u.test('𠮷'); // true

    // 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
    /a{2}/.test('aa'); // true
    /a{2}/u.test('aa'); // true
    /𠮷{2}/.test('𠮷𠮷'); // false
    /𠮷{2}/u.test('𠮷𠮷'); // true

    // u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符
    /^\S$/.test('𠮷'); // false
    /^\S$/u.test('𠮷'); // true

    // 正确返回字符串长度的函数
    function codePointLength(text) {
        var result = text.match(/[\s\S]/gu);
        return result ? result.length : 0;
    }

    var s = '𠮷𠮷';
    s.length // 4
    codePointLength(s); // 2

    // 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K. 不加u修饰符，就无法识别非规范的K字符
    /[a - z]/i.test('\u212A'); // false
    /[a - z]/iu.test('\u212A'); // true
}

{
    // 正则实例对象新增unicode属性，表示是否设置了u修饰符
    const r1 = /hello/;
    const r2 = /hello/u;

    r1.unicode // false
    r2.unicode // true
}

{
    // ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符, y修饰符确保匹配必须从剩余的第一个位置开始
    var s = 'aaa_aa_a';
    var r1 = /a+/g;
    var r2 = /a+/y;

    r1.exec(s) // ["aaa"]
    r2.exec(s) // ["aaa"]

    r1.exec(s) // ["aa"]
    r2.exec(s) // null

    // 改一下正则表达式，保证每次都能头部匹配，y修饰符就会返回结果了
    var s = 'aaa_aa_a';
    var r = /a+_/y;
    r.exec(s) // ["aaa_"]
    r.exec(s) // ["aa_"]
}

{
    // y修饰符的一个应用，是从字符串提取 token（词元），y修饰符确保了匹配之间不会有漏掉的字符
    const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
    const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

    function tokenize(TOKEN_REGEX, str) {
        let result = [];
        let match;
        while (match = TOKEN_REGEX.exec(str)) {
            result.push(match[1]);
        }
        return result;
    }

    // 没有非法字符
    tokenize(TOKEN_Y, '3 + 4')
    // [ '3', '+', '4' ]
    tokenize(TOKEN_G, '3 + 4')
    // [ '3', '+', '4' ]

    // 非法字符
    tokenize(TOKEN_Y, '3x + 4')
    // [ '3' ]
    tokenize(TOKEN_G, '3x + 4')
    // [ '3', '+', '4' ]
}

{
    // 与y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符
    var r = /hello\d/y;
    r.sticky // true
}

{
    // ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符

    // ES5 的 source 属性
    // 返回正则表达式的正文
    /abc/ig.source;
    // "abc"

    // ES6 的 flags 属性
    // 返回正则表达式的修饰符
    /abc/ig.flags;
    // 'gi'
}

{
    // ES2018 引入s修饰符，使得.可以匹配任意单个字符, 称为dotAll模式，即点（dot）代表一切字符
    // 正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式
    const re = /foo.bar/s;

    re.test('foo\nbar') // true
    re.dotAll // true
    re.flags // 's'

    // /s修饰符和多行修饰符/m不冲突，两者一起使用的情况下，.匹配所有字符，而^和$匹配每一行的行首和行尾。
}

{
    // 先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/
    let r1 = /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
    console.log(`/\d+(?=%)/ r1`, r1)
    console.log()
    // “先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/
    let r2 = (/\d+(?!%)/).exec('that’s all 44 of them')                 // ["44"]
    console.log(`/\d+(?!%)/ r2`, r2)
    // “先行断言”括号之中的部分（(?=%)），是不计入返回结果的
    console.log()
}

{
    // “后行断言”，x只有在y后面才匹配，必须写成/(?<=y)x/
    /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
        // “后行否定断言”则与“先行否定断言”相反，x只有不在y后面才匹配，必须写成/(?<!y)x/
        (/(?<!\$)\d+/).exec('it’s is worth about €90')                // ["90"]
}

{
    // Unicode 属性类, \p{...}和\P{...}
}

{
    // “具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名
    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    const year = matchObj.groups.year; // 1999
    const month = matchObj.groups.month; // 12
    const day = matchObj.groups.day; // 31
    console.log('具名组匹配', year, month, day)
    // 如果具名组没有匹配，那么对应的groups对象属性会是undefined
    // 使用$<组名>引用具名组
    // 解构赋值和替换
    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
    // replace方法的第二个参数是一个字符串
    '2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
    // replace方法的第二个参数也可以是函数
    '2015-01-02'.replace(re, (
        matched, // 整个匹配结果 2015-01-02
        capture1, // 第一个组匹配 2015
        capture2, // 第二个组匹配 01
        capture3, // 第三个组匹配 02
        position, // 匹配开始的位置 0
        S, // 原字符串 2015-01-02
        groups // 具名组构成的一个对象 {year, month, day}
    ) => {
        let { day, month, year } = groups;
        return `${day}/${month}/${year}`;
    });
}

{
    // 如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
}