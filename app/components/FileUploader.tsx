import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const maxFileSize = 20 * 1024 * 1024; // 20MB

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0] || null;

      setFile(selected); // ✅ control UI
      onFileSelect?.(selected);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
    noClick: true, // 🔥 important fix
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null); // ✅ clear UI
    onFileSelect?.(null);
  };

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()} className="p-6">
        <input {...getInputProps()} />

        {file ? (
          <div className="uploader-selected-file flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/pdf.png" alt="pdf" className="size-10" />

              <div>
                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatSize(file.size)}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="p-2 cursor-pointer"
              onClick={handleRemove}
            >
              <img
                src="/icons/cross.svg"
                alt="remove"
                className="w-4 h-4"
              />
            </button>
          </div>
        ) : (
          <div
            className="space-y-4 text-center cursor-pointer"
            onClick={open} // 🔥 manual open
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <img src="/icons/info.svg" alt="upload" className="size-20" />
            </div>

            <p className="text-lg text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>

            <p className="text-sm text-gray-500">
              PDF (max {formatSize(maxFileSize)})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;