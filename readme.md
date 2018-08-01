
#### 介绍
通过脚本，依次执行 点击菜单 - 点击分享 - 选择第一个联系人 - 确定分享 实现无限刷选投票机会  
支持所有分辨率iOS设备 ~~暂时只支持5.5英寸iPhone设备，其他尺寸可修改配置进行适配~~ 
**只实现了自动分享获得选票的功能，未提供代投票功能，未来也不会集成代投票功能**  

#### 准备工作
- 安装node环境
- 安装WebDriveAgent 参考 [ iOS 真机如何安装 WebDriverAgent ] https://testerhome.com/topics/7220
- ``` git clone https://github.com/jianggaocheng/lagou-voter-2018-summer.git ``` 
- ``` cd lagou-voter-2018-summer && npm install ``` 
- 将「文件分享助手」置顶为第一个联系人

#### 运行步骤
- 运行安装好的 WebDriveAgent
- 将手机页面切换到投票页面 
- 修改 ``` wdaServerURL ``` 为手机的地址
- 运行脚本 ``` node index.js ```

#### Update

**20180731**  
- 通过查询element计算出点击位置，无需额外配置支持所有分辨率iOS设备
- 随机点击位置
