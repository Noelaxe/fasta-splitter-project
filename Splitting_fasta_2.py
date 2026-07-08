limit = 100  # Enter the limit of sequences in each file
inputfile = "Bcell_VJ_sh.fasta" # Enter the input file name here
outname = "Bcell_VJ_sh" # Enter output file name here

outname = outname+"_P"
tempfile = outname + "0.fasta"

file2 = open(tempfile, "w")
count = 0

with open(inputfile, "r") as file1:
    for line in file1:
        if line[0] == ">" and count % limit == 0:
            file2.close()
            file2 = open(outname + str((count // limit) + 1) + ".fasta", "w") 
            
        if line[0] == ">":
            count += 1
            
        file2.write(line)
        print(line)

file2.close() 
