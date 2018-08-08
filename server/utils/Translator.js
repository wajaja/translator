import {parse} from 'intl-messageformat-parser';
const io = require('socket.io-client');
import { Input, Output } from 'components'
const socket = io.connect('http://:3000');
// import print from './printer';

export default class Translator {
    constructor(translateText) {
        this.translateText = translateText;
        this._cache = [];
    }

    translate(words) {
        //pronon personnel

        let ast        = parse(message);
        let translated = this.transform(ast);
        return print(translated);
    }

    translatePhrase(phrase) {
        const is_cached = this.checkIncache(phrase);
        return new Promise((resolve, reject) => {
            if(is_cached) {
                 resolve(this.getCached(phrase));
            } else {
                //Emit tranlate event to server throught socket.io
                socket.emit('translate_phrase', {'phrase' : phrase });
                this._cache.push(phrase);
            }
        })
    }

    transform(ast) {
        ast.elements.forEach((el) => {
            if (el.type === 'messageTextElement') {
                el.value = this.translateText(el.value);
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
