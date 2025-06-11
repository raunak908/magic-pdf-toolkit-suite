
import React, { useState } from 'react';
import PDFToolLayout from '@/components/PDFToolLayout';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { PDFUtils } from '@/utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

const MergePDF = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => file.type === 'application/pdf');
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast({ 
      title: 'फ़ाइलें जोड़ी गईं', 
      description: `${newFiles.length} PDF फ़ाइलें सफलतापूर्वक जोड़ी गईं।` 
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (uploadedFiles.length < 2) {
      toast({ 
        title: 'कम फ़ाइलें', 
        description: 'कम से कम 2 PDF फ़ाइलें आवश्यक हैं।', 
        variant: 'destructive' 
      });
      return;
    }

    setIsProcessing(true);
    try {
      await PDFUtils.mergePDFs(uploadedFiles, 'merged-pdfs.pdf');
      setIsComplete(true);
      toast({ title: 'सफल!', description: 'PDF फ़ाइलें सफलतापूर्वक मर्ज की गईं और डाउनलोड की गईं।' });
    } catch (error) {
      toast({ title: 'त्रुटि', description: 'PDF मर्ज करने में त्रुटि हुई।', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PDFToolLayout
      title="Merge PDF"
      description="कई PDF फ़ाइलों को एक में मिलाएं"
      acceptedFiles=".pdf"
      onFileUpload={handleFileUpload}
      onProcess={handleProcess}
      isProcessing={isProcessing}
      isComplete={isComplete}
    >
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          अपलोड की गई फ़ाइलें ({uploadedFiles.length}):
        </label>
        
        {uploadedFiles.length > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">अभी तक कोई फ़ाइल अपलोड नहीं की गई।</p>
        )}
        
        <p className="text-sm text-gray-500">
          फ़ाइलों को उसी क्रम में मर्ज किया जाएगा जिस क्रम में वे सूचीबद्ध हैं।
        </p>
      </div>
    </PDFToolLayout>
  );
};

export default MergePDF;
