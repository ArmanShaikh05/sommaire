import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const fetchAndExtractPdfText = async (pdfUrl: string) => {
  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    const loader = new PDFLoader(new Blob([arrayBuffer]));
    const docs = await loader.load();

    return docs.map((doc) => doc.pageContent).join("\n");

  } catch (error) {
    console.log(error, "Error in extracting text");
  }
};
