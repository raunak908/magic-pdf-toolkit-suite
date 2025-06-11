
import React, { useState } from 'react';
import PDFToolLayout from '@/components/PDFToolLayout';
import { Button } from '@/components/ui/button';
import { X, Image } from 'lucide-react';
import { PDFUtils } from '@/utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

const ImageToPDF = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileUpload = (files: FileList) => {
    const newImages = Array.from(files).filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
    );
    setUploadedImages(prev => [...prev, ...newImages]);
    toast({ 
      title: 'छवियां जोड़ी गईं', 
      description: `${newImages.length} छवियां सफलतापूर्वक जोड़ी गईं।` 
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (uploadedImages.length === 0) {
      toast({ 
        title: 'कोई छवि नहीं', 
        description: 'कम से कम एक छवि अपलोड करें।', 
        variant: 'destructive' 
      });
      return;
    }

    setIsProcessing(true);
    try {
      await PDFUtils.imageArrayToPDF(uploadedImages, 'images-to-pdf.pdf');
      setIsComplete(true);
      toast({ title: 'सफल!', description: 'छवियां सफलतापूर्वक PDF में बदली गईं।' });
    } catch (error) {
      toast({ title: 'त्रुटि', description: 'छवियों को PDF में बदलने में त्रुटि हुई।', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PDFToolLayout
      title="Images to PDF"
      description="छवियों को PDF में बदलें"
      acceptedFiles=".jpg,.jpeg,.png"
      onFileUpload={handleFileUpload}
      onProcess={handleProcess}
      isProcessing={isProcessing}
      isComplete={isComplete}
    >
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          अपलोड की गई छवियां ({uploadedImages.length}):
        </label>
        
        {uploadedImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-20 object-cover rounded border"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="text-xs truncate mt-1">{image.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Image className="h-12 w-12 mx-auto mb-2" />
            <p>अभी तक कोई छवि अपलोड नहीं की गई</p>
          </div>
        )}
      </div>
    </PDFToolLayout>
  );
};

export default ImageToPDF;
