var fs              = require('fs');
var jsonfile        = require('jsonfile');
var { filewalker }  = require('./server/filewalker');
var { binarySearch } = require('./server/binarySearch');
var { removeAccents } = require('./server/utils/funcs');
var {
    irregular_pl_keys, irregular_pl_values, ended_with_au,
    irregular_fm_keys, irregular_fm_values
}                   = require('./server/utils/accords');

/**
 * [dictionnary     A big object where all the words will be placed]
 * @type {Object}
 */
var dictionnary = {};
var things_word = false;

//see at ./server/filewalker.js
filewalker("./data", function(err, data){
    if(err){
        throw err;
    }
    var i = 0; //

    //new language manner:: part of generator
    // var newlyCreatedObj = {};

    // data = ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]

    // loop function
    // https://stackoverflow.com/questions/45994413/how-to-write-callback-function-inside-for-loop-in-node-js
    function next() {
        const url = data[i++];
        if (!url) {
            /**
             * Part of generator
             * @type {[type]}
             */
            // var newlyCreatedStr = JSON.stringify(newlyCreatedObj, null, 4);
            // fs.writeFile('lingala.json', newlyCreatedStr, 'utf8', function(err, data){
            //     if(err) {
            //         console.log('37 err', );
            //     } else {
            //         console.log('not error');
            //     }
            // });
            return; //callback(null, sum);
        }
        var arr  = url.split('/');
        var file = url.replace(/\\/g, "/");
         //arr[arr.length - 1];  //c://some-existent-path/file
        var key  = file.split('/')[file.split('/').length - 1].split('.')[0]; //file.split('/')[3];                //[ 'c:', 'translator', 'data', 'a' ]
        return fs.readFile(url, function(err, data) {
            if(err) {
                //console.log(err);
            };
            let raw = data.toString();
            raw = raw.replace(/\\n/g, "\\n")
                     .replace(/\\'/g, "\\'")
                     .replace(/\\"/g, '\\"')
                     .replace(/\\&/g, "\\&")
                     .replace(/\\r/g, "\\r")
                     .replace(/\\t/g, "\\t")
                     .replace(/\\b/g, "\\b")
                     .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            raw = raw.replace(/[\u0000-\u0019]+/g,"");
            var obj = JSON.parse(raw);
            dictionnary[key] = obj;
            console.log('key......', key);

            /**
             * Generator
             * create file
             */
            // var francais_keys = Object.keys(obj);
            // Object.values(obj).forEach(function(val, order) {
            //     var lingalaArr = val['lingala'];
            //     lingalaArr.forEach(function(lingalaObj, i){
            //         for(var i in lingalaObj) {
            //             if(!!newlyCreatedObj[i]){
            //                 var _francais = newlyCreatedObj[i]['francais'];
            //                 newlyCreatedObj[i]["francais"] = _francais + '__' + francais_keys[order]; //concat target language
            //             } else {
            //                 newlyCreatedObj[i] = {
            //                     //push target language
            //                     "francais": francais_keys[order]
            //                 }
            //                 // console.log('81', 'first live here', newlyCreatedObj[i]);
            //             }
            //         }
            //     })
            // })



            // console.log(JSON.stringify(obj, null, 4));
            next(); //operate with next file
        })
    }
    next(); // starts iterating
});

exports.findWord = function findWord(str, strict) {
    var firstChar   = removeAccents(str.charAt(0));
    var jsonObject  = dictionnary[firstChar] || {};
    var keys        = Object.keys(jsonObject);
    var wordPos     = binarySearch(keys, str, true);

    if(strict) {    //find exact word
        if(wordPos >= 0 && removeAccents(keys[wordPos].split(' ')[0]).toLowerCase() === removeAccents(str).toLowerCase()) {
            return {
                things: things_word,
                'number': 'singular',
                'val': get_it_in_Lingala(jsonObject, wordPos, 'singular')
            }
        } else {
            return -1;
        }
    }

    else {

        if(wordPos >= 0) {
            return {
                things: things_word,
                'number': 'singular',
                'val': get_it_in_Lingala(jsonObject, wordPos, 'singular')
            }
        } else {
            //maybe a plural form of...
            //['aux', 'als'] => ['al', 'al']
            if(irregular_pl_keys.indexOf(str) >= 0) {
                let singular = irregular_pl_values[irregular_pl_keys.indexOf(str)];
                wordPos     = binarySearch(keys, singular, true);
                if(wordPos >= 0) {
                    return {
                        'number': 'plural',
                        'things': things_word,
                        'val': get_it_in_Lingala(jsonObject, wordPos, 'plural')
                    }
                } else {
                    return 'not exist in dic';
                }
            }
            //
            else if (guess_sing_from_plu(str) !== -1) {
                let singular = guess_sing_from_plu(str)
                wordPos     = binarySearch(keys, singular, true);

                if(wordPos >= 0) {
                    return {
                        'number': 'plural',
                        'things': things_word,
                        'val': get_it_in_Lingala(jsonObject, wordPos, 'plural') //masculin pluriel
                    }
                }
                else if(guess_male_from_female(singular) !== -1) { //feminin-pluriel
                    let male = guess_male_from_female(singular);
                    wordPos     = binarySearch(keys, male, true);
                    if(wordPos >= 0) {
                        // get_it_in_Lingala(jsonObject, wordPos, 'female');
                        return {
                            'number': 'plural',
                            'things': things_word,
                            'val': get_it_in_Lingala(jsonObject, wordPos, 'plural') + ' ya basí'
                        }
                    }
                } else {
                    return {
                        'number': 'singular',
                        'things': things_word,
                        'val': get_it_in_Lingala(jsonObject, singular, 'female') //feminin pluriel
                    }
                }
            }
            else if(guess_male_from_female(str) !== -1) { //feminin-singulier
                let male = guess_male_from_female(str);
                wordPos     = binarySearch(keys, male, true);
                if(wordPos >=0) {
                    return {
                        'number': 'singular',
                        'things': things_word,
                        'val': get_it_in_Lingala(jsonObject, wordPos, 'female')
                    }
                } else if(male.slice(-3) === 'eur'){ // for the word like heureux who its female is heureuse
                    let _male = male.slice(0, -3) + 'eux';
                    wordPos    = binarySearch(keys, _male, true);
                    return {
                        'number': 'singular',
                        'things': things_word,
                        'val': get_it_in_Lingala(jsonObject, wordPos, 'female')
                    }
                }
            } else {
                return -1;
            }
        }
    }
}

exports.findVerb = function findVerb(str) {
    var firstChar   = str.charAt(0);
    var jsonObject  = dictionnary[firstChar];
    var keys        = Object.keys(jsonObject);
    var wordPos     = binarySearch(keys, str, false);
    let verbs_arr   = [];

    if(wordPos !== -1) {
        let _wordPos_toBig = wordPos,
        _wordPos_toSmall = wordPos;

        /**increment
        *commented because all words have't nature defined
        * loop throught object keys to find a word with " v." defined
        */
        while (removeAccents(keys[(_wordPos_toBig+1)]).startsWith(removeAccents(str))) {
            _wordPos_toBig++;
            if(keys[_wordPos_toBig].indexOf(' v.') >= 0){
                verbs_arr.push({order: _wordPos_toBig, val: keys[_wordPos_toBig]});
            }
        }

        /**decrement
        *commented because all words have't nature defined
        * loop throught object keys to find a word with " v." defined
        */
        while (removeAccents(keys[(_wordPos_toSmall-1)]).startsWith(removeAccents(str))) {
            _wordPos_toSmall--;
            if(keys[_wordPos_toSmall].indexOf(' v.') >= 0){
                verbs_arr.push({"order": _wordPos_toSmall, "val": keys[_wordPos_toSmall]});
            }
        }

        var min_obj = verbs_arr.filter(e => typeof e === 'object').sort((a, b) => a.val.length - b.val.length)[0];
        //if there is not object from array then use the first one wordPos
        let _pos = typeof min_obj === 'object' ? min_obj["order"] : wordPos;

        return get_it_in_Lingala(jsonObject, _pos, 'singular');
    } else {
        return -1
    }
}

function guess_sing_from_plu(str) {
    if(str.slice(-3) === 'aux') {
        if(ended_with_au.indexOf(str))
            return str.slice(0, -1);  //return string ended by 'au'
        else
            return str.slice(0, -2) + 'l';  //return wordPos ended by 'al'
    }
    else if(str.slice(-1) === 'x' || str.slice(-1) === 's') {
        return str.slice(0, -1);
    }
    else {
        return -1;
    }
}

function guess_male_from_female(str) {
    if(irregular_fm_keys.indexOf(str) >= 0) {
        return irregular_fm_values[irregular_fm_keys.indexOf(str)];
    }
    else if(str.slice(-4) === 'rice' || str.slice(-4) === 'euse') {
        return str.slice(0, -4) + 'eur';  // chanteuse => chanteur
    }
    else if(str.slice(-3) === 'ere') {
        return str.slice(0, -1); //bergere => berger
    } else if(str.slice(-2) === 've') {
        return str.slice(0, -2) + 'f';  //return wordPos ended by 'al'
    }
    else if(str.slice(-1) === 'e') {
        let end = str.slice(-1),
        end_arr = str.slice(-3).split('');
        if(end_arr[0] === end_arr[1])
            return str.slice(0, -2); //chatte => chat
        else if(end === 'e') //marchand => marchande
            return  str.slice(0, -1);
        else
            return -1;
    }
    else {
        return -1;
    }
}

function get_it_in_Lingala(jsonObject, index, accord /*,context*/){
    // accord => ['female', 'plural']
    let _cls, _ling, _wordStr, _words, _word, _cls_arr, _cls_key,
    jsonArr      = Object.values(jsonObject), //TODO !important
    o            = jsonArr[index];
    if(o) {
        _ling    = o['lingala'][0];         //first object
        _wordStr = Object.keys(_ling)[0];   //first keys in arr
        _words   = _wordStr.split(',');     //get all signification in lingala
        _word    = _words[(Math.floor(Math.random() * _words.length))].split('/')[0]; //get just one writted word way
        _cls_key = o['cls'];        //get array of string classes on word object of dic =>  ["Mo-ba-"]

        //human class group
        if(_cls_key !== undefined) {
            _cls     = _cls_key[0];         //get first string in array => "Mo-ba-"
            _cls_arr = _cls.split('-');     // ["Mo", "ba"]
            things_word = (_cls_arr[0] === "Mo" || _cls_arr[0] === "Ø") ? false : true
        }

        //TODO get Context
        if(accord === 'plural') {
            //"cls" exist
            if(_cls_key !== undefined) {
                if(_word.startsWith(_cls_arr[0].toLowerCase()))
                    _word    = _cls_arr[1].toLowerCase() + _word.slice(_cls_arr[0].length); //delete char at start of _word
                else
                    _word    = _cls_arr[1].toLowerCase() + ' ' + _word; //delete char at start of _word
            } else {
                _word    = '__' + _word; //if no cls
            }

        } else if(accord === 'female') {
            //TODO accord
            _word    = _word + '' /*' ya mwÉasí'*/;
        } else {
            return _word;
        }
        return _word;
    }
    return -1;
}

/**
 * [writeInFile description]
 * appending to an existing JSON file:
 * You can use fs.writeFile option {flag: 'a'} to achieve this.
 * @return {[type]} [description]
 */
function writeInFile() {
    var file = '/tmp/mayAlreadyExistedData.json'
    var obj = {name: 'JP'}
    jsonfile.writeFile(file, obj, {flag: 'a'}, function (err) {
      console.error(err)
    })
}
