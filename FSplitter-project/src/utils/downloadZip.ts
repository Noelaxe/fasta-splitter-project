import JSZip from 'jszip';

export async function downloadZip(chunks: string[][], baseFileName: string) {
    const zip = new JSZip();

    chunks.forEach((chunk, index) => {
        const fastaText = chunk.join("\n");

        zip.file(
            `${baseFileName}_part_${index + 1}.fasta`,
            fastaText
        );
    });

    const blob = await zip.generateAsync({
        type: "blob"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${baseFileName}_split.zip`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}