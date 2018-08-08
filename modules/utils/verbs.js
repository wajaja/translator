//present, imparfait, passe, futur, sub-present, sub-imparfait, cond-present
const verbs_er = 'e es e ons ez ent, ais ais ait ons ez aient, ai as a âmes âtes èrent,'+
              '-ai -as -a -ons -ez -ont, e es e ions iez ent, asse asses at assions assiez assent,'+
              '-ais -ais -ait -ions -iez -aient';

const verbs_re = 's s t ons ez ent - s s t dites ez ent, ais ais ait ons ez aient, is is it mes tes ent - us us ut mes tes ent,'+
            '-ai -as -a -ons -ez -ont, e es e ions iez ent, sse sses t ssions ssiez ssent,'+
            '-ais -ais -ait -ions -iez -aient';

const verbs_ir = 's s t ons ez ent - iens iens ient ons es ent, ais ais ait ons ez aient, is is it mes tes ent,'+
            '-ai -as -a -ons -ez -ont, e es e ions iez ent, sse sses t ssions ssiez ssent,'+
            '-ais -ais -ait -ions -iez -aient';

const verbs_oir = 'ais ais ait ons ez ent - eux eux eut ons ez ent - ois ois oit ons ez ent, ais ais ait ons ez aient, is is it mes tes ent,'+
            '-ai -as -a -ons -ez -ont, e es e ions iez ent, sse sses t ssions ssiez ssent,'+
            '-ais -ais -ait -ions -iez -aient';

const part_p_keys = ['été', 'eu', 'fait', 'dit', 'pu', 'allé', 'vu', 'su', 'voulu', 'venu',
                     'fallu','du', 'chanté', 'ouvert', 'fini', 'pris', 'connu', 'suivi', 'mangé',
                     'tenu', 'offert', 'craint', 'mort', 'tu'];

const part_p_vals = ['être', 'avoir', 'faire', 'dire', 'pouvoir', 'aller', 'voir', 'savoir', 'vouloir',
	                 'venir', 'falloir', 'devoir', 'chanter', 'ouvrir',	'finir', 'prendre',	'connaître',
                     'suivre', 'manger', 'tenir', 'offrir',	'craindre',	'mourir', 'taire'];

//verb not found use french
