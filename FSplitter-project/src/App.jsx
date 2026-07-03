import {useState, useEffect} from 'react';
import FileUploader from './components/FileUploader';
import { splitSequences } from './utils/splitSequences';
import { downloadFile } from './utils/downloadFile';
import { downloadZip } from './utils/downloadZip';

const App = () => {
  const [chunkSize, setChunkSize] = useState(0);
  const [sequences, setSequences] = useState([]);
  const [chunks, setChunks] = useState([[]]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    console.log("Chunk size updated to:", chunkSize)
  }, [chunkSize]);

  return ( 
    <div>
      <h1 className="text-3xl font-bold underline">Splitfas, son of faSplit, the Splitter of Fastas</h1>
      <br></br>

      <FileUploader 
          onSequencesLoaded={setSequences}
          onFileLoaded={setFileName}
          />    

      <br></br>

      <p>Enter number of sequences in each file:</p>
      <input
        type="number"
        min={1}
        value={chunkSize}
        onChange={(e) => setChunkSize(parseInt(e.target.value))}
        className="border mb-5"
        />
      <br></br>  
      
      <button 
          disabled={chunkSize<=0 || sequences.length===0}
          onClick={async () => {
              const chunks = splitSequences(sequences, chunkSize);

              await downloadZip(chunks, fileName)
            }
          }
          className="
                block text-sm text-black
                bg-red-500
                rounded-md
                p-2
                pl-4 pr-4
                cursor-pointer
            "
        >
          Split and Download!
      </button>

      
    </div>
   );
}
 
export default App;
 
