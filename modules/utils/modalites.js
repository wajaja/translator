//Biblio "wikipedia"

//to detect plural, check the end ['s', 'x']
export articles = [
    'le', 'la', 'les', 'l', 'un', 'une', 'des', 'du', 'de la', 'de l',
    'de les', 'au', 'aux'
];
//
export ends_ajd_ord = [
    'premier', 'ière', 'ième', 'dernier'
];

export adj_demonstratifs = [
    'ce', 'cette', 'ces', 'c', '-ci', '-là', ' voà'
]

export ends_verbs = [
    'er', 'ir', 'oir', 're'
]
export excepted_verbs = [
    'aller', 'maudire'
]

export pronon_personnel = [
    'j', 'je', 'tu', 'il', 'elle', 'lui', 'on', 'nous', 'vous', 'ils', 'elles', 'eux'
]

export verb_avoir = [
    ["ai", 'as', 'a', 'avons', 'avez', 'ont'], //indicatif present
    ['ai eu', 'as eu', 'avons eu', 'avez eu', 'ont eu'], //Passé composé
    ['avais', 'avais', 'avait', 'avions', 'aviez', 'avaient'] //Imparfait
    ['avais eu', 'avais eu', 'avait eu', 'avions eu', 'aviez eu', 'avaient eu'], //Plus--parfait
    ['eus', 'eus', 'eut','eûmes', 'eûtes', 'eurent'],   //Passé simple
    ['eus eu', 'eus eu', 'eut eu', 'eûmes eu', 'eûtes eu', 'eurent eu'], //Passé antérieur
    ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'], ///Fur simple
    ['aurai eu', 'auras eu', 'aura eu', 'aurons eu', 'aurez eu',  'auront eu'], //Fur antérieur
    ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'], //Subjonctif Présent
    ['aie eu', 'aies eu', 'ait eu', 'ayons eu', 'ayez eu', 'aient eu'], //Subjonctif Passe
    ['eusse', 'eusses', 'eût', 'eussions', 'eussiez', 'eussent'], //Subjonctif Imparfait
    ['eusse eu', 'eusses eu', 'eût eu', 'eussions eu', 'eussiez eu', 'eussent eu'], //Subjonctif Plus--parfait
    ['aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient'], //Conditionnel Présent
    ['aurais eu', 'aurais eu', 'aurait eu', 'aurions eu', 'auriez eu', 'auraient eu'], //Conditionnel Passé première forme
    ['eusse eu', 'eusses eu', 'eût eu', 'eussions eu', 'eussiez eu', 'eussent eu'], //Conditionnel Passé deuxième forme
    ['aie', 'ayons','ayez'], //Impératif Présent
    ['aie eu', 'ayons eu', 'ayez eu'], //Impératif Passé
    ['ayant'], //Participe Présent
    ['eu', 'eue', 'eus', 'eues', 'ayant eu'], //Participe Passé
    ['avoir'], //Infinitif  present
    ['avoir eu'], //Infinitif passé
    ['en ayant'], //Gérondif Présent
    ['en ayant eu'] //Gérondif Passé
]

export verb_etre = [
    ["suis", 'es', 'est', 'sommes', 'êtes', 'sont'], //indicatif present
    ['ai été', 'as été', 'avons été', 'avez été', 'ont été'], //Passé composé
    ['étais', 'étais', 'était', 'étions', 'étiez', 'étaient'] //Imparfait
    ['avais été', 'avais été', 'avait été', 'avions été', 'aviez été', 'avaient été'], //Plus--parfait
    ['fus', 'fus', 'fut','fûmes', 'fûtes', 'furent'],   //Passé simple
    ['eus été', 'eus été', 'eut été', 'eûmes été', 'eûtes été', 'eurent été'], //Passé antérieur
    ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'], ///Fur simple
    ['aurai été', 'auras été', 'aura été', 'aurons été', 'aurez été',  'auront été'], //Fur antérieur
    ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'], //Subjonctif Présent
    ['aie été', 'aies été', 'ait été', 'ayons été', 'ayez été', 'aient été'], //Subjonctif Passe
    ['fusse', 'fusses', 'fût', 'fussions', 'fussiez', 'fussent'], //Subjonctif Imparfait
    ['eusse été', 'eusses été', 'eût été', 'eussions été', 'eussiez été', 'eussent été'], //Subjonctif Plus--parfait
    ['serais', 'serais', 'serait', 'serions', 'seriez', 'seraient'], //Conditionnel Présent
    ['aurais été', 'aurais été', 'aurait été', 'aurions été', 'auriez été', 'auraient été'], //Conditionnel Passé première forme
    ['eusse été', 'eusses été', 'eût été', 'eussions été', 'eussiez été', 'eussent été'], //Conditionnel Passé deuxième forme
    ['soie', 'soyons','soyez'], //Impératif Présent
    ['aie été', 'ayons été', 'ayez été'], //Impératif Passé
    ['étant'], //Participe Présent
    ['été', 'été', 'été', 'été', 'ayant été'], //Participe Passé
    //['être'], //Infinitif  present
    ['avoir été'], //Infinitif passé
    ['en étant'], //Gérondif Présent
    ['en ayant été'] //Gérondif Passé
]
