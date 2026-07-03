export function splitSequences(seqArr: string[], chunkSize: number): string[][] {
    if (chunkSize <=0) {
        console.error("Chunk size must be greater than 0"); 
    }

    const chunks: string[][] = [];

    for (let i=0; i<seqArr.length; i += chunkSize) {
        chunks.push(seqArr.slice(i, i+chunkSize));
    }

    console.log(chunks);
    return chunks;
}