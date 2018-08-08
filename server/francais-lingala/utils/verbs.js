//present, imparfait, passe, futur, sub-present, sub-imparfait, cond-present
const verbs = {
    "er" : [
        'ais', 'ais', 'ait', 'ions', 'iez', 'aient',        //passé eloigné
        'asses', 'at', 'assions', 'assiez', 'assent',       //passé eloigné (Subjonctif)
        'ai', 'as', 'a', 'âmes', 'âtes', 'èrent',           //passé antérieur
        //"passé composé de l'auxiliaire + part.passé"      //passé recent
        'e', 'es', 'e', 'ons', 'ez', 'ent',                 //present general
        'e', 'es', 'e', 'ions', 'iez', 'ent',       //present progressif
        'ai', 'as', 'a', 'ons', 'ez', 'ont',          //futur immediat
        //===futur anterier + part.passé                    //futur eloigné
        '-ais', '-ais', '-ait', '-ions', '-iez', '-aient'
    ],
    "re" : [
        'ais', 'ais', 'ait', 'ions', 'iez', 'aient',        //passé eloigné
        'vais', 'vais', 'vait', 'vions', 'viez', 'vaient',  //passé eloigné
        'lais', 'lais', 'lait', 'lions', 'liez', 'laient',  //passé eloigné
        'sais', 'sais', 'sait', 'sions', 'siez', 'saient',
        'yais', 'yais', 'yait', 'yons', 'yez', 'yaient',
        'lvais', 'lvais', 'lvait', 'lvions', 'lviez', 'lvaient',
        'uvais', 'uvais', 'uvait', 'uvions', 'uviez', 'uvaient',
        'ssais', 'ssais', 'ait', 'ons', 'ez', 'aient',
        'aisais', 'aisais', 'aisait', 'aisions', 'aisiez', 'aisaient',
        'aissais', 'aissais', 'aissait', 'aissions', 'aissiez', 'aissaient',
        'oissais', 'oissais', 'oissait', 'oissions', 'oissiez', 'oissaient',    //passé eloigné
        'raissais', 'raissais', 'raissait', 'raissions', 'raissiez', 'raissaient',

        'is', 'is', 'it', 'mes', 'tes', 'ent',                              //passé antérieur
        'is', 'is', 'it', 'imes', 'ites', 'irent',
        'vis', 'vis', 'vit', 'vimes', 'vites', 'virent',
        'sis', 'sis', 'sit', 'simes', 'sites', 'sirent',
        'aquis', 'aquis', 'aquit', 'aquimes', 'aquites', 'aquirent',
        'us', 'us', 'ut', 'mes', 'tes', 'ent',
        'us', 'us', 'ut', 'umes', 'utes', 'urent',
        'ecus', 'ecus', 'ecut', 'ecumes', 'ecutes', 'ecurent',
        'sis', 'sis', 'sit', 'sîmes', 'sîtes', 'sirent',
        'lus', 'lus', 'lut', 'lûmes', 'lûtes', 'lurent',

        's', 's', 't', 'ons', 'ez', 'ent',                  //present general
        's', 's', 't', 'ons', 'ez', 'ent',
        's', 's', 't', 'lvons', 'lvez', 'lvent',
        's', 's', 't', 'isons', 'ites', 'isent',
        '-ai', '-as', '-a', '-ons', '-ez', '-ont',
        'irai', 'iras', 'ira', 'irons', 'irez', 'iront',
        'vrai', 'vras', 'vra', 'vrons', 'vrez', 'vront',
        'aitrai', 'aitras', 'aitra', 'aitrons', 'aitrez', 'aitront',
        'udrai', 'udras', 'udra', 'udrons', 'udrez', 'udront',
        'e', 'es', 'e', 'ions', 'iez', 'ent',

        'sse', 'sses', 't', 'ssions', 'ssiez', 'ssent',                         //present progressif
        'isse', 'isses', 'it', 'issions', 'issiez', 'issent',
        'usse', 'usses', 'ut', 'ussions', 'ussiez', 'ussent',
        'asse', 'asses', 'asse', 'assions', 'assiez', 'assent',
        'visse', 'visses', 'vit', 'vissions', 'vissiez', 'vissent',
        'ecusse', 'ecusses', 'ecut', 'ecussions', 'ecussiez', 'ecussent',
        'aquisse', 'aquisse', 'aquit', 'aquissions', 'aquissiez', 'aquissent',

        '-ais', '-ais', '-ait', '-ions', '-iez', '-aient',                  //futur immediat
        'vrais', 'vrais', 'vrait', 'vrions', 'vriez', 'vraient'
    ],

    "ir" : [
        'ais', 'ais', 'ait', 'ions', 'iez', 'aient',
        'is', 'is', 'it', 'mes', 'tes', 'ent',
        'sse', 'sses', 't', 'ssions', 'ssiez', 'ssent',

        's', 's', 't', 'ons', 'ez', 'ent',
        'iens', 'iens', 'ient', 'ons', 'es', 'ent',
        'e', 'es', 'e', 'ions', 'iez', 'ent',

        '-ai', '-as', '-a', '-ons', '-ez', '-ont',
        '-ais', '-ais', '-ait', '-ions', '-iez', '-aient'
    ],

    "oir" : [
        'ais', 'ais', 'ait', 'ions', 'iez', 'aient',
        'is', 'is', 'it', 'mes', 'tes', 'ent',
        'sse', 'sses', 't', 'ssions', 'ssiez', 'ssent',

        'ais', 'ais', 'ait', 'ons', 'ez', 'ent',
        'eux', 'eux', 'eut', 'ons', 'ez', 'ent',
        'ois', 'ois', 'oit', 'ons', 'ez', 'ent',

        'e', 'es', 'e', 'ions', 'iez', 'ent',
        '-ai', '-as', '-a', '-ons', '-ez', '-ont',
        '-ais', '-ais', '-ait', '-ions', '-iez', '-aient'
    ],

    "pp_keys" : [
        'été', 'eu', 'fait', 'dit', 'pu', 'allé', 'vu', 'su', 'voulu', 'venu',
        'fallu','du', 'chanté', 'ouvert', 'fini', 'pris', 'connu', 'suivi', 'mangé',
        'tenu', 'offert', 'craint', 'mort', 'tu', 'lu', 'maudit', 'cru', 'ecrit', 'suffi', 'conclu',
        'bu', 'soustrait', 'clos', 'abbattu', 'acquis'
    ],

    "pp_vals" : [
        'être', 'avoir', 'faire', 'dire', 'pouvoir', 'aller', 'voir', 'savoir', 'vouloir',
        'venir', 'falloir', 'devoir', 'chanter', 'ouvrir',	'finir', 'prendre',	'connaître',
        'suivre', 'manger', 'tenir', 'offrir',	'craindre',	'mourir', 'taire', 'lire', 'maudire',
        'croire', 'ecrire', 'suffire', 'conclure', 'boire', 'soustraire', 'clore', 'abbatre'
    ],

    "irregular": [
        'abats', 'abattu', 'abattis', 'abattra', 'abattri'
    ]
};

//verb not found use french
exports.verbs = verbs
