import sharp from "sharp";
import fs from "fs";
import path from "path";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDirectory = path.join(process.cwd(), "public", "icons");

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDirectory)) {
  fs.mkdirSync(iconDirectory, { recursive: true });
}

async function generateIcons() {
  try {
    const sourceImage = path.join(process.cwd(), "public", "logo.png");

    for (const size of sizes) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(iconDirectory, `icon-${size}x${size}.png`));

      console.log(`Generated ${size}x${size} icon`);
    }

    console.log("All icons generated successfully!");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
