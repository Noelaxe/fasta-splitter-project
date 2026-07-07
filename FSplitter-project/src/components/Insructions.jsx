import {BookOpen, Mail} from "lucide-react";

const steps = [
    {
        number: 1,
        title: "Upload FASTA File",
        description:
            'Click "Choose File" and select the file you wish to split.',
    },
    {
        number: 2,
        title: "Set Chunk Size",
        description:
            "Enter the number of sequences you want in each output file.",
        example:
            "Example: If you enter 1000, each file will contain 1000 sequences (except possibly the last one).",
    },
    {
        number: 3,
        title: "Click Split FASTA File",
        description:
            'Click the "Split FASTA File" button and click "OK" in the alert pop-up to process your file. A ZIP file containing all FASTA parts will be downloaded to your device.',
    },
    {
        number: 4,
        title: "Done!",
        description:
            "Extract the ZIP file to access your split FASTA files.",
    },
];

function Instructions() {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

            

            <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-green-600 w-8 h-8" />
                <h2 className="text-[20px] font-bold text-green-600">
                    How to use
                </h2>
            </div>

            

            <div className="space-y-6">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="flex gap-1 border-b border-gray-200 pb-3"
                    >
                        <div className="flex-shrink-0">
                            <div className="mr-2 w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center">
                                {step.number}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[16px] font-semibold text-gray-900">
                                {step.title}
                            </h3>

                            <p className="text-gray-600">
                                {step.description}
                            </p>

                            {step.example && (
                                <p className="text-gray-600 mt-1">
                                    <span className="font-semibold">
                                        Example:
                                    </span>{" "}
                                    {step.example.replace("Example: ", "")}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            

            <div className="mt-10 rounded-xl border border-green-100 bg-green-50 p-6 flex gap-5 items-start">

                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <Mail className="text-green-600 w-7 h-7" />
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">
                        Contact Me
                    </h3>

                    <p className="text-gray-700 mb-4">
                        If you have a found a bug or would like to suggest a feature, please contact:
                    </p>

                    

                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=noelaxe.support@gmail.com"
                        className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline"
                    >
                        <Mail className="w-5 h-5" />
                        noelaxe.support@gmail.com
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Instructions
//blank