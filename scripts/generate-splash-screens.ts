import sharp from "sharp";
import fs from "fs";
import path from "path";

const splashScreens = [
  { width: 2048, height: 2732 },
  { width: 1668, height: 2388 },
  { width: 1536, height: 2048 },
  { width: 1125, height: 2436 },
  { width: 1242, height: 2688 },
];

const splashDirectory = path.join(process.cwd(), "public", "splash");

if (!fs.existsSync(splashDirectory)) {
  fs.mkdirSync(splashDirectory, { recursive: true });
}

async function generateSplashScreens() {
  try {
    const sourceImage = path.join(process.cwd(), "public", "logo.png");

    for (const screen of splashScreens) {
      await sharp(sourceImage)
        .resize({
          width: Math.floor(screen.width * 0.4),
          height: Math.floor(screen.width * 0.4),
          fit: "contain",
        })
        .extend({
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: { r: 3, g: 0, b: 20 }, // #030014
        })
        .resize(screen.width, screen.height)
        .toFile(
          path.join(
            splashDirectory,
            `apple-splash-${screen.width}-${screen.height}.png`
          )
        );

      console.log(`Generated ${screen.width}x${screen.height} splash screen`);
    }

    console.log("All splash screens generated successfully!");
  } catch (error) {
    console.error("Error generating splash screens:", error);
  }
}

generateSplashScreens();
