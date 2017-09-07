# UDP Discovery
This is an example of creating a simple UDP multicast client/server relationship. It was part of my own research into building a service discovery method in docker.

## Example
```bash
# Create a new docker network for our test
docker network create testeroo

# Create three example servers
docker run -d --network="testeroo" -v $(pwd):/app node node /app/example-server
docker run -d --network="testeroo" -v $(pwd):/app node node /app/example-server
docker run -d --network="testeroo" -v $(pwd):/app node node /app/example-server

# Query all running servers in our network
docker run --network="testeroo" -v $(pwd):/app node node /app/example-query

# Open a new tab and try starting another service
docker run -d --network="testeroo" -v $(pwd):/app node node /app/example-server

# Now in your query tab you should see a new item
```

You should see something like the below in your output:
```bash
["1cc8dab59682","my-example-app",{"name":"Example App","description":"This is an example app","port":35799}]
["893a976e710b","my-example-app",{"name":"Example App","description":"This is an example app","port":35367}]
["a9b5d7df81bc","my-example-app",{"name":"Example App","description":"This is an example app","port":32993}]
```

This project doesn't handle service destruction.

