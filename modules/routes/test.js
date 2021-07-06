var input_texts = []
var target_texts = []
var input_characters = []
var target_characters = []
var num_samples = 10000
var lines = ["Go.   Va !    CC-BY 2.0 (France) Attribution: tatoeba.org #2877272 (CM) & #1158250 (Wittydev)", "Fire!    Au feu !    CC-BY 2.0 (France) Attribution: tatoeba.org #1829639 (Spamster) & #4627939 (sacredceltic)", "Jump!  Saute.  CC-BY 2.0 (France) Attribution: tatoeba.org #1102981 (jamessilver) & #2416938 (Micsmithel)"]


for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let lineArr = line.split("\t");
    let input_text = lineArr[0] 
    let target_text = lineArr[1]
    let _ = lineArr[2]
    
    
   
    // We use "tab" as the "start sequence" character
    //for the targets, and "\n" as "end sequence" character.
    target_text = "\t" + target_text + "\n"
    input_texts.push(input_text)
    target_texts.push(target_text)
    
    
    
    for (let _i  = 0; _i < input_text.length; _i++) {
        let char = input_text[_i];
                if(!input_characters.includes(char))
                input_characters.push(char)
    }
    
    for (let __i = 0; __i < target_text.length; __i++) {
        let char = target_text[__i];
                if(!target_characters.includes(char))
                target_characters.push(char)
    }
}

input_characters = input_characters.sort((a, b) => a.localeCompare(b))
target_characters = target_characters.sort((a, b) => a.localeCompare(b))

var num_encoder_tokens = input_characters.length
var num_decoder_tokens = target_characters.length

console.log(input_texts.map(inp => inp.length))

max_encoder_seq_length = Math.max(...input_texts.map(inp => inp.length))
max_decoder_seq_length = Math.max(...target_texts.map(inp => inp.length))

console.log("Number of samples:", input_texts.length)
console.log("Number of unique input tokens:", num_encoder_tokens)
console.log("Number of unique output tokens:", num_decoder_tokens)
console.log("Max sequence length for inputs:", max_encoder_seq_length)
console.log("Max sequence length for outputs:", max_decoder_seq_length)

var input_token_index = {};
for (const [index, element] of input_characters.entries()) {
    //console.log(index, element);
    input_token_index["'" +element + "'"] = index
}

var target_token_index = {};
for (const [index, element] of target_characters.entries()) {
    //console.log(index, element);
    target_token_index["'" +element + "'"] = index
}

console.log(target_token_index)