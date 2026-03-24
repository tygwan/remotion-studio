/**
 * WSL2 localhost port detection patch for Remotion
 *
 * Problem: In WSL2 with localhostForwarding=true, connecting to 127.0.0.1
 * on an unused port times out instead of returning ECONNREFUSED.
 * Remotion treats timeout as "unavailable", so no port is ever found.
 *
 * Fix: Treat timeout as "available" — if nothing responds, the port is free.
 */
const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "@remotion",
  "renderer",
  "dist",
  "get-port.js"
);

if (!fs.existsSync(filePath)) {
  console.log("[patch-wsl-port] get-port.js not found, skipping patch.");
  process.exit(0);
}

let content = fs.readFileSync(filePath, "utf8");

const original = `socket.on('timeout', () => {
            status = 'unavailable';`;

const patched = `socket.on('timeout', () => {
            status = 'available';`;

if (content.includes(patched)) {
  console.log("[patch-wsl-port] Already patched.");
  process.exit(0);
}

if (!content.includes(original)) {
  console.log("[patch-wsl-port] Target code not found, skipping.");
  process.exit(0);
}

content = content.replace(original, patched);
fs.writeFileSync(filePath, content, "utf8");
console.log("[patch-wsl-port] Patched get-port.js for WSL2 compatibility.");
