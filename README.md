# add-photo
---

## Project Description
---

实现效果类似于，微信发朋友圈里边添加图片那部分内容.


| Dir | Explaination |
| --- | --- |
| src | Contain all of source files |
| src/pages | Each page is a module, which is under the `pages` folder.  |
| src/lib | libiary folder. |
| dist | build files are here. |
| abc.json | ehdev's configeration file. |

使用es6语法, 依赖插件 [photoswipe](http://photoswipe.com/)


## HOW TO START
---

1. 脚手架安装[EHDEV](https://github.com/EHDFE/ehdev)

```sh
npm install -g ehdev-server ehdev-configs ehdev-configs-legacy ehdev-build ehdev

```

2. Install the project's dependence when you checkout the project first time.

```sh
npm install
```

3. Use `ehdev` to start your development environment.

```sh
ehdev server
```

4. When you're ready to deploy the project to the online server, you should build the project.

```sh
ehdev build
```
