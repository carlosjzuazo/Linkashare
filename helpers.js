const { fs } = require("fs");

async function pathExists(path) {
  try {
    await fs.access(path);
  } catch {
    throw new Error(`La ruta ${path} no existe.`);
  }
}
