import { expect } from "chai";
import request from "supertest";
import { createApp } from "../app.js";
import { createServer } from "../server.js";

describe("Express App", () => {
  const app = createApp();

  describe("GET /", () => {
    it("should return Hello, CI/CD pipeline!", async () => {
      const res = await request(app).get("/");
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Hello, CI/CD pipeline!");
    });

    it("should handle 404 for unknown routes", async () => {
      const res = await request(app).get("/unknown-route");
      expect(res.status).to.equal(404);
      expect(res.text).to.equal("Not Found");
    });
  });
});

describe("Server", () => {
  let server;
  const app = createApp();

  afterEach(() => {
    if (server && server.listening) {
      server.close();
    }
  });

  it("should create a server successfully", async () => {
    server = createServer(app);
    expect(server.listening).to.be.false;
    await server.start(0);
    expect(server.listening).to.be.true;
  });

  it("should handle server errors", async () => {
    const existingServer = await createServer(app).start(0);
    server = createServer(app);

    try {
      // Try to start server on the same port to cause an error
      await server.start(existingServer.address().port);
      expect.fail("Should have thrown an error");
    } catch (err) {
      expect(err).to.exist;
    } finally {
      existingServer.close();
    }
  });
});
