import {ChangeEvent, useState} from "react";
import { parseFasta } from "../utils/parseFasta";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type FileUploaderProps = {
    onSequencesLoaded: (sequences: string[]) => void;
    onFileLoaded: (fileName: string) => void;
};

export default function FileUploader({
    onSequencesLoaded, onFileLoaded,
}: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [sequenceCount, setSequenceCount] = useState(0);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    async function handleFileUpload() {
        if(!file) return;

        try{
            setStatus("uploading");

            const text = await file.text();


            type FileUploaderProps = {
                onSequencesLoaded: (sequences: string[]) => void;
            };
            
            const sequences = parseFasta(text);
            console.log(sequences);
            console.log(`Found ${sequences.length} sequences`)
            setSequenceCount(sequences.length)

            console.log("Calling parent");
            onSequencesLoaded(sequences);
            onFileLoaded(file.name);
            console.log("Parent calling finished");
            
            setStatus("success");

        }catch(err) {
            console.error(err);
            setStatus("error");
        }
    }


    return (
    <div className="space-y-2">
        <input 
            type="file"
            onChange={handleFileChange}
            className="
                block w-full text-sm text-gray-500
                file:mr-4
                file:rounded-md
                file:border-0
                file:bg-blue-600
                file:px-4
                file:py-2
                file:text-white
                file:font-medium
                hover:file:bg-blue-700
                file:cursor-pointer
                cursor-pointer
            "/>

            {file && (
             <div className="mb-4 text-sm">
                <p>File name: {file.name}</p>
                <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                {/* <p>Type: {file.type} </p> */}
                <p>Sequences: {sequenceCount} </p>
             </div>   
            )}

            {file && status !== "uploading" && <button 
            onClick={handleFileUpload}
            className="
                block text-sm text-black
                bg-green-400
                rounded-md
                p-2
                pl-4 pr-4
                cursor-pointer
            "
            >Upload File</button>}

            {status === 'success' && (
                <p className="text-sm text-green-600">File uploaded successfully!</p>
            )}

            {status==='error' && (
                <p className="text-sm text-red-600">Upload failed. Please try again</p>
            )}
    </div>
    );
}