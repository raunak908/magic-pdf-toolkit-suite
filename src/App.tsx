
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TextToPDF from "./pages/tools/TextToPDF";
import MergePDF from "./pages/tools/MergePDF";
import ImageToPDF from "./pages/tools/ImageToPDF";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/text-to-pdf" element={<TextToPDF />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/jpg-to-pdf" element={<ImageToPDF />} />
          <Route path="/png-to-pdf" element={<ImageToPDF />} />
          {/* शेष सभी टूल्स के लिए डेमो पेज */}
          <Route path="/word-to-pdf" element={<TextToPDF />} />
          <Route path="/excel-to-pdf" element={<TextToPDF />} />
          <Route path="/ppt-to-pdf" element={<TextToPDF />} />
          <Route path="/html-to-pdf" element={<TextToPDF />} />
          <Route path="/pdf-to-word" element={<TextToPDF />} />
          <Route path="/pdf-to-excel" element={<TextToPDF />} />
          <Route path="/pdf-to-ppt" element={<TextToPDF />} />
          <Route path="/pdf-to-jpg" element={<TextToPDF />} />
          <Route path="/pdf-to-png" element={<TextToPDF />} />
          <Route path="/split-pdf" element={<MergePDF />} />
          <Route path="/compress-pdf" element={<TextToPDF />} />
          <Route path="/unlock-pdf" element={<TextToPDF />} />
          <Route path="/protect-pdf" element={<TextToPDF />} />
          <Route path="/rotate-pdf" element={<TextToPDF />} />
          <Route path="/add-watermark" element={<TextToPDF />} />
          <Route path="/add-page-numbers" element={<TextToPDF />} />
          <Route path="/rearrange-pages" element={<TextToPDF />} />
          <Route path="/extract-images" element={<TextToPDF />} />
          <Route path="/extract-text" element={<TextToPDF />} />
          <Route path="/pdf-form-filler" element={<TextToPDF />} />
          <Route path="/pdf-validator" element={<TextToPDF />} />
          <Route path="/ocr-pdf" element={<TextToPDF />} />
          <Route path="/page-counter" element={<TextToPDF />} />
          <Route path="/remove-pages" element={<TextToPDF />} />
          <Route path="/add-pages" element={<TextToPDF />} />
          <Route path="/pdf-info" element={<TextToPDF />} />
          <Route path="/sign-pdf" element={<TextToPDF />} />
          <Route path="/markdown-to-pdf" element={<TextToPDF />} />
          <Route path="/email-to-pdf" element={<TextToPDF />} />
          <Route path="/csv-to-pdf" element={<TextToPDF />} />
          <Route path="/crop-pdf" element={<TextToPDF />} />
          <Route path="/remove-background" element={<TextToPDF />} />
          <Route path="/edit-metadata" element={<TextToPDF />} />
          <Route path="/annotate-pdf" element={<TextToPDF />} />
          <Route path="/pdf-editor" element={<TextToPDF />} />
          <Route path="/redact-pdf" element={<TextToPDF />} />
          <Route path="/pdf-reader" element={<TextToPDF />} />
          <Route path="/merge-images-pdf" element={<ImageToPDF />} />
          <Route path="/delete-pages" element={<TextToPDF />} />
          <Route path="/edit-bookmarks" element={<TextToPDF />} />
          <Route path="/fill-forms" element={<TextToPDF />} />
          <Route path="/pdf-to-svg" element={<TextToPDF />} />
          <Route path="/url-to-pdf" element={<TextToPDF />} />
          <Route path="/batch-convert" element={<TextToPDF />} />
          <Route path="/compare-pdfs" element={<TextToPDF />} />
          <Route path="/translate-pdf" element={<TextToPDF />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
