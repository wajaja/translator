var transFuncs = {};


transFuncs.francais_lingala = require('./francais-lingala').default;
transFuncs.anglais_francais = require('./seq2seq/anglais-francais').default;  //app


/**
 * [endsWithAny description]
 * @param  {[type]} suffixes [description]
 * @param  {[type]} string   [description]
 * @return {[type]}          [description]
 */
// function endsWithAny(suffixes, string) {
//     return suffixes.some(function (suffix) {
//         return string.endsWith(suffix);
//     });
// }
function translatePhraseStr(str, order, uniqueString, source, target) {

    const _func = transFuncs[(source + '_' + target)];

    return (typeof _func === 'function') ? _func(str, order, uniqueString)
                                         : new Promise((resolve, reject) => resolve({
                                             'phrase' : str.slice(0, -1),  //remove the end point
                                             'uniqueString': uniqueString,
                                             'order': order,
                                             'alertMsg': 'translation unavailable'
                                         }));
}


export {
	translatePhraseStr
}
