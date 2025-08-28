require('dotenv').config();

const path = require('path');

// 每次修改 config.ts 后，需重新编译（npm run build）或通过 npm run dev（借助 nodemon 实时编译），确保 dist 目录的产物同步更新
// 若使用 sequelize-cli 执行迁移命令，需确保其读取的 sequelize.config.js 能正确指向编译后的配置（路径无误）
// process.cwd() 返回当前 Node 进程的工作目录（即执行命令时的目录，通常是项目根目录，比如你运行 npm run dev 或 sequelize-cli 命令的目录）
/* path.join 解决路径分隔符的跨平台问题 && 自动处理多余的斜杠或点号 */
// 引用编译后的配置（dist 目录下）
const config = require(path.join(process.cwd(), 'dist/config/config.js')).default;

module.exports = {
  development: config.development,
  test: config.test,
  production: config.production
};