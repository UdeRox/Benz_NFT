
Build : 
$ docker build -t bnz_nft:0.1 ./
Run : 
$ docker run -p 3000:3000 

Run using docker compose
$ docker-compose up

docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 -d mysql:latest

docker exec -it mysql-container mysql -u root -p

docker exec -it <container_id_or_name> mysql -u <username> -p

