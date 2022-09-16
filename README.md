# subjectWechat
一个可以查看个个学校和个人学号的查课表的小程序

## 介绍

小程序用到的MemFire Cloud的功能包括：
- 云数据库：存储小程序数据表的信息。
- 用户验证：小程序使用MemFire Cloud提供的用户认证的API接口，快速完成用户注册登录操作。
- 云存储：存储小程序的注册用户上传的头像。
- 行级安全策略：采用RLS策略来限制用户访问行为，用户可以修改个人信息，上传个人头像。
- 即时API：创建数据表时会自动生成 API。

## 主要使用

下载小程序需要的Supabase 小程序客户端和ui组件包。

```
npm install supabase-wechat-stable
npm install @vant/weapp

```


## 体验
![image](https://user-images.githubusercontent.com/56021673/190542852-5d163142-ca21-458c-be47-6689e67ba1a6.png)
![image](https://user-images.githubusercontent.com/56021673/190542863-e38327fc-8fc1-4eab-a2a5-f77b0b7206ba.png)
![image](https://user-images.githubusercontent.com/56021673/190542872-57e78965-2d8d-41af-acd5-c2bb293bed70.png)
![image](https://user-images.githubusercontent.com/56021673/190542888-158fc5cc-1c84-4edb-8ef1-5900e530ca0b.png)


