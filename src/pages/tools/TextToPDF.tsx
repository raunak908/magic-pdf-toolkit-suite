
import React, { useState } from 'react';
import PDFToolLayout from '@/components/PDFToolLayout';
import { Textarea } from '@/components/ui/textarea';
import { PDFUtils } from '@/utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

const TextToPDF = () => {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileUpload = (files: FileList) => {
    const file = files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
      toast({ title: 'फ़ाइल अपलोड की गई', description: 'टेक्स्ट फ़ाइल सफलतापूर्वक लोड की गई।' });
    } else {
      toast({ title: 'गलत फ़ाइल प्रकार', description: 'कृपया एक टेक्स्ट फ़ाइल अपलोड करें।', variant: 'destructive' });
    }
  };

  const handleProcess = async () => {
    if (!text.trim()) {
      toast({ title: 'कोई टेक्स्ट नहीं', description: 'कृपया कुछ टेक्स्ट जोड़ें।', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    try {
      await PDFUtils.createPDFFromText(text, 'text-to-pdf.pdf');
      setIsComplete(true);
      toast({ title: 'सफल!', description: 'PDF सफलतापूर्वक बनाई गई और डाउनलोड की गई।' });
    } catch (error) {
      toast({ title: 'त्रुटि', description: 'PDF बनाने में त्रुटि हुई।', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PDFToolLayout
      title="Text to PDF"
      description="टेक्स्ट को PDF में बदलें"
      acceptedFiles=".txt"
      onFileUpload={handleFileUpload}
      onProcess={handleProcess}
      isProcessing={isProcessing}
      isComplete={isComplete}
    >
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          टेक्स्ट दर्ज करें:
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="यहाँ अपना टेक्स्ट लिखें..."
          className="min-h-[200px]"
        />
        <p className="text-sm text-gray-500">
          {text.length} अक्षर
        </p>
      </div>
    </PDFToolLayout>
  );
};

export default TextToPDF;
