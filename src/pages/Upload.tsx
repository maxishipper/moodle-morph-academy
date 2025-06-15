
import React, { useState } from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FileUploadZone from '@/components/FileUploadZone';

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      {/* Header */}
      <header className="bg-[#0f6cbf] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Doodle</h1>
            </div>
            <Link to="/">
              <Button className="bg-white text-[#0f6cbf] hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f6cbf] mb-2">Upload Course Materials</h2>
          <p className="text-gray-600 mb-8">Upload your PDF course materials to unlock all learning features</p>
          
          <FileUploadZone onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />
          
          {uploadedFiles.length > 0 && (
            <div className="mt-8 text-center">
              <Link to="/">
                <Button className="bg-[#0f6cbf] hover:bg-[#0d5aa7] text-lg px-8 py-3">
                  Continue to Learning Apps
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
