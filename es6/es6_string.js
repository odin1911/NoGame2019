// 字符串的扩展
{
    // Unicode超过FFFF
    console.log("'\u{1F680}' === '\uD83D\uDE80'", '\u{1F680}' === '\uD83D\uDE80')
    console.log()
    '\z' === 'z'  // true
    '\172' === 'z' // true
    '\x7A' === 'z' // true
    '\u007A' === 'z' // true
    '\u{7A}' === 'z' // true
}

{
    // 遍历器接口
    let text = String.fromCodePoint(0x20BB7);

    for (let i = 0; i < text.length; i++) {
        console.log('for', text[i]);
    }
    // " "
    // " "

    for (let i of text) {
        console.log('for...of', i);
    }
    // "𠮷"

    console.log()
}

{
    // 模板编译
    function compile(template) {
        const evalExpr = /<%=(.+?)%>/g;
        const expr = /<%([\s\S]+?)%>/g;

        template = template
            .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
            .replace(expr, '`); \n $1 \n  echo(`');

        template = 'echo(`' + template + '`);';

        let script =
            `(function parse(data){
                let output = "";
            
                function echo(html){
                    output += html;
            }

        ${ template}

        return output;
        })`;

        return script;
    }

    let template = `
        <ul>
        <% for(let i=0; i < data.supplies.length; i++) { %>
            <li><%= data.supplies[i] %></li>
        <% } %>
        </ul>
        `;
    let parse = eval(compile(template));
    let out = parse({ supplies: ["broom", "mop", "cleaner"] });
    console.log(out)
}

{
    // 标签模板
    alert`123`
    // 等同于
    alert(123)
}

{
    // ES5 提供
    String.fromCharCode(0x20BB7) // 不能识别大于0xFFFF的码点
    // "ஷ"

    // ES6 提供
    String.fromCodePoint(0x20BB7)
    // "𠮷"
    String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
    // true
}

{
    // 该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串
    String.raw`Hi\n${2 + 3}!`;
    // 返回 "Hi\\n5!"

    String.raw`Hi\u000A!`;
    // 返回 "Hi\\u000A!"

    String.raw({ raw: 'test' }, 0, 1, 2);
    // 't0e1s2t'

    // 等同于
    String.raw({ raw: ['t', 'e', 's', 't'] }, 0, 1, 2);
}

{
    // ES5 提供
    var s = "𠮷";

    // 字符串长度会误判为2
    s.length // 2 
    // 无法读取整个字符
    s.charAt(0) // '' 
    s.charAt(1) // ''
    // 只能分别返回前两个字节和后两个字节的值
    s.charCodeAt(0) // 55362
    s.charCodeAt(1) // 57271

    // ES6 提供
    let s = '𠮷a';
    // 正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的20BB7）
    s.codePointAt(0) // 134071
    s.codePointAt(0).toString(16) // "20bb7"
    // 结果与charCodeAt()方法相同, 正确返回 32 位的 UTF-16 字符的码点
    s.codePointAt(1) // 57271

    s.codePointAt(2) // 97
    s.codePointAt(2).toString(16) // "61"
}

{
    // 字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt()方法传入 2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符
    let s = '𠮷a';
    for (let ch of s) {
        console.log(ch.codePointAt(0).toString(16));
    }
    // 20bb7
    // 61

    // 使用扩展运算符（...）
    let arr = [...'𠮷a']; // arr.length === 2
    arr.forEach(
        ch => console.log(ch.codePointAt(0).toString(16))
    );
    // 20bb7
    // 61
}

{
    // ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化
    '\u01D1'.normalize() === '\u004F\u030C'.normalize()
    // true

    '\u004F\u030C'.normalize('NFC').length // 1
    '\u004F\u030C'.normalize('NFD').length // 2
}

{
    let s = 'Hello world!';
    s.startsWith('Hello') // true
    s.endsWith('!') // true
    s.includes('o') // true

    let s = 'Hello world!';
    s.startsWith('world', 6) // true
    s.endsWith('Hello', 5) // true
    s.includes('Hello', 6) // false
    // endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
}

{
    'x'.repeat(3) // "xxx"
    'hello'.repeat(2) // "hellohello"
    'na'.repeat(0) // ""
}

{
    'x'.padStart(5, 'ab') // 'ababx'
    'x'.padStart(4, 'ab') // 'abax'

    'x'.padEnd(5, 'ab') // 'xabab'
    'x'.padEnd(4, 'ab') // 'xaba'

    // 省略第二个参数，默认使用空格补全长度
    'x'.padStart(4) // '   x'
    'x'.padEnd(4) // 'x   '
}

{
    const s = '  abc  ';

    s.trim() // "abc"
    s.trimStart() // "abc  "
    s.trimEnd() // "  abc"
}