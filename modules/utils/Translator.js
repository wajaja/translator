const io            = require('socket.io-client');
import axios                from 'axios'

import { Input, Output }    from 'components'
import { BASE_PATH }        from 'config/api'

const socket = io.connect(BASE_PATH);
// import print from './printer';

export default class Translator {
    constructor() {
        this._cache = [];
        this._cached = {};
    }

    translate(words) {
        //pronon personnel

        let ast        = parse(message);
        let translated = this.transform(ast);
        return print(translated);
    }

    translatePhrase(phrase, order, uniqueString, source_lang, target_lang) {
        // const is_cached = this.checkIncache(phrase);
        const data = {
            'order': order,
            'phrase' : phrase,
            'source_lang': source_lang,
            'target_lang': target_lang,
            'uniqueString': uniqueString
        };
        socket.emit('translate_phrase', data);
        return axios.post(BASE_PATH + '/api/translate', data)
        //Emit tranlate event to server throught socket.io
        // this._cache.push(phrase);
    }

    translatePhraseSync(phrase, order, uniqueString) {
        //Emit tranlate event to server throught socket.io
        socket.emit('translate_phrase', {'phrase' : phrase, 'order': order, 'uniqueString': uniqueString });
    }

    /**
     * [getCached description]
     * @param  {[string]}   [phrase to translate]
     * @return {[String]}   [an string representing translated phrase]
     */
    getCached(phrase) {
        return this._cached[phrase[0]];
    }

    checkIncache(phrase) {
        return this._cache.filter(function(c, i) {
            return c[0] === phrase[0];
        }).length;
        // console.log(arr);
        // return false;
    }

    transform(ast) {
        ast.elements.forEach((el) => {
            if (el.type === 'messageTextElement') {
                // el.value = this.translateText(el.value);
            } else {
                let options = el.format && el.format.options;
                if (options) {
                    options.forEach((option) => this.transform(option.value));
                }
            }
        });

        return ast;
    }
}
