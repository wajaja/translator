//Biblio "wikipedia"

//to detect plural, check the end ['s', 'x']
exports.articles_keys = [
    'le', 'la', 'les', "l'", 'un', 'une', 'des', 'du', 'de la', "de l'",
    'de les', 'au', 'aux', 'de'
];
exports.articles_vals = [
    '',   '',   '',     "",  '',    '',    '',    'o', 'o',     "o",
    '',       'na', 'na', 'ya'
];

exports.preposition_keys = [
    'à', 'après', 'avant', "dans", 'de', 'depuis', 'dès', 'en', 'jusque', "pendant",
    'à côté', 'à droite', 'à gauche', "au-delà", 'à travers', 'chez', "jusqu'à",
    'avec', 'ou', 'où'
];
exports.preposition_vals = [
    'na', 'na sima', 'liboso', "natikati ya", 'ya', 'banda', 'útá', 'na', 'kínó', "ntángo ya",
    'mopanzí ya', 'na liboko ya mobali', 'na liboko ya mwÉasi', "na ngambo ya", 'zíngázingá', 'epái ya', 'kínó', 'na', 'kínó', "ntángo ya",
    'na', 'ata', 'epayi'
];

//
exports.ends_ajd_ord = [
    'premier', 'ière', 'ième', 'dernier'
];

exports.demonstratifs_keys = [
    'ce', 'cette', 'ces', "c'", 'ceci', 'cela', 'ceux-ci', 'ceux-la',
    'mon', 'ton', 'son', 'notre', 'votre', 'leur',
    'ma', 'ta', 'sa', 'notre', 'votre', 'leur',
    'mes', 'tes', 'ses', 'nos', 'vos', 'leurs',
]

exports.demonstratifs_vals = [
    'oyo', 'oyo', 'oyo', "oyo", 'oyo', 'wana', 'oyo', 'wana',
    'ya nga', 'ya yo', 'ya ye', 'ya biso', 'ya bino', 'ya bango',
    'ya nga', 'ya yo', 'ya ye', 'ya biso', 'ya bino', 'ya bango',
    'ya nga', 'ya yo', 'ya ye', 'ya biso', 'ya bino', 'ya bango',

]

exports.ends_verbs = [
    'er', 'ir', 'oir', 're'
]
exports.excepted_verbs = [
    'aller', 'maudire'
]

exports.pronon_personnel_keys = [
    'j', 'je', 'tu', 'il', 'elle', 'lui', 'on', 'nous', 'vous', 'ils', 'elles', 'eux'
]

exports.pronon_personnel_vals = [
    'na', 'na', 'o', 'a', 'a', 'a', 'to', 'to', 'bo', 'ba', 'ba', 'ba'
]

exports.verb_avoir = [
    "ai", 'as', 'a', 'avons', 'avez', 'ont', //indicatif present
    'aie', 'aies', 'ait', 'ayons', 'ayez', 'aient', //Subjonctif Présent
    'aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient', //Conditionnel Présent

    'avais', 'avais', 'avait', 'avions', 'aviez', 'avaient', //Imparfait
    'eus', 'eus', 'eut','eûmes', 'eûtes', 'eurent',   //Passé simple

    'aie eu', 'aies eu', 'ait eu', 'ayons eu', 'ayez eu', 'aient eu', //Subjonctif Passe
    'eusse', 'eusses', 'eût', 'eussions', 'eussiez', 'eussent', //Subjonctif Imparfait
    'aurais eu', 'aurais eu', 'aurait eu', 'aurions eu', 'auriez eu', 'auraient eu', //Conditionnel Passé première forme
    'eusse eu', 'eusses eu', 'eût eu', 'eussions eu', 'eussiez eu', 'eussent eu', //Conditionnel Passé deuxième forme

    'aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront', ///Fur simple
    'aie', 'ayons','ayez', //Impératif Présent
    'aie eu', 'ayons eu', 'ayez eu', //Impératif Passé
    'ayant', //Participe Présent
    'eu', 'eue', 'eus', 'eues', 'ayant eu', //Participe Passé
    'avoir', //Infinitif  present
    'avoir eu', //Infinitif passé
    'en ayant', //Gérondif Présent
    'en ayant eu' //Gérondif Passé
]

exports.verb_etre = [
    "suis", 'es', 'est', 'sommes', 'êtes', 'sont', //indicatif present
    'sois', 'sois', 'soit', 'soyons', 'soyez', 'soient', //Subjonctif Présent
    // ['ai été', 'as été', 'avons été', 'avez été', 'ont été'], //Passé composé
    'étais', 'étais', 'était', 'étions', 'étiez', 'étaient', //Imparfait
    // ['avais été', 'avais été', 'avait été', 'avions été', 'aviez été', 'avaient été'], //Plus--parfait
    'fus', 'fus', 'fut','fûmes', 'fûtes', 'furent',   //Passé simple
    // ['eus été', 'eus été', 'eut été', 'eûmes été', 'eûtes été', 'eurent été'], //Passé antérieur
    'serai', 'seras', 'sera', 'serons', 'serez', 'seront', ///Fur simple
    // ['aurai été', 'auras été', 'aura été', 'aurons été', 'aurez été',  'auront été'], //Fur antérieur
    // ['aie été', 'aies été', 'ait été', 'ayons été', 'ayez été', 'aient été'], //Subjonctif Passe
    'fusse', 'fusses', 'fût', 'fussions', 'fussiez', 'fussent', //Subjonctif Imparfait
    // ['eusse été', 'eusses été', 'eût été', 'eussions été', 'eussiez été', 'eussent été'], //Subjonctif Plus--parfait
    'serais', 'serais', 'serait', 'serions', 'seriez', 'seraient', //Conditionnel Présent
    // ['aurais été', 'aurais été', 'aurait été', 'aurions été', 'auriez été', 'auraient été'], //Conditionnel Passé première forme
    // ['eusse été', 'eusses été', 'eût été', 'eussions été', 'eussiez été', 'eussent été'], //Conditionnel Passé deuxième forme
    'soie', 'soyons','soyez', //Impératif Présent
    // ['aie été', 'ayons été', 'ayez été'], //Impératif Passé
    'étant', //Participe Présent
    // ['été', 'été', 'été', 'été', 'ayant été'], //Participe Passé
    // 'être', //Infinitif  present
    'avoir été', //Infinitif passé
    'en étant', //Gérondif Présent
    'en ayant été' //Gérondif Passé
]
