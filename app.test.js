import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

//Antes de todos los tests, se ejecuta una vez para levantar el servidor
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

//Despues de todos los tests, se ejecuta una vez para cerrar el servidor
after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe("GET /jobs", () => {
  test("debe devolver con un 200 y un array de jobs", async () => {
    const response = await fetch(`${BASE_URL}/jobs`);
    const data = await response.json();
    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data.data), "debe devolver un array");
  });

  test("Debe filtrar por trabajos de tecnologia", async () => {
    const response = await fetch(`${BASE_URL}/jobs?technology=tecnologia`);
    const data = await response.json();
    assert.strictEqual(response.status, 200);
    assert.ok(Array.isArray(data.data), "debe devolver un array");
    assert.ok(
      data.data.every((job) => job.technology === "javascript"),
      "debe devolver solo trabajos de javascript",
    );
  });
});
