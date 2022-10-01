# Node-Best-Way

## Use Tech

- Nodejs Cluster
- Master and Child Process
- Production with PM2
- Use Messaing Queue (RabbitMQ)
- Use Cache (Redis)
- Use NgingX Load Balance (reverse proxy)

## Desc

> Nodejs Cluster

- Nodejs는 Single Thread이기 때문에, 여려요청이 들어와도 한곳에서 한 Thread 안에서 처리를 진행하게 된다.
- 만약, A 라는 작업이 20s초가 걸리는 작업이라면 서버는 A요청을 끝난 후 다른 B, C, D 작업을 처리하게 된다.

## Issue
