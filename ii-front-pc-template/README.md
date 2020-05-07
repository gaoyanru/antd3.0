# about

实在智能中后台产品统一开发模板

## 开发步骤
  - 拉取镜像：git clone ssh://git@code.ii-ai.tech:2222/ued/ii-front-pc-template.git --recursive ${项目名称}
  - 安装依赖：在项目目录下 npm install 或 yarn install
  - 开启web服务器和编译器: npm start 或 yarn start
  - 开始搬砖


## 其他命令
- npm run build-docker-prod: 根据compose文件编译线上版本的docker，并启动docker
- npm run build-docker-local: 根据compose文件编译开发版本的docker，并启动docker