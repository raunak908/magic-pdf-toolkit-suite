
import React, { useState } from 'react';
import PDFToolLayout from '@/components/PDFToolLayout';
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw } from 'lucide-react';
import { PDFUtils } from '@/utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

const RotatePDF = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileUpload = (files: FileList) => {
    const file = files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast({ title: 'फ़ाइल अपलोड की गई', description: 'PDF फ़ाइल सफलतापूर्वक लोड की गई।' });
    } else {
      toast({ title: 'गलत फ़ाइल प्रकार', description: 'कृपया एक PDF फ़ाइल अपलोड करें।', variant: 'destructive' });
    }
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const handleProcess = async () => {
    if (!uploadedFile) {
      toast({ title: 'कोई फ़ाइल नहीं', description: 'कृपया एक PDF फ़ाइल अपलोड करें।', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    try {
      await PDFUtils.rotatePDF(uploadedFile, rotation, 'rotated-pdf.pdf');
      setIsComplete(true);
      toast({ title: 'सफल!', description: 'PDF सफलतापूर्वक रोटेट की गई और डाउनलोड की गई।' });
    } catch (error) {
      toast({ title: 'त्रुटि', description: 'PDF रोटेट करने में त्रुटि हुई।', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PDFToolLayout
      title="Rotate PDF"
      description="PDF पेजों को रोटेट करें"
      acceptedFiles=".pdf"
      onFileUpload={handleFileUpload}
      onProcess={handleProcess}
      isProcessing={isProcessing}
      isComplete={isComplete}
    >
      <div className="space-y-4">
        {uploadedFile && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-700">
              फ़ाइल: {uploadedFile.name}
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            रोटेशन कोण: {rotation}°
          </label>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleRotate(-90)}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              90° बाएं
            </Button>
            <Button
              variant="outline"
              onClick={() => handleRotate(90)}
              className="flex items-center gap-2"
            >
              <RotateCw className="h-4 w-4" />
              90° दाएं
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setRotation(0)}
            className="w-full"
          >
            रीसेट करें
          </Button>
        </div>
      </div>
    </PDFToolLayout>
  );
};

export default RotatePDF;
