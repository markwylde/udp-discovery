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

This project doesn't handle service destruction.

