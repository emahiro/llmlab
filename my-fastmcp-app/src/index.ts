import { FastMCP } from "fastmcp";

const server = new FastMCP({
  name: "my-fastmcp-app",
  version: "1.0.0"
});

server.start({
  transportType: "stdio"
});
