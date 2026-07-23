// Firebase Storage is on hold (Blaze plan not active yet), so proof-of-
// payment files are stored inline as base64 on the Payment document
// instead. Firestore caps a document at ~1MB, so images are downscaled and
// re-encoded as JPEG client-side before storing; PDFs can't be compressed,
// so oversized ones are rejected with a clear message.
const MAX_DIMENSION = 1200;
const JPEG_QUALITY = 0.72;
const MAX_DATA_URL_BYTES = 700_000;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

async function compressImage(file: File): Promise<string> {
  const dataUrl = await readAsDataUrl(file);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Unable to load image."));
    img.src = dataUrl;
  });

  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}

export async function fileToProofOfPayment(
  file: File
): Promise<{ dataUrl: string; fileName: string }> {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";
  if (!isImage && !isPdf) {
    throw new Error("Please upload an image (JPG/PNG) or a PDF file.");
  }

  const dataUrl = isImage ? await compressImage(file) : await readAsDataUrl(file);

  if (dataUrl.length > MAX_DATA_URL_BYTES) {
    throw new Error(
      isPdf
        ? "This PDF is too large. Please upload a file under 500KB, or a photo of the receipt instead."
        : "This image is too large even after compression. Please try a smaller photo."
    );
  }

  return { dataUrl, fileName: file.name };
}
