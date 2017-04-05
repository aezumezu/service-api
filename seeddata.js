require('dotenv').config({ silent: true });
const mongoose = require('mongoose');
const Logger = require('./tracer');

mongoose.connect(process.env.MONGODB_URI);
const conn = mongoose.connection;
const models = require('./models');

const books = [
  {
    title: 'Fifty Shades of Grey',
    author: 'E. L. James',
    ratings: [4.3],
    datePublished: new Date('April 3, 2012'),
    imageUrl: '50shadesgrey.jpg',
    description: 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms. Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates.<p>For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.<p>This book is intended for mature audiences.'
  },
  {
    title: 'The Hunger Games (Book 1)',
    author: 'Suzanne Collins',
    ratings: [4.1],
    datePublished: new Date('July 3, 2010'),
    imageUrl: 'hunger_games1.jpg',
    description: 'In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts.<p>Long ago the districts waged war on the Capitol and were defeated. As part of the surrender terms, each district agreed to send one boy and one girl to appear in an annual televised event called, \'The Hunger Games,\' a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she is forced to represent her district in the Games.<p>The terrain, rules, and level of audience participation may change but one thing is constant: kill or be killed.'
  },
  {
    title: 'Catching Fire (The Hunger Games)',
    author: 'Suzanne Collins',
    ratings: [3.7],
    datePublished: new Date('September 1, 2009'),
    imageUrl: 'hunger_games2.jpg',
    description: 'Against all odds, Katniss Everdeen has won the annual Hunger Games with fellow district tribute Peeta Mellark. But it was a victory won by defiance of the Capitol and their harsh rules. Katniss and Peeta should be happy. After all, they have just won for themselves and their families a life of safety and plenty. But there are rumors of rebellion among the subjects, and Katniss and Peeta, to their horror, are the faces of that rebellion.<p>The Capitol is angry. The Capitol wants revenge.'
  },
  {
    title: 'Mockingjay (The Hunger Games)',
    author: 'Suzanne Collins',
    ratings: [4.3],
    datePublished: new Date('February 25, 2014'),
    imageUrl: 'hunger_games3.jpg',
    description: 'Katniss Everdeen, girl on fire, has survived, even though her home has been destroyed. There are rebels. There are new leaders. A revolution is unfolding. District 13 has come out of the shadows and is plotting to overthrow the Capitol. Though she\'s long been a part of the revolution, Katniss hasn\'t known it. Now it seems that everyone has had a hand in the carefully laid plans but her.<p>The success of the rebellion hinges on Katniss\'s willingness to be a pawn, to accept responsibility for countless lives, and to change the course of the future of Panem. To do this, she must put aside her feelings of anger and distrust. She must become the rebels\' Mockingjay - no matter what the cost.'
  },
  {
    title: 'Fifty Shades Darker',
    author: 'E. L. James',
    ratings: [4.0],
    datePublished: new Date('April 17, 2012'),
    imageUrl: '50shades_darker.jpg',
    description: 'Daunted by the singular tastes and dark secrets of the beautiful, tormented young entrepreneur Christian Grey, Anastasia Steele has broken off their relationship to start a new career with a Seattle publishing house. But desire for Christian still dominates her every waking thought, and when he proposes a new arrangement, Anastasia cannot resist. They rekindle their searing sensual affair, and Anastasia learns more about the harrowing past of her damaged, driven and demanding Fifty Shades. While Christian wrestles with his inner demons, Anastasia must confront the anger and envy of the women who came before her, and make the most important decision of her life.<p>This book is intended for mature audiences.'
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    ratings: [4.2],
    datePublished: new Date('April 22, 2014'),
    imageUrl: 'gone_girl.jpg',
    description: 'On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne’s fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick’s clever and beautiful wife disappears. Husband-of-the-Year Nick isn’t doing himself any favors with cringe-worthy daydreams about the slope and shape of his wife’s head, but passages from Amy\'s diary reveal the alpha-girl perfectionist could have put anyone dangerously on edge.<p>Under mounting pressure from the police and the media—as well as Amy’s fiercely doting parents—the town golden boy parades an endless series of lies, deceits, and inappropriate behavior. Nick is oddly evasive, and he’s definitely bitter—but is he really a killer?'
  },
  {
    title: 'The Fault in Our Stars',
    author: 'John Green',
    ratings: [3.9],
    datePublished: new Date('April 8, 2014'),
    imageUrl: 'fault_stars.jpg',
    description: 'Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel’s story is about to be completely rewritten.<p>Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning-author John Green’s most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.'
  },
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson ',
    ratings: [4.4],
    datePublished: new Date('September 15, 2015'),
    imageUrl: 'steve_jobs.jpg',
    description: 'At a time when America is seeking ways to sustain its innovative edge, Jobs stands as the ultimate icon of inventiveness and applied imagination. He knew that the best way to create value in the twenty-first century was to connect creativity with technology. He built a company where leaps of the imagination were combined with remarkable feats of engineering. Although Jobs cooperated with the author, he asked for no control over what was written.<p>He put nothing off-limits. He encouraged the people he knew to speak honestly. He himself spoke candidly about the people he worked with and competed against. His friends, foes, and colleagues offer an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.<p>His tale is instructive and cautionary, filled with lessons about innovation, character, leadership, and values.'
  },
  {
    title: 'Good to Great',
    author: 'Jim Collins',
    ratings: [4.2],
    datePublished: new Date('October 16, 2001'),
    imageUrl: 'good_to_great.jpg',
    description: 'Built to Last, the defining management study of the nineties, showed how great companies triumph over time and how long-term sustained performance can be engineered into the DNA of an enterprise from the verybeginning.<p>But what about the company that is not born with great DNA? How can good companies, mediocre companies, even bad companies achieve enduring greatness?'
  },
  {
    title: 'Unbroken',
    author: 'Laura Hillenbrand',
    ratings: [3.9],
    datePublished: new Date('July 29, 2014'),
    imageUrl: 'unbroken.jpg',
    description: 'In boyhood, Louis Zamperini was an incorrigible delinquent. As a teenager, he channeled his defiance into running, discovering a prodigious talent that had carried him to the Berlin Olympics. But when World War II began, the athlete became an airman, embarking on a journey that led to a doomed flight on a May afternoon in 1943. When his Army Air Forces bomber crashed into the Pacific Ocean, against all odds, Zamperini survived, adrift on a foundering life raft. Ahead of Zamperini lay thousands of miles of open ocean, leaping sharks, thirst and starvation, enemy aircraft, and, beyond, a trial even greater. Driven to the limits of endurance, Zamperini would answer desperation with ingenuity; suffering with hope, resolve, and humor; brutality with rebellion. His fate, whether triumph or tragedy, would be suspended on the fraying wire of his will.'
  },
  {
    title: 'Divergent',
    author: 'Veronica Roth',
    ratings: [4.6],
    datePublished: new Date('September 30, 2014'),
    imageUrl: 'divergent.jpg',
    description: 'One choice can transform you. Beatrice Prior\'s society is divided into five factions—Candor (the honest), Abnegation (the selfless), Dauntless (the brave), Amity (the peaceful), and Erudite (the intelligent). Beatrice must choose between staying with her Abnegation family and transferring factions. Her choice will shock her community and herself. But the newly christened Tris also has a secret, one she\'s determined to keep hidden, because in this world, what makes you different makes you dangerous.'
  },
  {
    title: 'Twilight',
    author: 'Stephenie Meyer',
    ratings: [4.0],
    datePublished: new Date('August 15, 2011'),
    imageUrl: 'twilight1.jpg',
    description: 'Isabella Swan\'s move to Forks, a small, perpetually rainy town in Washington, could have been the most boring move she ever made. But once she meets the mysterious and alluring Edward Cullen, Isabella\'s life takes a thrilling and terrifying turn. Up until now, Edward has managed to keep his vampire identity a secret in the small community he lives in, but now nobody is safe, especially Isabella, the person Edward holds most dear. The lovers find themselves balanced precariously on the point of a knife-between desire and danger.Deeply romantic and extraordinarily suspenseful, Twilight captures the struggle between defying our instincts and satisfying our desires. This is a love story with bite.'
  },
  {
    title: 'Insurgent',
    author: 'Veronica Roth',
    ratings: [3.4],
    datePublished: new Date('January 20, 2015'),
    imageUrl: 'insurgent.jpg',
    description: 'As war surges in the factions of dystopian Chicago all around her, Tris attempts to save those she loves—and herself—while grappling with haunting questions of grief and forgiveness, identity and loyalty, politics and love.'
  },
  {
    title: 'Allegiant',
    author: 'Veronica Roth',
    ratings: [4.5],
    datePublished: new Date('January 19, 2016'),
    imageUrl: 'allegiant.jpg',
    description: 'Told from a riveting dual perspective, this third installment in the series follows Tris and Tobias as they battle to comprehend the complexities of human nature—and their selves—while facing impossible choices of courage, allegiance, sacrifice, and love.'
  },
  {
    title: 'Uglies',
    author: 'Scott Westerfeld',
    ratings: [4.3],
    datePublished: new Date('May 3, 2011'),
    imageUrl: 'uglies.jpg',
    description: 'The Uglies series has more than 3 million books in print, has been translated into twenty-seven languages, and spent more than fifty weeks on the New York Times bestseller list. Now all four books feature fresh new covers and will reach an even wider audience. Tally’s adventures begin in Uglies, where she learns the truth about what life as a Pretty really means.'
  },
  {
    title: 'The 5th Wave',
    author: 'Rick Yancey ',
    ratings: [2.4],
    datePublished: new Date('February 10, 2015'),
    imageUrl: '5th_wave.jpg',
    description: 'After the 1st wave, only darkness remains. After the 2nd, only the lucky escape. And after the 3rd, only the unlucky survive. After the 4th wave, only one rule applies: trust no one.<p>Now, it\'s the dawn of the 5th wave, and on a lonely stretch of highway, Cassie runs from Them. The beings who only look human, who roam the countryside killing anyone they see. Who have scattered Earth\'s last survivors. To stay alone is to stay alive, Cassie believes, until she meets Evan Walker. Beguiling and mysterious, Evan Walker may be Cassie\'s only hope for rescuing her brother--or even saving herself. But Cassie must choose: between trust and despair, between defiance and surrender, between life and death. To give up or to get up'
  },
  {
    title: 'Passenger',
    author: 'Alexandra Bracken',
    ratings: [4.3],
    datePublished: new Date('December 6, 2016'),
    imageUrl: 'passenger.jpg',
    description: 'In one devastating night, violin prodigy Etta Spencer loses everything she knows and loves. Thrust into an unfamiliar world by a stranger with a dangerous agenda, Etta is certain of only one thing: she has traveled not just miles, but years from home. And she\'s inherited a legacy she knows nothing about from a family whose existence she\'s never heard of. Until now.<p>Nicholas Carter is content with his life at sea, free from the Ironwoods-a powerful family in the Colonies-and the servitude he\'s known at their hands. But with the arrival of an unusual passenger on his ship comes the insistent pull of the past that he can\'t escape and the family that won\'t let him go so easily. Now the Ironwoods are searching for a stolen object of untold value, one they believe only Etta, his passenger, can find. In order to protect her, Nick must ensure she brings it back to them-whether she wants to or not.<p>Together, Etta and Nicholas embark on a perilous journey across centuries and continents, piecing together clues left behind by the traveler who will do anything to keep the object out of the Ironwoods\' grasp. But as they get closer to the truth of their search, and the deadly game the Ironwoods are playing, treacherous forces threaten to separate Etta not only from Nicholas but from her path home forever.'
  },
  {
    title: 'The Scorch Trials',
    author: 'James Dashner',
    ratings: [4.6],
    datePublished: new Date('September 13, 2011'),
    imageUrl: 'scotch_trials.jpg',
    description: ' Thomas was sure that escape from the Maze would mean freedom for him and the Gladers. But WICKED isn’t done yet. Phase Two has just begun. The Scorch.<p>The Gladers have two weeks to cross through the Scorch—the most burned-out section of the world. And WICKED has made sure to adjust the variables and stack the odds against them.<p>There are others now. Their survival depends on the Gladers’ destruction—and they’re determined to survive.<p>Friendships will be tested. Loyalties will be broken. All bets are off.'
  },
  {
    title: 'The Fever Code',
    author: 'James Dashner',
    ratings: [3.7],
    datePublished: new Date('September 27, 2016'),
    imageUrl: 'fever_code5.jpg',
    description: 'Once there was a world’s end. The forests burned, the lakes and rivers dried up, and the oceans swelled. Then came a plague, and fever spread across the globe. Families died, violence reigned, and man killed man. Next came WICKED, who were looking for an answer. And then they found the perfect boy. The boy’s name was Thomas, and Thomas built a maze.<p>Now there are secrets. There are lies. And there are loyalties history could never have foreseen. This is the story of that boy, Thomas, and how he built a maze that only he could tear down. All will be revealed.'
  },
  {
    title: 'The Kill Order',
    author: 'James Dashner',
    ratings: [4.3],
    datePublished: new Date('January 7, 2014'),
    imageUrl: 'kill_order4.jpg',
    description: 'Before WICKED was formed, before the Glade was built, before Thomas entered the Maze, sun flares hit the earth, killing most of the population.<p>Mark and Trina were there when it happened. They survived. But now a virus is spreading. A virus that fills humans with murderous rage.<p>They’re convinced that there’s a way to save those who are left—if they can stay alive. Because in this new, devastated world, every life has a price. And to some you’re worth more dead than alive.<p>The end is only the beginning.'
  }
];

/**
 * 
 */
function runseed() {
  models.SyncBooks.insertMany(books, (err, docs) => {
    if (err) {
      return Logger.error(`Error inserting docs: ${err}`);
    }
    Logger.info('db seed successful...');
    return conn.close();
  });
}

conn.once('open', () => {
  Logger.info('DB connect...\nStarting db seed...');
  runseed();
});
