const irregular_pl_keys = ['messieurs', 'yeux', 'barmen', 'bonshommes', 'mesdames', 'mesdemoiselles',
    'aulx', 'cieux', 'vieux'
];
const irregular_pl_values = ['monsieur', 'oeil', 'barman', 'bonhomme', 'madame', 'mademoiselle',
    'ail', 'ciel', 'vieil'
];

const ended_with_au = [
    'agneau', 'aisseau', 'aloyau', 'anneau', 'appeau', 'arbrisseau', 'arc-doubleau', 'arceau', 'arrière-cerveau', 'asseau', 'atriau', 'au', 'baleineau', 'baliveau', 'bandeau', 'barbeau', 'bardeau', 'barreau', 'batardeau', 'bateau', 'bau', 'beau', 'bec-de-corbeau', 'becs-de-corbeau', 'bedeau', 'berceau', 'bécasseau', 'bigarreau', 'bigorneau', 'bihoreau', 'biseau', 'biveau', 'blaireau', 'bobineau', 'boisseau', 'bonneteau', 'boqueteau', 'bordereau', 'boucau', 'bouleau', 'bourreau', 'boyau', 'bureau', 'burgau', 'cadeau', 'canardeau', 'caniveau', 'carneau', 'carpeau', 'carreau', 'casseau', 'caveau', 'câbleau', 'cerceau', 'cerneau', 'cerveau', 'chalumeau', 'chameau', 'chanteau', 'chapeau', 'chapiteau', 'chaudeau', 'chauffe-eau', 'château', 'chemineau', 'chevau', 'chevreau', 'chéneau', 'chrémeau', 'cigogneau', 'ciseau', 'claveau', 'colineau', 'copeau', 'corbeau', 'cordeau', 'costeau', 'coteau', 'couteau', 'coyau', 'créneau', 'cuisseau', 'cuveau', 'daleau', 'damoiseau', 'dindonneau', 'doleau', 'doubleau', 'drapeau', 'eau', 'enfaîteau', 'erseau', 'escabeau', 'esquimau', 'écheveau', 'écriteau', 'éfourceau', 'éléphanteau', 'étau', 'étourneau', 'fabliau', 'faisandeau', 'faisceau', 'faîteau', 'fardeau', 'fauconneau', 'flambeau', 'fléau', 'flûteau', 'flûtiau', 'fontainebleau', 'fourneau', 'fourreau', 'fouteau', 'fricandeau', 'fronteau', 'fuseau', 'gâteau', 'gerseau', 'gerzeau', 'gémeau', 'girafeau', 'godelureau', 'godiveau', 'grau', 'grimpereau', 'gruau', 'grumeau', 'guideau', 'guindeau', 'hachereau', 'hameau', 'haveneau', 'hâtereau', 'hâtiveau', 'héronneau', 'hirondeau', 'hobereau', 'hosteau', 'hottereau', 'houseau', 'hoyau', 'hutteau', 'jambonneau', 'javeau', 'jottereau', 'jouvenceau', 'joyau', 'jumeau', 'karbau', 'kérabau', 'lambeau', 'landau', 'landerneau', 'lanterneau', 'lapereau', 'linteau', 'lionceau', 'liteau', 'loqueteau', 'louveteau', 'manceau', 'mangonneau', 'manteau', 'maquereau', 'marmenteau', 'marteau', 'matériau', 'mâtereau', 'meneau', 'merleau', 'moineau', 'monceau', 'morceau', 'moreau', 'morte-eau', 'mur-rideau', 'museau', 'naseau', 'navire-jumeau', 'niveau', 'nobliau', 'nouveau', 'noyau', 'oiseau', 'organeau', 'oripeau', 'ormeau', 'outardeau', 'ouvreau', 'pageau', 'paisseau', 'panneau', 'panonceau', 'paonneau', 'passereau', 'pastoureau', 'peau', 'perdreau', "pied-d'oiseau", "pied-de-veau", "pieds-d'oiseau", 'pieds-de-veau', 'pigeonneau', 'pinceau', 'pineau', 'pintadeau', 'pipeau', 'plateau', 'plumeau', 'poétereau', 'pointeau', 'poireau', 'pommeau', 'ponceau', 'pontuseau', 'porreau', 'porte-couteau', 'porte-drapeau', 'portemanteau', 'poteau', 'pourceau', 'préau', 'pruneau', 'puceau', 'pureau', 'quadrijumeau', 'radeau', 'rafiau', 'rameau', 'ramereau', 'rampeau', 'ramponeau', 'ramponneau', 'râteau', 'renardeau', 'renouveau', 'restau', 'réseau', 'rideau', 'rinceau', 'rondeau', 'roseau', 'rouleau', 'rousseau', 'ruisseau', 'sarrau', 'saumoneau', 'saute-ruisseau', 'sautereau', 'sceau', 'seau', 'senau', 'serdeau', 'serpenteau', 'simbleau', 'soliveau', 'souriceau', 'sous-arbrisseau', 'sureau', 'tableau', 'tasseau', 'tau', 'taureau', 'terreau', 'tête-de-moineau', 'têteau', 'tombeau', 'tombereau', 'tonneau', 'touchau', 'toucheau', 'tourangeau', 'tourteau', 'tourtereau', 'traîneau', 'tréteau', 'trijumeau', 'troubleau', 'troupeau', 'trousseau', 'trumeau', 'tufeau', 'tuffeau', 'tuileau', 'tuyau', 'tyranneau', 'unau', 'vaisseau', 'vanneau', 'vassiveau', 'vau', 'veau', 'vermisseau', 'verseau', 'vigneau', 'vipéreau', 'vipériau', 'vousseau', 'wagon-tombereau', 'ypréau', 'zigoteau'
]

const irregular_fm_keys = [
    'heroïne', 'niece', 'servante', 'poule', 'princesse', 'déesse', 'louve', 'duchesse', 'ogresse',
    'douce', 'folle', 'molle', 'vieille', 'fraiche'
];
const irregular_fm_values = [
    'heros', 'neveu', 'serviteur', 'coq', 'prince', 'dieu', 'loup', 'duc', 'ogre',
    'doux', 'foux', 'mou', 'vieux', 'frais'
];

export {
	ended_with_au, irregular_pl_keys, irregular_pl_values, irregular_fm_keys, irregular_fm_values
}
