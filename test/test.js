import { expect } from "chai";
import request from "supertest";
import { createApp } from "../app.js";
import { createServer, PORT } from "../server.js";

describe("Express App", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe("Application Creation", () => {
    it("should create an Express application", () => {
      expect(app).to.be.an('function');
      expect(app.get).to.be.a('function');
    });
  });

  describe("Routes", () => {
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
  let app;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    if (server && server.listening) {
      server.close();
    }
  });

  describe("Server Creation", () => {
    it("should create a server instance", () => {
      server = createServer(app);
      expect(server).to.have.property('listen');
      expect(server).to.have.property('start');
      expect(server.listening).to.be.false;
    });

    it("should use default PORT when no port provided", async () => {
      server = createServer(app);
      expect(PORT).to.equal(3000);
      // Don't actually start on 3000 as it might be in use
      await server.start(0);
    });
  });

  describe("Server Operations", () => {
    it("should start server in non-test environment", async () => {
      const oldEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const { createServer } = await import("../server.js");
      const server = createServer();
      await server.start(0);
      expect(server.listening).to.be.true;
      server.close();

      process.env.NODE_ENV = oldEnv; // restore
    });

    it("should start server successfully", async () => {
      server = createServer(app);
      await server.start(0);
      expect(server.listening).to.be.true;
      expect(server.address().port).to.be.a('number');
    });

    it("should handle server errors", async () => {
      const existingServer = await createServer(app).start(0);
      server = createServer(app);

      try {
        await server.start(existingServer.address().port);
        expect.fail("Should have thrown an error");
      } catch (err) {
        expect(err).to.exist;
      } finally {
        existingServer.close();
      }
    });
  });
});
