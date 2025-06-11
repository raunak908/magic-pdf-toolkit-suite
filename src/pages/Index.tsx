
import React, { useState } from 'react';
import { Search, FileText, Download, Upload, Shield, RotateCw, Merge, Split, Image, FileType } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const pdfTools = [
  { id: 1, name: 'Word to PDF', icon: FileText, route: '/word-to-pdf', description: 'Convert Word documents to PDF' },
  { id: 2, name: 'Excel to PDF', icon: FileText, route: '/excel-to-pdf', description: 'Convert Excel files to PDF' },
  { id: 3, name: 'PowerPoint to PDF', icon: FileText, route: '/ppt-to-pdf', description: 'Convert PPT presentations to PDF' },
  { id: 4, name: 'JPG to PDF', icon: Image, route: '/jpg-to-pdf', description: 'Convert JPG images to PDF' },
  { id: 5, name: 'PNG to PDF', icon: Image, route: '/png-to-pdf', description: 'Convert PNG images to PDF' },
  { id: 6, name: 'HTML to PDF', icon: FileType, route: '/html-to-pdf', description: 'Convert HTML pages to PDF' },
  { id: 7, name: 'Text to PDF', icon: FileText, route: '/text-to-pdf', description: 'Convert text files to PDF' },
  { id: 8, name: 'PDF to Word', icon: FileText, route: '/pdf-to-word', description: 'Convert PDF to Word document' },
  { id: 9, name: 'PDF to Excel', icon: FileText, route: '/pdf-to-excel', description: 'Convert PDF to Excel spreadsheet' },
  { id: 10, name: 'PDF to PPT', icon: FileText, route: '/pdf-to-ppt', description: 'Convert PDF to PowerPoint' },
  { id: 11, name: 'PDF to JPG', icon: Image, route: '/pdf-to-jpg', description: 'Convert PDF pages to JPG images' },
  { id: 12, name: 'PDF to PNG', icon: Image, route: '/pdf-to-png', description: 'Convert PDF pages to PNG images' },
  { id: 13, name: 'Split PDF', icon: Split, route: '/split-pdf', description: 'Split PDF into multiple files' },
  { id: 14, name: 'Merge PDF', icon: Merge, route: '/merge-pdf', description: 'Merge multiple PDFs into one' },
  { id: 15, name: 'Compress PDF', icon: Download, route: '/compress-pdf', description: 'Reduce PDF file size' },
  { id: 16, name: 'Unlock PDF', icon: Shield, route: '/unlock-pdf', description: 'Remove password from PDF' },
  { id: 17, name: 'Protect PDF', icon: Shield, route: '/protect-pdf', description: 'Add password to PDF' },
  { id: 18, name: 'Rotate PDF', icon: RotateCw, route: '/rotate-pdf', description: 'Rotate PDF pages' },
  { id: 19, name: 'Add Watermark', icon: FileText, route: '/add-watermark', description: 'Add watermark to PDF' },
  { id: 20, name: 'Add Page Numbers', icon: FileText, route: '/add-page-numbers', description: 'Add page numbers to PDF' },
  { id: 21, name: 'Rearrange Pages', icon: FileText, route: '/rearrange-pages', description: 'Reorder PDF pages' },
  { id: 22, name: 'Extract Images', icon: Image, route: '/extract-images', description: 'Extract images from PDF' },
  { id: 23, name: 'Extract Text', icon: FileText, route: '/extract-text', description: 'Extract text from PDF' },
  { id: 24, name: 'PDF Form Filler', icon: FileText, route: '/pdf-form-filler', description: 'Fill PDF forms' },
  { id: 25, name: 'PDF Validator', icon: Shield, route: '/pdf-validator', description: 'Validate PDF files' },
  { id: 26, name: 'OCR PDF', icon: FileText, route: '/ocr-pdf', description: 'OCR scan to searchable PDF' },
  { id: 27, name: 'PDF Page Counter', icon: FileText, route: '/page-counter', description: 'Count PDF pages' },
  { id: 28, name: 'Remove Pages', icon: FileText, route: '/remove-pages', description: 'Delete specific pages' },
  { id: 29, name: 'Add Pages', icon: FileText, route: '/add-pages', description: 'Insert blank pages' },
  { id: 30, name: 'PDF Info', icon: FileText, route: '/pdf-info', description: 'View PDF information' },
  { id: 31, name: 'Sign PDF', icon: FileText, route: '/sign-pdf', description: 'Add digital signature' },
  { id: 32, name: 'Markdown to PDF', icon: FileText, route: '/markdown-to-pdf', description: 'Convert Markdown to PDF' },
  { id: 33, name: 'Email to PDF', icon: FileText, route: '/email-to-pdf', description: 'Convert emails to PDF' },
  { id: 34, name: 'CSV to PDF', icon: FileText, route: '/csv-to-pdf', description: 'Convert CSV files to PDF' },
  { id: 35, name: 'Crop PDF', icon: FileText, route: '/crop-pdf', description: 'Crop PDF pages' },
  { id: 36, name: 'Remove Background', icon: Image, route: '/remove-background', description: 'Remove PDF background' },
  { id: 37, name: 'Edit Metadata', icon: FileText, route: '/edit-metadata', description: 'Edit PDF metadata' },
  { id: 38, name: 'Annotate PDF', icon: FileText, route: '/annotate-pdf', description: 'Add annotations to PDF' },
  { id: 39, name: 'PDF Editor', icon: FileText, route: '/pdf-editor', description: 'Basic PDF editing' },
  { id: 40, name: 'Redact PDF', icon: FileText, route: '/redact-pdf', description: 'Redact sensitive content' },
  { id: 41, name: 'PDF Reader', icon: FileText, route: '/pdf-reader', description: 'View PDF files online' },
  { id: 42, name: 'Merge Images', icon: Image, route: '/merge-images-pdf', description: 'Merge images into PDF' },
  { id: 43, name: 'Delete Pages', icon: FileText, route: '/delete-pages', description: 'Remove PDF pages' },
  { id: 44, name: 'Edit Bookmarks', icon: FileText, route: '/edit-bookmarks', description: 'Manage PDF bookmarks' },
  { id: 45, name: 'Fill Forms', icon: FileText, route: '/fill-forms', description: 'Fill PDF forms online' },
  { id: 46, name: 'PDF to SVG', icon: Image, route: '/pdf-to-svg', description: 'Convert PDF pages to SVG' },
  { id: 47, name: 'URL to PDF', icon: FileText, route: '/url-to-pdf', description: 'Convert web pages to PDF' },
  { id: 48, name: 'Batch Convert', icon: FileText, route: '/batch-convert', description: 'Batch convert files' },
  { id: 49, name: 'Compare PDFs', icon: FileText, route: '/compare-pdfs', description: 'Compare two PDF files' },
  { id: 50, name: 'Translate PDF', icon: FileText, route: '/translate-pdf', description: 'Translate PDF content' }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredTools = pdfTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* AdSense Space - Top */}
      <div className="w-full h-24 bg-gray-100 border-b flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>AdSense Advertisement Space</p>
          <p className="text-sm">728 x 90</p>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              PDF Tools Suite
            </h1>
            <p className="text-xl text-gray-600">
              Complete PDF solution with 50+ professional tools
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search PDF tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white"
              onClick={() => navigate(tool.route)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <tool.icon className="h-12 w-12 mx-auto text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tools found matching your search.</p>
          </div>
        )}
      </main>

      {/* AdSense Space - Bottom */}
      <div className="w-full h-24 bg-gray-100 border-t flex items-center justify-center text-gray-500 mt-12">
        <div className="text-center">
          <p>AdSense Advertisement Space</p>
          <p className="text-sm">728 x 90</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 PDF Tools Suite. सभी अधिकार सुरक्षित।</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
