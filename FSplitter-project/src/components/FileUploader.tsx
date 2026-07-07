import {ChangeEvent, useState} from "react";
import { parseFasta } from "../utils/parseFasta";
import { useRef } from "react";

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
    const fileInputRef = useRef(null);
    const validExtensions = [".fasta",".fa",".faa",".fna",".ffn",".frn",".fas"];


    function handleButtonClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        
        if (e.target.files) {
            console.log("handleFileChange started")

            const isValidExtension = validExtensions.some(ext =>
              e.target.files[0].name.toLowerCase().endsWith(ext)
            );

            if (!isValidExtension) {
                 alert("Please upload a FASTA file.");
                return;
            }   

            setFile(e.target.files[0]);
            console.log(file)

            handleFileUpload(e.target.files[0])
        }
    }

    async function handleFileUpload(file: File) {
        console.log("handleFileUpload function started")
        if(!file) return;

        try{
            console.log("handleFileUpload try block started")
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
        

            <button 
                onClick={handleButtonClick}
                className="
                    bg-green-600
                    rounded-md
                    text-white
                    m-1 p-2
                    pl-3.5 pr-3.5
                    text-sm
                    font-medium
                    cursor-pointer
                    hover:bg-green-700"
            >
                    Choose File
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept=".fasta,.fa,.faa,.fna,.ffn,.frn,.fas"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />

            {file && <p>{file.name}</p>}

            
            {status === 'success' && (
                <p className="text-sm text-green-600">File uploaded successfully!</p>
            )}

            {status==='error' && (
                <p className="text-sm text-red-600">Upload failed. Please try again</p>
            )}
    </div>
    );
}