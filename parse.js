// babel AST  抽象语法树

const recast = require('recast');



const code = 'yiling';

const ast = recast.parse(code);


console.log(ast);
