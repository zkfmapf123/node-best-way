get-home:
	curl -X GET http://localhost:8080/v1
get-ex1:
	curl -X GET http://localhost:8080/v1/ex/get/helloworld
get-ex2:
	curl -X GET http://localhost:8080/v1/ex/get/leedonggyu
get-ex3:
	curl -X GET http://localhost:8080/v1/ex/get/limjeahyock

## RabbitMQ
send:
	@make get-ex1
	@make get-ex2
	@make get-ex3

## pm2

monit:
	pm2 monit --watch

## Docker
build:
	docker build -t node-best-way ./

run-it:
	docker run -it -p 8080:8080 --name node-server node-best-way 

del-none-img:
	docker rmi $(docker images -f "dangling=true" -q)
