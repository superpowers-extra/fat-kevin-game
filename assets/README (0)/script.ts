/*

  "Fat Kevin" / "Le gros Kevin" (aka. MEGA KEVIN LE JEU)
  ====================

  Un jeu où on joue le petit Kevin, un gamin rondelet, à la primaire.
  Les autres élèves se moquent de lui, le tapent, lui tirent des boulettes dessus, etc.
  Kevin a 5 (?) coeurs de santé et en perd lorsque les autres élèves l'attaquent. 

  Dans un agenda de la semaine, Kevin se fixe lui-même pour chaque journée une mission dans laquelle il a de très bonnes intentions :

    1. Lundi - J'étais à l'enterrement de Mamie Rosalie Vendredi dernier. Il faut que j'amène mon mot d'excuse au bureau de la maîtresse
    2. Mardi - Je vais inviter mes trois copains pour mes 7 ans. J'ai fait des jolis cartons d'invitation
    3. Mercredi - J'aimerais offrir quelques fleurs à Magalie
    4. Jeudi - Mon copain Gaétan s'est fait piqué ses cartes MONSTER favorites. Je vais les récupérer et lui ramener.
    5. Vendredi - (Dernière mission) Je suis convoqué au bureau du directeur. Je me demande bien ce qu'il veut.

  Mais pour parvenir à accomplir ces tâches, Kevin devra avoir systématiquement recours à la violence
  parce que les autres gamins ne l'épargneront pas ou ne le laisseront pas passer.
  
  Du coup le jeu prend la forme d'un beat'em up bien bourrin aux apparences mignonnes.

  Mais à la fin de chaque mission, Kevin accomplit sa tâche et le jeu félicite le joueur
  sans faire mention de la violence employée. "10/10 - Quel bon garçon !" etc.


  Style graphique :
  -----------------
  
  Cartoon, low-poly, vue du dessus (caméra légèrement inclinée).
  Inspirations: Costume Quest, Inspector Badass.
  
  Comme dans Inspector Badass, les murs ne montent pas trop haut.
  
  
  Contrôles :
  -----------
  
  Déplacement au stick gauche ou avec les flèches
  X pour taper ou lancer
  C pour intéragir (parler ou prendre/déposer)


  Personnages :
  -------------
  
  La maîtresse de Kevin (gentille)
  Gaétan, Béatrice et Jérémy 
  Magalie dont il est namoureux
  Le gamin pleurnichard qui se pisse dessus
  Le directeur (très strict)
  
  La dame de la cantine ?
  


  Ennemis :
  ---------
  
  Il y a des groupes / gangs. Pour accéder à certains endroits, il faut payer en bonbons
  ou en billes, ou distraire la maîtresse, trouver une clé, etc.
  
  Il y a différents types d'élèves (ils se moquent tous de temps en temps s'ils ne sont pas à portée) :
  
    * Ceux tapent au contact (enlèvant un coeur)
    * Ceux qui tirent avec une sarbacane ou un lance-pierre avec papier-mâché (ils ont une casquette à l'envers ? - Non pas au primaire)
    * Ceux qui bloquent le passage et qui prennent pas mal de coups à térrasser (et ils tapent de temps en temps)
    * Ceux qui lancent des pétards (faut pas rester sinon ça fait des dégâts dans une certaine zone)
    * Ceux avec une crosse de hockey qui attaquent d'un peu plus loin...
    * Ceux qui esquivent en faisant des roulades
    * ... ?

  Quand on les a fini, ils tombent au sol, pleurent et disparaissent en clignotant
  Ils peuvent dropper des billes (monnaie) et certains ont une carte MONSTER à collectionner (il y a X cartes MONSTER dans le jeu)
  Ils peuvent aussi dropper des coeurs ? sous quelle forme ?


  Lieux :
  -------

  Il y a des couloirs, des salles de classe, des bureaux, la cour de récrée, la salle de sieste, la cantine, ...
  
  
  Level design :
  --------------
  
  Pas de génération aléatoire. On designe 5 missions et donc 5 morceaux d'école adaptées à la mission.
  On utilise des maps pour les collisions par case au sol. Et on habille le tout dans des scènes après.
  
  On utilise des personnages pour bloquer certaines portes / passages.
  
  Permettre de choisir la langue (anglais vs français) au lancement.
  
  
  Détails des missions (à travailler) :
  ----------------------

  1. Granny
  J'étais à l'enterrement de Mamie Rosalie hier. Il faut que j'amène mon mot d'excuse au bureau de la maîtresse

  Sur le chemin vers la classe, il faut passer par un couloir où un gamin (Raphael) bloque la porte.
  Intéraction : Il dit qu'il bougera pas tant qu'
  il aura pas eu une brique de jus de pomme et un chewing-gum pour ouvrir le passage.
  
  La brique de jus de pomme peut être volée à la cantine en tabassant un gamin (Fabien) qui mange.
  Le chewing-gum doit être acheté contre des billes chez un gamin (Dealer) qui deal du chewing-gum. Les billes sont récupérées quand on tape les gamins.


  2. Birthday
  Je vais inviter mes deux copains pour mes 7 ans. J'ai fait des jolis cartons d'invitation
  
  Gaétan est relativement accessible, il suffit de le trouver

  Béatrice est la chef du club d'informatique. Ses copains/ines (Cléa) bloquent le chemin (ce sont juste des ennemis normaux skinnés avec des calculatrices ou quelque chose comme ça ?)
  A l'entrée y'a un mec qui pose une question de calcul toute facile.


  3. Flowers
  J'aimerais offrir quelques fleurs à Magalie
  
  Il y a des fleurs qui poussent dans la cour de recré mais dès qu'une apparait, il y a 2-3 gamins qui courent et les piétinnent.
  Du coup faut d'abord les tabasser pour pouvoir en chopper. Mais ils sont juste étourdis quelques secondes et ils se relèvent
  
  Il faut 5 fleurs puis ensuite on peut aller voir Magalie (à la marelle ?).
  
  
  4. Monster
  Mon copain Gaétan s'est fait piquer sa carte MONSTER favorite. Je vais les récupérer et lui ramener.
  
  Kevin est en heures de colle avec son copain Gaétan et le gamin-pleurnichard-qui-se-pisse-dessus.
  (On sait qui c'est parce que quand on intéragit avec lui, Kevin explique)
  (Quand on intéragit avec Gaétan, il dit que tu serais vraiment un super pote si tu lui ramènes sa carte, c'est Jérémy, le )
  (Quand on intéragit avec la maîtresse, elle dit que tu n'as pas le droit de sortir avant que ça sonne)
  
  Il faut faire pleurer le gamin-pleurnichard-qui-se-pisse-dessus pour qu'il aille voir la maîtresse, ce qui permettra alors à Kevin de sortir.
  Pour se faire, il faut récupérer l'arrosoir et lui verser de l'eau dessus.
  
  Kevin va tabasser Jérémy. Quand Jérémy s'est fait déchirer la gueule, il révèle que la carte a été confisquée par le directeur.
  
  
  5. End
  (Dernière mission) Je dois récupérer la carte MONSTER de Gaétan dans le bureau du directeur
  
  La pièce arrière du bureau du directeur est fermée à clé. La clé se trouve dans l'accueil de l'école.
  On retrouve la carte MONSTER et après on sort et là le directeur nous gronde et Kevin finit clochard.
  "Hello darkness my old friend..." 8-bit

*/
