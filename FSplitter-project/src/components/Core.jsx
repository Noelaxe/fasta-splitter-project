import FileUploader from "./FileUploader"
import { useState, useEffect } from "react";
import { splitSequences } from "../utils/splitSequences";
import { downloadZip } from "../utils/downloadZip";

function Core() {
    const [sequences, setSequences] = useState([]);
    const [fileName, setFileName] = useState("");
    const [chunkSize, setChunkSize] = useState(null);

    useEffect(() => {
        console.log("Chunk size updated to:", chunkSize)
      }, [chunkSize]);

    return(
        <div>
            <h1 className="mt-3 font-semibold font-sans text-[20px]">1. Upload your FASTA file</h1>
            <div className="m-3 ml-3 p-3 border-2 border-dashed border-green-700 rounded-md bg-green-50 flex-col flex items-center justify-center text-center">
                
                <img src="public/upload-file-svgrepo-com.svg" className="w-15 h-15 m-5" />
                
                
                <p className="text-gray-800 font-semibold text-lg mb-2">Choose your FASTA file</p>
                
                <FileUploader 
                onSequencesLoaded={setSequences}
                onFileLoaded={setFileName}
                />  

            
            </div>
            <div className="pr-3">
                <h1 className="mt-7 font-semibold font-sans text-[20px]">2. Set number of sequences per file</h1>
                <p className="font-sans text-gray-900">Enter number of sequences in each file:</p>
                <div className="pr-3">
                    <input
                    type="number"
                    min={1}
                    value={chunkSize ?? ""}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setChunkSize(e.target.value === "" ? null : Number(e.target.value));
                    }}
                    placeholder="Enter number of sequences in each file (e.g. 1000)"
                    className="mb-3 mt-3 w-full shrink-0 ml-3 mr-6 border border-gray-200 shadow-sm py-3 pl-12 pr-4 rounded-xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 placeholder:text-gray-400"
                    />
                </div>
            </div>
            <div>
                <h1 className="mt-5 font-semibold font-sans text-[20px]">3. Split and Download</h1>
                <p className="font-sans text-gray-900">Click the button below to split your file. All parts will be bundled and downloaded as a .zip file.</p>
                <div className="pr-3">
                    <button 
                        disabled={chunkSize<=0 || sequences.length===0}
                        onClick={async () => {
                            const chunks = splitSequences(sequences, chunkSize);

                            await downloadZip(chunks, fileName.substring(0, fileName.length - 6))
                            }
                        }
                        className="
                            mt-2
                            bg-green-600
                            rounded-md
                            text-white
                            m-1 p-2
                            pl-3.5 pr-3.5
                            text-m
                            font-semibold
                            cursor-pointer
                            hover:bg-green-700
                            w-full
                        ">
                        Split FASTA File
                    </button>
                </div>
            </div>
            <div className="border-none bg-green-50 rounded-md m-1 p-2 mt-4">
                <p className="font-medium text-green-700">Your files are processed directly in your browser without offloading to any server.</p>
                <p className="font-medium text-green-700">Speed of processing depends on your computer hardware.</p>
            </div>

        </div>
    )
}

export default Core