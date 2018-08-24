var { findVerb, findWord }  = require('../../manager');
var { verbs }               = require('./utils/verbs');
var { removeAccents }       = require('./utils/funcs');
var {
    pronon_personnel_keys,
    pronon_personnel_vals,
    articles_keys, ends_ajd_ord,
    demonstratifs_keys,
    demonstratifs_vals,
    prefix_pronominal_keys,
    prefix_pronominal_vals,
    ends_verbs, excepted_verbs,
    verb_avoir, verb_etre, articles_vals,
    preposition_vals, preposition_keys
}                           = require('./utils/modalites');
require('./utils/String.prototype.allReplace');

var aspectArr = ['souvent', 'habitude', 'parfois'];     //check aspect before conjugaison
var specials_chars = ['#', '@', "+", ';', ',', '/', ':', '-', '*', '_', '↵'];
var end_chars = ['.', '!', '?'];                        // check the end of phrase
var composed_verb = false;                              //var that keep if verb is in composed form

function francais_lingala(str, order, uniqueString) {
    str = str
             // .replace(/["']/g, "") //Be carefull !!!!!!!
             .replace(/\\/g, " ")
             .replace(/["]/g, " ")
             .allReplace({
                ',': ' ,',
                ';': ' ;',
                ':': ' :',
            })
    console.log('strrtrtrtrtr', str);
    return new Promise(function(resolve, reject) {
        let words = str.split(/["' ]/g);     //split into word
        words = words.filter(str => str !== ' ');   //remove empty string

        let form    = '',               //phrase form 'negative, interrogative, exclammative, ...'
        pronObject  = {},                //check pers pronom {position, value}
        auxilVerb   = {},                 //auxilVerb {verb, value}
        prevType    = {},
        end_phrase  = '',
        aspect      = aspectArr.indexOf(str) >= 0 ? 'habituel' : ''; //habituel when

        //phrase type; Subjonctif || indicatif ~
        //check que

        var translated_words = words.map(function(_w, index) {

            let w = _w.toLowerCase().replace(/[.!?,;]/g, '');            //LowerCase
            console.log('_w', _w, w);
            if(specials_chars.indexOf(_w) >= 0) {
                return {'word_type':'char', 'val': _w, 'translated': false, 'pos': index};
            }

            if(end_chars.indexOf(_w) >= 0) {
                // w = w.replace(/[.!?,;]/g, '');   // replace .!? attached to word
                end_phrase = end_chars[end_chars.indexOf(_w)]; //set end phrase' s char
            }

            if(w) {
                //check for "nom propre" starting with uppercase
                if(aspectArr.indexOf(w) >= 0) {
                    return {'word_type':'aspect', 'val': '', 'translated': false, 'pos': index};
                } else if(/^[A-Z]/.test(_w) && index === 0) { //Noum at 0
                    return {'word_type':'noum', 'val': _w, 'translated': false, 'pos': index};
                } else if(parseInt(_w, 10)) { //Number
                    return {'word_type':'number', 'val': w, 'translated': false, 'pos': index};
                }

                //article
                else if(articles_keys.indexOf(w) >= 0) {
                    // .........
                    let nombre = 'singular';
                    if(str.slice(-1) === 'x' || str.slice(-1) === 's')
                        nombre = 'plural';

                    prevType = {nature: 'article', nombre: nombre};
                    return {
                        'word_type':'article',
                        'val': articles_vals[articles_keys.indexOf(w)],
                        'translated': false,
                        'pos': index
                    }
                }

                //prefix for pronominal verb
                else if(prefix_pronominal_keys.indexOf(w) >= 0) {
                    //prevType = {nature: 'pref_pronominal', nombre: nombre, val: w, lastType: prevType};
                    return {
                        'word_type':'pref_pronominal',
                        'val': prefix_pronominal_vals[prefix_pronominal_keys.indexOf(w)],
                        'translated': true,
                        'pos': index
                    }
                }

                //article
                else if(preposition_keys.indexOf(w) >= 0) {
                    prevType = {nature: 'prep', nombre: ''};
                    return {
                        'word_type':'prep',
                        'val': preposition_vals[preposition_keys.indexOf(w)],
                        'translated': true,
                        'attach': getAttachedChar(_w),
                        'pos': index
                    }
                }



                else if(["q'", "que"].indexOf(w) >= 0) {
                    // verb_mod = 'conditionnel';  //// TODO:
                    return {'word_type':'condition', 'val': '', 'translated': false, 'pos': index}
                }

                else if(["n'", "ne"].indexOf(w) >= 0) {
                    phrase_form = 'negative';
                    return {'word_type':'locution', 'val': '', 'translated': false, 'pos': index}
                }

                else if((["pas", "plus", "jamais"].indexOf(w)) >= (0 && phrase_form === 'negative')) {
                    return {'word_type':'negation', 'val': 'té', 'translated': true, 'pos': index};
                }
                //pronom personnel
                else if(pronon_personnel_keys.indexOf(w) >= 0) {
                    if(prevType.nature == 'prep') {
                        let trans = findWord(w);
                        prevType    = {}; //do nothing on prevType (because the pron_per was already translated as word: eg. Avec vous...)
                        return {
                            'word_type': 'word',
                            'translated': true,
                            'val':  trans,
                            'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                            'attach': getAttachedChar(_w),
                            'pos': index
                        }
                    }
                    prevType    = {nature: 'pron_per', nombre: '', val: w};
                    return {
                        'word_type':'pron_per',
                        'translated': true,
                        'val': pronon_personnel_vals[pronon_personnel_keys.indexOf(w)],
                        'pos':index
                    }; //TODO
                }

                //pronom  & adj_demonstratifs
                //inverse ordre after
                else if(demonstratifs_keys.indexOf(w) >= 0) {
                    prevType    = {};
                    return {
                        'word_type':'demonstratif',
                        'translated': true,
                        'val': demonstratifs_vals[demonstratifs_keys.indexOf(w)],
                        'pos':index
                    }; //TODO
                }

                //get verb etre position in array
                else if(verb_etre.indexOf(w) >= 0) {
                    prevType = {nature: 'auxiliare', val: 'etre'};
                    let pos = verb_etre.indexOf(w);
                    auxilVerb['verb'] = 'etre';
                    auxilVerb['pos'] = pos;
                    auxilVerb['val'] = w;
                    return {
                        'word_type':'verb',
                        'val': 'kozala',
                        'translated': true,
                        'mode': getAuxiliareMode('etre', pos, aspect),
                        'pos': index
                    };
                }

                //get verb etre position in array
                else if(verb_avoir.indexOf(w) >= 0) {
                    prevType = {nature: 'auxiliare', val: 'avoir'};
                    let pos = verb_avoir.indexOf(w);
                    auxilVerb['verb'] = 'avoir';
                    auxilVerb['pos'] = pos;
                    auxilVerb['val'] = w;
                    return {
                        'word_type':'verb',
                        'val': 'kozala na',
                        'translated': true,
                        'mode': getAuxiliareMode('avoir', pos, aspect),
                        'pos': index
                    };
                }

                //chec
                else if(['été'].indexOf(w) >= 0) {
                    auxilVerb['verb'] = 'etre';
                    return {'word_type':'pp', 'val': 'kozala', 'translated': true, 'pos': index};
                }

                //chec
                else if(['eu'].indexOf(w) >= 0) {
                    auxilVerb['verb'] = 'avoir';
                    return {'word_type':'pp', 'val': 'kozala na', 'translated': true, 'pos': index};
                }

                //composed word  (e.g: dix-sept)
                // else if(w.split('-')) {
                //     ///TODO
                //     //ends_ajd_ord
                // }

                // Composed verb
                // let firstChar = w.slice(0, 1);
                else if(verbs['pp_keys'].indexOf(w) >= 0) { //position of pp in array
                    prevType    = {};
                    var trans   = findWord(removeAccents(verbs['pp_vals'][verbs['pp_keys'].indexOf(w)]));         //get infinitif
                    composed_verb = true;  //set composed_verb var because paste participe was founded
                    return {
                        'translated': trans ? true : false,
                        'word_type': 'pp',
                        'val': trans.val, //we just need a value
                        'pos': index
                    }
                }
                //find Word
                else if(prevType.nature === 'article' &&
                        typeof findWord(w) === 'object' &&
                        findWord(w).val !== -1) {
                    let trans = findWord(w);
                    prevType  = {}; //reset prevType
                    return {
                        'word_type': 'word',
                        'translated': true,
                        'prefixVerbal': true,   //join prefixVerbal because a word has article
                        'val': (trans !== -1) ? trans : ' ' + _w, //if word not founded then return the french version
                        'attach': getAttachedChar(_w),
                        'pos': index
                    }
                }

                //check if the prevType is an auxiliaire and check the end of the current word
                else if(prevType.nature === 'auxiliare' && /[ééesésites]$/.test(_w)) {
                    let verb = findVerb(w);
                    prevType  = {}; //reset prevType
                    if(verb !== -1) {
                        return {
                            'word_type': 'verb',
                            'translated': true,
                            'val': !!verb ? verb : ' ' + _w, //if word not founded then return the french version
                            'attach': getAttachedChar(_w),
                            'mode': 'ákí',                      // composed_verb mode
                            'pos': index
                        }
                    } else if(findWord(w).val !== -1) {
                        let trans = findWord(w);
                        return {
                            'word_type': 'word',
                            'translated': true,
                            'val':  trans,
                            'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                            'attach': getAttachedChar(_w),
                            'pos': index
                        }
                    } else {

                        return {
                            'word_type': 'word',
                            'translated': false,
                            'val':  w,
                            'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                            'attach': getAttachedChar(_w),
                            'pos': index
                        }
                    }
                }

                //['demain', 'hier', ...] : we need the exact word
                else if(prevType.nature === 'pron_per' &&
                        typeof findWord(w, true) === 'object' &&
                        findWord(w, true).val !== -1) {
                    let trans = findWord(w, true),
                    _prev_trans = findWord(prevType.val);
                    trans.val = _prev_trans.val + ' ' + trans.val; //also return translated of pron_per when not conjuged
                    return {
                        'word_type': 'word',
                        'translated': true,
                        'val':  trans,
                        'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                        'attach': getAttachedChar(_w),
                        'pos': index
                    }
                }

                else if(prevType.nature === 'pref_pronominal' && _guessVerb(w, index, aspect).trans !== -1 ) {
                    let verb = _guessVerb(w, index, aspect);
                    prevType    = prevType.lastType;
                    let attach = ' ' + prefix_pronominal_vals[prefix_pronominal_keys.indexOf(prevType.val)];
                    if(verb.trans !== -1) {
                        let val = verb.trans
                        return {
                            'translated': true,
                            'word_type': 'verb',
                            'mode': verb.mode,
                            'val': val,
                            'attach': attach,
                            'pos': index
                        };
                    } else {
                        return {
                            'translated': true,
                            'word_type': 'verb',
                            'mode': verb.mode,
                            'val': w,
                            'attach': attach,
                            'pos': index
                        };
                    }
                }

                else if(prevType.nature === 'pron_per' && _guessVerb(w, index, aspect).trans !== -1 ) {
                    let verb = _guessVerb(w, index, aspect);
                    if(verb.trans !== -1) {
                        let begining = verb.begining;
                        prevType    = {};
                        return {
                            'translated': true,
                            'word_type': 'verb',
                            'mode': verb.mode,
                            'val': verb.trans,
                            'attach': getAttachedChar(_w),
                            'pos': index
                        };
                    } else {
                        return {
                            'translated': true,
                            'word_type': 'verb',
                            'mode': '',
                            'val': w,
                            'attach': getAttachedChar(_w),
                            'pos': index
                        };
                    }
                }
                //get Verb
                // else if(prevType.nature === 'noum' || prevType.nature === 'pron_per') {
                //     console.log('start conjuge');
                //     let verb = _guessVerb(w, index, aspect),
                //     begining = verb.begining;
                //     prevType  = {}; //reset prevType
                //     return {
                //         'translated': true,
                //         'word_type': 'verb',
                //         'mode': verb.mode,
                //         'val': verb.trans,
                //         'pos': index
                //     };
                // }
                //find Word
                //test by length (juste char; return it)
                else if(w.length == 1) {
                    return {
                        'word_type': 'word',
                        'translated': false,
                        'val':  w,
                        'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                        'attach': getAttachedChar(_w),
                        'pos': index
                    }
                }
                else if(typeof findWord(w) === 'object' && findWord(w).val !== -1) {
                    let trans = findWord(w);

                    if(prevType.nature === 'pron_per') {
                        let _prev_trans = findWord(prevType.val);
                        trans.val = _prev_trans.val + ' ' + trans.val; //also return translated of pron_per when not conjuged
                        return {
                            'word_type': 'word',
                            'translated': true,
                            'val':  trans,
                            'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                            'attach': getAttachedChar(_w),
                            'pos': index
                        }
                    }
                    return {
                        'word_type': 'word',
                        'translated': true,
                        'val': trans,
                        'prefixVerbal': false,        //the word without (article || pronom ...) will not have a prefix verbal
                        'attach': getAttachedChar(_w),
                        'pos': index
                    }
                }
                //peut etre un verbe conjuger
                else {
                    let w_length = w.length;
                    //check for "nom propre" starting with uppercase
                    if(/^[A-Z]/.test(_w) && index !== 0) {
                        return {
                            'val': _w,  // return original word
                            'pos': index,
                            'word_type':'noum',
                            'translated': false,
                            'attach': getAttachedChar(_w),
                        }
                    } else if(_guessVerb(w, index, aspect).trans !== -1) {
                        console.log('ramenaire', w)
                        let verb = _guessVerb(w, index, aspect);
                        if(verb.trans !== -1) {
                            let begining = verb.begining;
                            prevType    = {};
                            return {
                                'translated': true,
                                'word_type': 'verb',
                                'mode': verb.mode,
                                'val': verb.trans,
                                'attach': getAttachedChar(_w),
                                'pos': index
                            };
                        } else {
                            prevType    = {};
                            return {
                                'translated': false,
                                'word_type': 'undefined',
                                'val': _w, // original word
                                'attach': getAttachedChar(_w),
                                'pos': index
                            };
                        }
                    } else {
                        prevType    = {};
                        //TODO !!!!!!!!!!!
                        //TODO participe present detection
                        return {
                            'translated': false,
                            'word_type': 'word',
                            'val': _w, // original word
                            'attach': getAttachedChar(_w),
                            'pos': index
                        };
                    }
                }
            } else {
                prevType    = {nature: undefined};
                return {
                    'translated': false,
                    'word_type': 'undefined',
                    'val': _w, // original word
                    'attach': getAttachedChar(_w),
                    'pos': index
                };
            }
        })

        let prevWord = '',
        prefixVerbal = '',
        demonstratif = '',
        negative_phr_end = '';
        let resolved     = translated_words.reduce(function(_phrase, currWord, idx){
            console.log('currWord', currWord)
            if(currWord === ' ') {
                return _phrase + ' ';
            }
            else if(!!currWord && currWord.word_type === 'negation') {
                negative_phr_end = currWord.val;
                return _phrase + ' ' ;
            }
            else if(!!currWord && currWord.word_type === 'pron_per') {
                prefixVerbal = currWord.val;
                return _phrase;
            }
            else if(!!currWord && currWord.word_type === 'demonstratif') {
                demonstratif = currWord.val;
                return _phrase + ' ';
            }
            else if(!!currWord && currWord.word_type === 'word') {
                let $return,
                word_val = '',
                pure_val = currWord.val;
                prefixVerbal = 'a';
                if(typeof pure_val === 'object') {
                    word_val = pure_val.val;
                    if(typeof word_val === 'string') {
                        if(word_val.startsWith('-a ')) {
                            word_val = (currWord.pos === 0 || currWord.pos === 1) ? word_val.slice(3) : 'ya ' + word_val.slice(3)
                        } else if(word_val.startsWith('-')) {
                            word_val = (currWord.pos === 0 || currWord.pos === 1) ? word_val.slice(1) : 'na ' + word_val.slice(1); //remove "-"
                        }
                    } else {
                        word_val = word_val;
                    }

                    prefixVerbal = pure_val.number === 'singular' ? 'a' : 'ba';
                    prefixVerbal = !!pure_val.things ? 'e' : prefixVerbal;         //make prefixVerbalfor things
                } else {
                    word_val = pure_val;
                }

                //prefixVerbal = currWord.prefixVerbal ? prefixVerbal : '' //apply prefixVerbal after right word
                if(demonstratif !== '') //if demonstratif
                    $return = _phrase + word_val + currWord.attach + ' ' + demonstratif + ' ';
                else
                    $return = _phrase + word_val + currWord.attach + ' ';

                demonstratif = '';
                return $return;
            }

            else if(!!currWord && currWord.word_type === 'undefined') {
                prefixVerbal = 'a';
                let $return;
                if(demonstratif !== '') //if demonstratif
                    $return = _phrase + currWord.val + currWord.attach + ' ' + demonstratif + ' ';
                else
                    $return = _phrase + currWord.val + currWord.attach + ' ';

                demonstratif = '';
                return $return;
            }

            else if(!!currWord && currWord.word_type === 'noum') {
                prefixVerbal = 'a';
                let $return = _phrase + currWord.val + currWord.attach + ' ' + demonstratif + ' ';
                demonstratif = '';
                return $return;
            }

            else if(!!currWord && currWord.word_type === 'pref_pronominal') {
                // prefixVerbal = 'a';
                let $return = _phrase + currWord.val + ' ' + demonstratif + ' ';
                demonstratif = '';
                return $return;
            }

            else if(!!currWord && currWord.word_type === 'prep') {
                let $return = _phrase + currWord.val + currWord.attach + ' ';
                return $return;
            }

            else if(!!currWord && currWord.word_type === 'verb') {
                let fullMode = currWord.mode + ' ' + aspect;
                let verbVal  = currWord.val;
                //ignore the auxiliare when phrase has composed_verb
                if(composed_verb && (verbVal === 'kozala na' || verbVal === 'kozala')) {
                    composed_verb = false;
                    return  _phrase + ' ';
                }

                return _phrase + ' '  + prefixVerbal + _conjuguer('', verbVal, fullMode) + ' ';
            }
            //TODO
            else if(!!currWord && currWord.word_type === 'pp') {
                //if mode not defined then use the default one => 'ákí'
                let fullMode = (currWord.mode ? currWord.mode : 'ákí') + ' ' + aspect;
                let verbVal  = currWord.val;
                //ignore the auxiliare when phrase has composed_verb
                if(composed_verb && (verbVal === 'kozala na' || verbVal === 'kozala')) {
                    composed_verb = false;
                    return  _phrase + ' ';
                }
                return _phrase + ' '  + prefixVerbal + _conjuguer('', verbVal, fullMode) + ' ';
            }

            let __val = (typeof currWord === 'object') ? currWord.val : '';
            return idx == 0 ? __val : _phrase + ' ' + __val + ' ';
        }, '');

        resolved = resolved + negative_phr_end + end_phrase;
        resolved = resolved.slice(0, -1)
                           .allReplace({
                               //http://sites.psu.edu/symbolcodes/ipavowels/
                               //https://stackoverflow.com/questions/44116800/how-to-show-html-entity-using-react
                               'ÔÉ¡': String.fromCharCode(596, 774),  //ɔ̆
                               'Ô¥': String.fromCharCode(603, 769),  //ɜ́
                               'Ê¡': String.fromCharCode(596, 770),  //ɔ̂
                               'É¡': String.fromCharCode(596, 774), //ɔ̆
                               'Ô¡': String.fromCharCode(596, 769),   //ɔ́
                               'Ê¥': String.fromCharCode(603, 770),  //ɛ̂
                               '¥': String.fromCharCode(603),  //ɜ
                               '¡': String.fromCharCode(596),  //ɔ
                               '↵': '\n', //TODO
                               'undefined': ' ',
                               '-1': ' ',
                           })
        console.log('resolved', resolved)
        resolve({
            'phrase' : resolved.slice(0, -1),  //remove the end point
            'uniqueString': uniqueString,
            'order': order
        }); //TODO make first char to uppercase
    });




}

/**
 * [_guessVerb description]
 * @param  {[type]} w     [description]
 * @param  {[type]} index [description]
 * @return {Object}       [{mode, trans}]
 */
function _guessVerb(w, index, aspect){
    //1. verbs_er
    //if word's length less than
    let begining = '';
    if(w.length <= 2) {
        return {
            'mode': '',
            'begining': w,
            'group': null,
            'trans': -1
        }
    }
    let ends = [],
    //may verb end with er
    end_er   = verbs['er'].map(function(end, _index) {
        if(w.slice(-end.length) === end){
            return {
                'end': end,
                'group': 'er',
                'index': _index
            };
        }
        // if (str.match("World$")) {
        //    // do this if ends in world
        // }
    }).sort(function(a, b) {
        return b['end'].length - a['end'].length;
    })[0];

    ends.push(end_er);
    //1. verbs_er
    let end_ir = verbs['ir'].map(function(end, _index) {
        if(w.slice(-end.length) === end){
            return {
                'end': end,
                'group': 'ir',
                'index': _index
            };
        }
        // if (str.match("World$")) {
        //    // do this if ends in world
        // }
    }).sort(function(a, b) {
        return b['end'].length - a['end'].length;
    })[0];
    ends.push(end_ir);
    //1. verbs_er
    let end_oir = verbs['oir'].map(function(end, _index) {
        if(w.slice(-end.length) === end){
            return {
                'end': end,
                'group': 'oir',
                'index': _index
            };
        }
        // if (str.match("World$")) {
        //    // do this if ends in world
        // }
    }).sort(function(a, b) {
        return b['end'].length - a['end'].length;
    })[0];
    ends.push(end_oir);

    //1. verbs_er
    let end_re = verbs['re'].map(function(end, _index) {
        if(w.slice(-end.length) === end){ //compare the word ending with collection of ends
            return {
                'end': end,
                'group': 're',
                'index': _index
            };
        }
        // if (str.match("World$")) {
        //    // do this if ends in world
        // }
    }).sort(function(a, b) {
        return b['end'].length - a['end'].length;
    })[0];
    ends.push(end_re);
    //TODO get longest between the all
    //return Object like {'end': end, 'group': 're', 'index': _index};
    let _end = ends.reduce(function(a, b) {
        if(typeof a === 'object' && typeof b === 'object') {
            return a['end'].length > b['end'].length ? a : b;
        } else {
            return {'end': '', 'group': 'er', 'index': index}
        }
    }); //longest

    if(_end['end'].length <= 0) { //note verb
        /**
         * slice(0 -0) will produce a mistake
         * @type {[type]}
         */
        begining = w; //
    } else {
        begining = w.slice(0, -(_end['end'].length)); //
        if(begining.length <= 2) {
            begining = w.slice(0, 3); // get 3 first char at beginnig
        }
    }
    return {
        'mode': getVerbMode(_end, aspect),
        'begining': begining,
        'group': _end['group'],
        'trans': findVerb(removeAccents(begining))
    }
}

function getVerbMode(end, aspect) {
    let mode    = 'a',
    gr_name     = end['group'],     //e.g: group['er']
    group_arr   = verbs[gr_name],
    end_pos     = group_arr.lastIndexOf(end['end']);

    if('er' === gr_name && end_pos < 12)
        mode = 'ákí';      //passe eloigne
    else if('er' === gr_name && end_pos > 11 && end_pos < 18)
        mode = aspect ? 'áká' : 'á'; //passe anterieur : habituel
    else if('er' === gr_name && end_pos > 17 && end_pos < 24)
        mode = 'aka';      //'present general';
    else if('er' === gr_name && end_pos > 23 && end_pos < 30)
        mode = 'a';         //'present progressif';
    else if('er' === gr_name && end_pos > 29 && end_pos < 36)
        mode = 'a';         //'futur immediat';

    else if('re' === gr_name && end_pos < 72)
        mode = 'ákí';
    else if('re' === gr_name && end_pos > 71 && end_pos < 132)
        mode = aspect ? 'áká' : 'á';
    else if('re' === gr_name && end_pos > 131 && end_pos < 192)
        mode = 'aka';
    else if('re' === gr_name && end_pos > 191 && end_pos < 234)
        mode = 'a';
    else if('re' === gr_name && end_pos > 234)
        mode = 'a';

    else if('ir' === gr_name && end_pos < 12)
        mode = 'ákí';
    else if('ir' === gr_name && end_pos > 11 && end_pos < 18)
        mode = aspect ? 'áká' : 'á';
    else if('ir' === gr_name && end_pos > 17 && end_pos < 24)
        mode = 'aka';
    else if('ir' === gr_name && end_pos > 23 && end_pos < 30)
        mode = 'a';
    else if('ir' === gr_name && end_pos > 29 && end_pos < 36)
        mode = 'a';

    else if('oir' === gr_name && end_pos < 12)
        mode = 'ákí';
    else if('oir' === gr_name && end_pos > 11 && end_pos < 18)
        mode = aspect ? 'ák+á' : 'á';
    else if('oir' === gr_name && end_pos > 17 && end_pos < 24)
        mode = 'aka';
    else if('oir' === gr_name && end_pos > 23 && end_pos < 30)
        mode = 'a';
    else if('oir' === gr_name && end_pos > 29 && end_pos < 36)
        mode = 'a';

    else
        mode = 'a';

    return mode;
}

function getAuxiliareMode(auxi, pos, aspect) {
    let mode    = 'a';
    if('etre' === auxi && pos < 12)
        mode = 'i';         //'present progressif';
    else if('etre' === auxi && pos > 11 && pos < 18)
        mode = 'ákí';      //passe eloigne
    else if('etre' === auxi && pos > 17 && pos < 24)
        mode = 'a';         //'futur immediat';
    else if('etre' === auxi && pos > 23 && pos < 30)
        mode = aspect ? 'áká' : 'á'; //passe anterieur : habituel
    else if('etre' === auxi && pos > 29 && pos < 36)
        mode = 'aka';      //'present general';

    else if('avoir' === auxi && pos < 18)
        mode = 'i';         //'present progressif';
    else if('avoir' === auxi && pos > 17 && pos < 29)
        mode = 'ákí';      //passe eloigne
    else if('avoir' === auxi && pos > 29 && pos < 53)
        mode = aspect ? 'áká' : 'á'; //passe anterieur : habituel
    else if('avoir' === auxi && pos > 53 && pos < 60)
        mode = 'a';         //'futur immediat';

    else
        mode = 'a';

    return mode;
}

/**
 * [_conjuguer description]
 * @param       {[type]} prefix  [prefixVerbal]
 * @param       {[type]} verbVal [description]
 * @param       {[type]} mode    [description]
 * @constructor
 * @return      {[type]}         [description]
 */
function _conjuguer(prefix, verbVal, mode) {
    if(typeof verbVal === 'string') {
        let _arr    = verbVal.split(' ');      // e.g: kozala na => get kozala
        let _val    = _arr[0];
        let radical = _val.slice(2); //remove 'ko' at the start
        let $return = '';
        let builded = (
            prefix +
            radical.slice(0, -1) +  //remove last char before appling conjugaison
            mode
        );
        //build composed verb e.g: "kobwáka o nsé"
        for (var i = 0; i < _arr.length; i++) {
            if(i === 0) {
                $return += builded;
            } else {
                $return += _arr[i];
            }
        }
        return $return;
    } else {
        return verbVal;
    }
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

module.exports = francais_lingala;
