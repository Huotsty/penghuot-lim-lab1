import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { createServer } from "../server.js";

describe("Express App", () => {
  describe("GET /", () => {
    it("should return Hello, CI/CD pipeline!", async () => {
      const res = await request(app).get("/");
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Hello, CI/CD pipeline!");
    });

    it("should handle 404 for unknown routes", async () => {
      const res = await request(app).get("/unknown-route");
      expect(res.status).to.equal(404);
    });
  });
});

describe("Server", () => {
  let server;

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  it("should create a server successfully", (done) => {
    server = createServer(app);
    expect(server.listening).to.be.false;
    server.listen(0, () => {
      expect(server.listening).to.be.true;
      done();
    });
  });
});
