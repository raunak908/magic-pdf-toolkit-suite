
import React, { useState } from 'react';
import { ArrowLeft, Upload, Download, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PDFToolLayoutProps {
  title: string;
  description: string;
  acceptedFiles: string;
  children: React.ReactNode;
  onFileUpload: (files: FileList) => void;
  onProcess: () => void;
  onDownload?: () => void;
  isProcessing: boolean;
  isComplete: boolean;
}

const PDFToolLayout: React.FC<PDFToolLayoutProps> = ({
  title,
  description,
  acceptedFiles,
  children,
  onFileUpload,
  onProcess,
  onDownload,
  isProcessing,
  isComplete
}) => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* AdSense Space - Top */}
      <div className="w-full h-20 bg-gray-100 border-b flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-sm">AdSense Advertisement Space - 728 x 90</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            वापस होम पर जाएं
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Main Tool Interface */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                फ़ाइल अपलोड करें
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  फ़ाइलों को यहाँ खींचें और छोड़ें
                </p>
                <p className="text-sm text-gray-500 mb-4">या</p>
                <input
                  type="file"
                  accept={acceptedFiles}
                  onChange={handleFileInput}
                  className="hidden"
                  id="fileInput"
                  multiple
                />
                <label htmlFor="fileInput">
                  <Button variant="outline" className="cursor-pointer">
                    फ़ाइल चुनें
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  स्वीकृत प्रारूप: {acceptedFiles}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Process Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                प्रोसेसिंग
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {children}
              
              <Button
                onClick={onProcess}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? 'प्रोसेसिंग...' : 'कन्वर्ट करें'}
              </Button>

              {isComplete && onDownload && (
                <Button
                  onClick={onDownload}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  डाउनलोड करें
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AdSense Space - Bottom */}
      <div className="w-full h-20 bg-gray-100 border-t flex items-center justify-center text-gray-500 mt-8">
        <div className="text-center">
          <p className="text-sm">AdSense Advertisement Space - 728 x 90</p>
        </div>
      </div>
    </div>
  );
};

export default PDFToolLayout;
