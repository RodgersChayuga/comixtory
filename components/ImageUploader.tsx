'use client';

import { useDropzone } from 'react-dropzone';
import { useStore } from '@/lib/zustandStore';

export default function ImageUploader() {
    const { images, setImages } = useStore();

    const onDrop = (acceptedFiles: File[]) => {
        setImages([...images, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="space-y-4">
            <div {...getRootProps()} className="border-2 border-dashed rounded p-6 text-center cursor-pointer">
                <input {...getInputProps()} />
                <p>📤 Drag & drop or click to upload character images</p>
            </div>
            <div className="flex gap-4 flex-wrap">
                {images.map((file, i) => (
                    <img key={i} src={URL.createObjectURL(file)} alt={`upload-${i}`} className="w-24 h-24 object-cover rounded border" />
                ))}
            </div>
        </div>
    );
}