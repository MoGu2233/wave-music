# Wave

一个网页音乐播放器：一个 `index.html` 装完全部代码，在线听歌和本地音乐都能播。

> 拿来做学习与娱乐的项目。代码基础基本为零，功能是一点点提需求、AI 一点点写出来的。

## 功能

* 多音源在线搜索与播放
* 本地音乐导入，读标签、封面和歌词，缓存在浏览器里
* 歌词逐行滚动，全屏播放页带封面动画，支持小窗
* 收藏、历史、排行榜、歌单、播放队列
* 断点续播、下载、数据备份
* 可装成 PWA，断网也能打开

## 运行

双击 `index.html` 就能用。想要 PWA 和离线缓存，把 `index.html`、`sw.js`、`manifest.webmanifest`、`icons/` 一起丢到任意静态托管上。

## 在线数据来源

在线部分的数据与音频地址来自 **GD音乐台**，本项目不存储音频。

署名按其要求标注：`数据来源 GD音乐台(music.gdstudio.xyz) · 仅供学习交流，请勿商用`

接口采用 CC BY-NC 4.0，禁止商用；音乐版权归各平台与版权方所有。

## 用到的开源项目与外部资源

* [SortableJS](https://github.com/SortableJS/Sortable) 1.15.6（MIT）、[browser-id3-writer](https://github.com/egoroof/browser-id3-writer)（MIT）：整包内联，署名与许可声明保留在脚本内
* 图标：[Remix Icon](https://remixicon.com)，[Remix Icon License v1.0](https://github.com/Remix-Design/RemixIcon/blob/master/License)
* 字体：MiSans（小米，CDN 加载子集）
* 思路参考：017-audio-wave、YesPlayMusic、musict.space、aura-music / Shadertoy、网易云音乐
* 歌词滚动的弹簧参数与自适应策略参考 [AMLL](https://github.com/amll-dev/applemusic-like-lyrics)（AGPL-3.0），代码为自写

## AI 辅助

代码由 AI 完成，作者负责提需求与决定取舍。这个项目最初就是拿来做学习与娱乐的。

## 许可

未采用标准开源许可证，仓库没有 LICENSE 文件，作者保留全部权利。

代码与文档仅供学习交流，请勿商用。第三方库与图标遵循其各自许可。
