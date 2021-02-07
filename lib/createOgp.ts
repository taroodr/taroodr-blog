import { Canvas, createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import fs from "fs";

const WIDTH = 1200;
const HEIGHT = 630;
const DX = 0;
const DY = 0;

type SeparatedText = {
  line: string;
  remaining: string;
};

const createTextLine = (canvas: Canvas, text: string): SeparatedText => {
  const context = canvas.getContext("2d");
  const MAX_WIDTH = 1000 as const;

  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: "",
  };
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== "") {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }
  return lines;
};

const createOgp = async (title: string, slug: string): Promise<void> => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  const backgroundImage = await loadImage(path.resolve("./public/ogp-bg.png"));
  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);

  registerFont(path.resolve("./font/MPLUS1p-Bold.ttf"), {
    family: "mplus",
  });
  ctx.font = "60px mplus";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lines = createTextLines(canvas, String(title));
  lines.forEach((line, index) => {
    const y = 314 + 80 * (index - (lines.length - 1) / 2);
    ctx.fillText(line, 600, y);
  });

  ctx.fillText("@taroodr", 600, 500);

  const buffer = canvas.toBuffer();

  fs.writeFileSync(path.resolve(`./public/ogp/${slug}.png`), buffer);
};

export default createOgp;
