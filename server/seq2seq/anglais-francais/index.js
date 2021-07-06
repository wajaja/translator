import  Translator             from '../index';



const model_path = 'file:///opt/nodejs/translator/public/translation.keras/en-fr/model.json',
metadata_path    = './public/translation.keras/en-fr/metadata.json';

var translator   = new Translator();


translator.loadModel(model_path, metadata_path).then(model => {
    translator.prepareEncoderModel(model);
    translator.prepareDecoderModel(model);
})

var specials_chars = ['#', '@', "+", ';', ',', '/', ':', '-', '*', '_', '↵'];
var end_chars = ['.', '!', '?'];                        // check the end of phrase

//translating phrase
function anglais_francais(str, order, uniqueString) {
    let metadatas    = null;
    let sourcePhrase = str
    let endPhrase    = ""; //sourcePhrase.substr(sourcePhrase.length - 1); // => 
    /*str = str
         // .replace(/["']/g, "") //Be carefull !!!!!!!
         .replace(/\\/g, " ")
         .replace(/["]/g, " ")
         .allReplace({
            ',': ' ,',
            ';': ' ;',
            ':': ' :',
        })*/

    return new Promise(function(resolve, reject) {

        // let words   = str.split(/["' ]/g);     //split into word
        // words       = words.filter(str => str !== ' ');   //remove empty string

        let resolved_phrase = translator.translate(sourcePhrase) ? translator.translate(sourcePhrase) : translatePeerWord(sourcePhrase);
                           
        resolve({
            'phrase' : "<span contenteditable tabIndex='0' data-type='phrase' class='editable-wpr' id="+ order +" source-phrase='"+ sourcePhrase +"'><span>" + resolved_phrase + endPhrase + "&nbsp;<span source-phrase="+ sourcePhrase +" class='editable-meta'></span></span>",  
            'uniqueString': uniqueString,
            'order': order,
            'metadatas': metadatas
        }); //TODO make first char to uppercase
    });
}


function translatePeerWord(sourcePhrase) {

    console.log('terme to translate peer word', sourcePhrase)
    var translated_words = words.map(function(_w, index) {

        let w       = _w.toLowerCase().replace(/[.!?,;]/g, ''),            //LowerCase
        end_phrase  = '';

        /*if(specials_chars.indexOf(_w) >= 0) {
            return {'word_type':'char', 'val': _w, 'translated': false, 'pos': index, 'source': _w};
        }*/

        if(end_chars.indexOf(_w) >= 0) {
            // w = w.replace(/[.!?,;]/g, '');   // replace .!? attached to word
            end_phrase = end_chars[end_chars.indexOf(_w)]; //set end phrase' s char
        }

        if(w) {
            //check for "nom propre" starting with uppercase
            if (/^[A-Z]/.test(_w) && index === 0 ) { //Noum at 0
                return {'word_type':'noum', 'val': _w, 'translated': false, 'pos': index};
            } 
            else if(parseInt(_w, 10)) { //Number
                return {'word_type':'number', 'val': w, 'translated': false, 'pos': index, 'source': _w};
            }
            //find Word
            else {
                let trans = translator.translate(sourcePhrase);
                prevType  = {}; //reset prevType
                return {
                    'word_type': 'word',
                    'translated': true,
                    'prefixVerbal': true,   //join prefixVerbal because a word has article
                    'val': !!trans ? {'number': 'singular', 'val': trans } : ' ' + _w, //if word not founded then return the french version
                    'attach': getAttachedChar(_w),
                    'pos': index
                    , 'source': _w
                }
            }
        } 
    })

    return translated_words.reduce(function(_phrase, currWord, idx) {
        let sourceWord = currWord.source ? currWord.source : "";

        let __val = (typeof currWord === 'object') ? currWord.val : '';

        return idx == 0 
            ? "<span contenteditable tabIndex='0' id="+ idx +" source-word="+ sourceWord +" class='editable-wpr'><span>" + __val + "</span><span source-word="+ sourceWord +" class='editable-meta'></span></span>"
            : _phrase + ' ' + "<span contenteditable tabIndex='0' id="+ idx +" source-word="+ sourceWord +" class='editable-wpr'><span>" + __val + "</span><span source-word="+ sourceWord +" class='editable-meta'></span></span>" + ' ';
    }, '');
}


/**
 * [getAttachedChar attach somme attached char to word e.g: , ; ...]
 * @return {[type]} [description]
 */
function getAttachedChar(_w) {
    if([',', ';'].indexOf(_w) >= 0) {
        // w = w.replace(/[.!?,;]/g, '');   // replace .!? attached to word
        return  [',', ';'][[',', ';'].indexOf(w)]; //set end phrase' s char
    }
    return '';
}


export default anglais_francais;