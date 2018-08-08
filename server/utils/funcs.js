//https://stackoverflow.com/questions/25188325/split-paragraph-into-sentences-when-paragraph-ends-with-quotes-using-javascript
//return [[0, 1, index], [0, 1, index], [0, 1, index], ...]
exports.splitIntoSentences =  function splitIntoSentences(str) {
    /**
    * /(\w[^.!?]+[.!?]+"?)\s?/g
    * 1st Capturing Group (\w[^.!?]+[.!?]+"?)
    * \w matches any word character (equal to [a-zA-Z0-9_])
    * Match a single character not present in the list below [^.!?]+
    * + Quantifier — Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
    * .!? matches a single character in the list .!? (case sensitive)
    * Match a single character present in the list below [.!?]+
    * + Quantifier — Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
    * * .!? matches a single character in the list .!? (case sensitive)
    * "? matches the character " literally (case sensitive)
    * ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
    * \s? matches any whitespace character (equal to [\r\n\t\f\v ])
    * ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
    * Global pattern flags
    * g modifier: global. All matches (don't return after first match)
    **/

    var re =  /(\w[^.!?]+[.!?]+"?)\s?/g;
    var m, s=[];

    while ((m = re.exec(str)) != null) {
        s.push(m);
    }
    return s;
}

exports.getSentenceRanges = function getSentenceRanges(str) {
    var re =  /(\w[^.!?]+[.!?]+"?)\s?/g;
    var m, s=[];

    while ((m = re.exec(str)) != null) {
        s.push(m.index);
    }
    return s;
}

exports.getEditedSentence = function getEditedSentence(str, cursorPos) {
    var re =  /(\w[^.!?]+[.!?]+"?)\s?/g;
    var m, s=[], phrase, order;

    while ((m = re.exec(str)) != null) {
            s.push(m);
    }

    var d = s.filter(function(v, i) {
    	return v.index < cursorPos;
    })
    order = d.length - 1;
    phrase = d[order];
    phrase['order'] = order;
    return phrase;
}

//https://stackoverflow.com/questions/25188325/split-paragraph-into-sentences-when-paragraph-ends-with-quotes-using-javascript
exports.getLastSentence = function getLastSentence(str) {
    var re =  /(\w[^.!?]+[.!?]+"?)\s?/g;
    var m, s=[], phrase, order;

    while ((m = re.exec(str)) != null) {
        s.push(m);
    }


    return s[(s.length - 1)];
}

exports.splitIntoWords = function splitIntoWords(str) {
    return str.split(/\s+/);
}

exports.checkSingleQuote = function checkSingleQuote(str) {
    return str.split("'");
}

/**
* https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/37511463
*
* normalize()ing to NFD Unicode normal form decomposes combined graphemes
* into the combination of simple ones. The è of Crème ends up expressed as e + ̀.
*
* Using a regex character class to match the U+0300 → U+036F range,
* it is now trivial to globally get rid of the diacritics,
* which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
*/
exports.normalize = function normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

/**
* https://gist.github.com/alisterlf/3490957
*/
exports.removeAccents = function removeAccents(string) {
    const accents =
        "ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź";
    const accentsOut =
        "AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz";
    return typeof string === 'string' ?
        string.split("")
        .map((letter, index) => {
            const accentIndex = accents.indexOf(letter);
            return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
        })
        .join("") : "";
}

// "lÉ²-mÉ²"
// "mw-mi"
// "e-mi" //milímo
