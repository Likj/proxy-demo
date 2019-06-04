const dom = new Proxy({}, {
    get (target, key, proxySelf) {
        return function (attrs = {}, ...children) {
            let el = document.createElement(key);
            for (let i of Object.keys(attrs)) {
                el.setAttribute(i, attrs[i])
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child)
                }
                el.appendChild(child)
            };
            return el;
        }
     }
});
// 调用生成节点
const el = dom.div({},
    'Hello, my name is ',
    dom.a({href: '//example.com'}, 'Mark'),
    '. I like:',
    dom.ul({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '…actually that\'s it')
    )
);

document.body.appendChild(el);
