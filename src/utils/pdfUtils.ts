
import { PDFDocument, rgb, PageSizes, degrees, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

export class PDFUtils {
  static async createPDFFromText(text: string, filename: string = 'document.pdf') {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const { width, height } = page.getSize();
    const fontSize = 12;
    const lines = text.split('\n');
    let yPosition = height - 50;

    lines.forEach((line) => {
      if (yPosition < 50) {
        const newPage = pdfDoc.addPage();
        yPosition = newPage.getSize().height - 50;
        newPage.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      } else {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
      yPosition -= fontSize + 2;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  static async mergePDFs(pdfFiles: File[], filename: string = 'merged.pdf') {
    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  static async splitPDF(file: File, pageRanges: number[][]) {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    for (let i = 0; i < pageRanges.length; i++) {
      const [start, end] = pageRanges[i];
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdfDoc, Array.from({length: end - start + 1}, (_, k) => start + k - 1));
      pages.forEach(page => newPdf.addPage(page));
      
      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      saveAs(blob, `split_${i + 1}.pdf`);
    }
  }

  static async rotatePDF(file: File, rotationAngle: number, filename: string = 'rotated.pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const pages = pdfDoc.getPages();
    
    pages.forEach((page) => {
      page.setRotation(degrees(rotationAngle));
    });
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  static async addWatermark(file: File, watermarkText: string, filename: string = 'watermarked.pdf') {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - 50,
        y: height / 2,
        size: 50,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.3,
      });
    });

    const watermarkedPdfBytes = await pdfDoc.save();
    const blob = new Blob([watermarkedPdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  static async addPageNumbers(file: File, filename: string = 'numbered.pdf') {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {
      const { width } = page.getSize();
      page.drawText(`${index + 1}`, {
        x: width / 2 - 10,
        y: 30,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
    });

    const numberedPdfBytes = await pdfDoc.save();
    const blob = new Blob([numberedPdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  static async imageArrayToPDF(imageFiles: File[], filename: string = 'images.pdf') {
    const pdfDoc = await PDFDocument.create();

    for (const imageFile of imageFiles) {
      const imageBytes = await imageFile.arrayBuffer();
      let image;
      
      if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (imageFile.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        continue; // Skip unsupported formats
      }

      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const imageAspectRatio = image.width / image.height;
      const pageAspectRatio = width / height;

      let scaledWidth, scaledHeight;
      if (imageAspectRatio > pageAspectRatio) {
        scaledWidth = width - 100;
        scaledHeight = scaledWidth / imageAspectRatio;
      } else {
        scaledHeight = height - 100;
        scaledWidth = scaledHeight * imageAspectRatio;
      }

      page.drawImage(image, {
        x: (width - scaledWidth) / 2,
        y: (height - scaledHeight) / 2,
        width: scaledWidth,
        height: scaledHeight,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  // Demo function for file conversion (normally would use backend)
  static async simulateConversion(file: File, targetFormat: string) {
    // This is a demo implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const blob = new Blob(['Demo converted file'], { type: 'application/octet-stream' });
        resolve(blob);
      }, 2000);
    });
  }
}
