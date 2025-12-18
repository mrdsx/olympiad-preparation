import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const FILE_NAME = "matches";

async function handleExportToPDF(target: HTMLDivElement): Promise<void> {
  if (target === null) return;
  const canvas = await html2canvas(target, {
    useCORS: true,
    logging: false,
  });
  html2pdf()
    .set({
      filename: `${FILE_NAME}.pdf`,
      html2canvas: { scale: 2 },
      image: { type: "jpeg", quality: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      margin: [20, 10, 10, 10],
    })
    .from(canvas)
    .save();
}

async function handleExportToPNG(target: HTMLDivElement): Promise<void> {
  if (target === null) return;
  const canvas = await html2canvas(target, {
    useCORS: true,
    logging: false,
  });
  handleSaveMatches(canvas, "png");
}

function handleSaveMatches(canvas: HTMLCanvasElement, extension: string): void {
  const image = canvas.toDataURL(`image/${extension}`);
  const a = document.createElement("a");
  a.href = image;
  a.download = `${FILE_NAME}.${extension}`;
  a.click();
}

export { handleExportToPDF, handleExportToPNG, handleSaveMatches };
