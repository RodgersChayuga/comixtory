// File: app/image-upload.tsx
'use client';

import { useStore } from '@/lib/zustandStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadImagesPage() {
    const { images, setImages } = useStore();
    const router = useRouter();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setImages([...images, ...newFiles]);
    }, [images, setImages]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    const handleNext = () => {
        router.push('/preview');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Upload Reference Images</h1>

            <div
                {...getRootProps()}
                className={`border-4 border-dashed rounded-lg p-10 text-center transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop the files here...</p>
                ) : (
                    <p>Drag and drop images here, or click to select files</p>
                )}
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                    {images.map((file: any, idx: number) => (
                        <div key={idx} className="relative group border rounded overflow-hidden">
                            <img src={file.preview} alt={`upload-${idx}`} className="w-full h-32 object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                    Next: Preview Comic
                </button>
            </div>
        </div>
    );
}
