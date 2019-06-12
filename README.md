# otreeDocker


config of otree docker

- 仓库： https://cloud.docker.com/repository/docker/shinepans/otreedocker


## 运行过程

- 建立  .env, 配置 compose 项目名，配置相关设置，区分不同otree服务
- 配置 docker-compose 配置文件，可直接使用模板文件
- 使用 docker-compose -f 配置文件路径 up 来启动服务

配置文件：

[user1为例](./user1/.env)

```
# Database configuration
POSTGRES_DATABASE=django_db
POSTGRES_USER=user1
POSTGRES_PASSWORD=123456

# OTree Settings
OTREE_PORT=3003
OTREE_ADMIN_PASSWORD=123456
# OTREE_PRODUCTION=1
# OTREE_AUTH_LEVEL=STUDY

# Docker Compose Project Name
COMPOSE_PROJECT_NAME=user3

# User Port
USER_PORT=3103

```

其中：

- OTREE_PORT 表示docker 容器中 otree 运行端口
- OTREE_ADMIN_PASSWORD 表示 otree 管理员密码
- COMPOSE_PROJECT_NAME 表示 不同的容器项目名，用于相互区分
- USER_PORT 表示最终向用户暴露的端口


## docker hub account

- 创建docker hub 账户
- 账户设置中关联 github 账户

## github上创建 otree docker文件仓库

- 取名为 otreedocker
- 包含以下文件并push到 master

```
.dockerignore
Dockerfile
entrypoint
pg_ping.py
```

## 在docker hub上创建仓库

- 取名为 otreedocker
- 在Builds中设置github的仓库源

![](./assets/buildConfig.png)

- 然后自动 building

![](./assets/autoBuilding.png)

## 在 Server上创建 Docker

- 创建otree-docker 文件夹
- 进入otree-docker 文件夹
- 将以下文件放进 otree-docker文件夹

```
docker-compose.yaml
.env
```

- 打开 docker-compose.yaml，修改image配置为：

```
image: shinepans/otreedocker:latest
// image: Docker账户名/Repo名:latest
```

- 打开 .env, 根据需要自定义

```
OTREE_PORT： otree 运行的端口
OTREE_ADMIN_PASSWORD： otree 管理员密码
OTREE_PRODUCTION： 生产环境
OTREE_AUTH_LEVEL： 运行模式
```

#### 配置 docker compose：  Linux下

- 安装 docker engine
- 安装 docker-compose

#### 登录 docker

```
docker login
```

## 下载和运行镜像

- 到 docker hub 上的 otreedocker repo下查看build状态，如果build结束，则在服务器上运行：

```
docker-compose pull
```

- 进入otreedocker, 运行docker-compose.yaml，之后运行：

```
docker-compose up
```

- 如果更新models等，需要reset db：

```
docker-compose down -v
```

- 如果更新了 docker-compose.yaml 或 .env， 需要重建 container:

```
docker-compose up --force-rec
```

### .....................................................

## js server  for oTree code uploads


```
npm install & ts-node ./server/app.ts
```

## 本地创建镜像

```
docker build -t otree:user1 .
```


## 运行不同docker在不同端口

```
docker run -d --name user1 --publish 4938:80
```

```
docker run -d --name user2 --publish 4939:80
```


## 针对本配置使用多个 compose 来运行多个实例

```
docker-compose -f FILEPATH up
```

针对每个不同的服务端口，对每个 FILEPATH 进行设置，然后加载 docker-compose 配置，进行启动服务


