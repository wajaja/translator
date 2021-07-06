// import * as tf from '@tensorflow/tfjs-node-gpu'

import * as tf from '@tensorflow/tfjs-node'
const fs = require('fs')




const epochs        = 100       // Number of epochs to train for.
const batch_size    = 64        // Batch size for training.
const latent_dim    = 256       // Latent dimensionality of the encoding space.
const num_samples   = 2000    // Number of samples to train on.
const data_path     = "./data/anki/fra-eng/fra.txt" // Path to the data txt file on disk.


var input_texts       = []
var target_texts      = []
var input_characters  = []
var target_characters = []


/////https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
const zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))

const data = fs.readFileSync(data_path, 'utf8')

const lines = data.split("\n");
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

const max_encoder_seq_length = input_texts.reduce((max, v) => max >= v.length ? max : v.length, -Infinity)
const max_decoder_seq_length = target_texts.reduce((max, v) => max >= v.length ? max : v.length, -Infinity)

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

console.log([input_texts.length, max_encoder_seq_length, num_encoder_tokens])

const encoder_input_data = tf.zeros([3, max_encoder_seq_length, num_encoder_tokens], "float32")

const decoder_input_data = tf.zeros([5, max_decoder_seq_length, num_decoder_tokens], "float32")

const decoder_target_data = tf.zeros([4, max_decoder_seq_length, num_decoder_tokens], "float32")


console.log(zip(input_texts, target_texts));
/*
for (const [input_text, target_text] of zip(input_texts, target_texts).entries()) {
    //console.log(index, element);
    input_token_index["'" +element + "'"] = index
}

for i, (input_text, target_text) in enumerate(zip(input_texts, target_texts)):

    for t, char in enumerate(input_text):
        encoder_input_data[i, t, input_token_index[char]] = 1.0
    encoder_input_data[i, t + 1 :, input_token_index[" "]] = 1.0
    for t, char in enumerate(target_text):
        # decoder_target_data is ahead of decoder_input_data by one timestep
        decoder_input_data[i, t, target_token_index[char]] = 1.0
        if t > 0:
            # decoder_target_data will be ahead by one timestep
            # and will not include the start character.
            decoder_target_data[i, t - 1, target_token_index[char]] = 1.0
    decoder_input_data[i, t + 1 :, target_token_index[" "]] = 1.0
    decoder_target_data[i, t:, target_token_index[" "]] = 1.0*/




// console.log(target_token_index)
