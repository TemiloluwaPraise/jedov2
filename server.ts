import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Image Optimization Endpoint
  app.get("/api/image", async (req, res) => {
    const { src, width, quality = 80 } = req.query;

    if (!src || typeof src !== "string") {
      return res.status(400).send("Missing 'src' parameter");
    }

    // Security: Ensure the path is within the public directory
    const publicDir = path.join(process.cwd(), "public");
    
    // Sanitize src: remove leading slash if present to avoid absolute path resolution issues
    const sanitizedSrc = src.startsWith("/") ? src.slice(1) : src;
    const filePath = path.join(publicDir, sanitizedSrc);

    if (!filePath.startsWith(publicDir)) {
      return res.status(403).send("Forbidden");
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Image not found");
    }

    try {
      let transform = sharp(filePath);

      // Resize if width is provided
      if (width && !isNaN(Number(width))) {
        transform = transform.resize(Number(width));
      }

      // Convert to WebP and set quality
      const buffer = await transform
        .webp({ quality: Number(quality) })
        .toBuffer();

      res.set("Content-Type", "image/webp");
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.send(buffer);
    } catch (error) {
      console.error("Image processing error:", error);
      res.status(500).send("Error processing image");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
