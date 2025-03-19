import sharp from "sharp";
import path from "path";

async function createBaseLogo() {
  const svgBuffer = `
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#2563EB"/>
      <path d="M256 128C185.307 128 128 185.307 128 256C128 326.693 185.307 384 256 384C326.693 384 384 326.693 384 256C384 185.307 326.693 128 256 128ZM256 352C203.065 352 160 308.935 160 256C160 203.065 203.065 160 256 160C308.935 160 352 203.065 352 256C352 308.935 308.935 352 256 352Z" fill="white"/>
      <path d="M256 192C220.654 192 192 220.654 192 256C192 291.346 220.654 320 256 320C291.346 320 320 291.346 320 256C320 220.654 291.346 192 256 192Z" fill="white"/>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svgBuffer))
      .png()
      .toFile(path.join(process.cwd(), "public", "logo.png"));

    console.log("Base logo created successfully!");
  } catch (error) {
    console.error("Error creating base logo:", error);
  }
}

createBaseLogo();
