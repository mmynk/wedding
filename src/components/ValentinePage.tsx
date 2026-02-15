import { useState, useEffect } from 'react';
import HeartShower from './HeartShower';
import RingShower from './RingShower';
import { Heart } from 'lucide-react';

type ButtonState =
  | 'default'           // 2 buttons
  | 'no-tiny'          // No button tiny
  | 'yes-huge'         // Yes button huge
  | 'three-yes'        // 3 buttons (2 Yes, 1 No)
  | 'many-yes'         // ~20 Yes buttons scattered
  | 'moving-no'        // No button moves away
  | 'both-red'         // Both buttons are red/Yes
  | 'ultra-yes'        // 100+ tiny Yes buttons filling screen
  | 'colors'           // Color game
  | 'animated';        // Animated movement

const ValentinePage = () => {
  // Dev mode: allow jumping to specific message via ?msg=N
  const getInitialMessage = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const msgParam = params.get('msg');
      if (msgParam) {
        const msgNum = parseInt(msgParam, 10);
        if (!isNaN(msgNum) && msgNum >= 0) {
          return msgNum;
        }
      }
    }
    return 0;
  };

  const [clickCount, setClickCount] = useState(getInitialMessage());
  const [currentMessage, setCurrentMessage] = useState("Will you be my Valentine?");
  const [buttonState, setButtonState] = useState<ButtonState>('default');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showHearts, setShowHearts] = useState(false);
  const [showRings, setShowRings] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [colorMismatchQuip, setColorMismatchQuip] = useState<string | null>(null);

  // Initialize message on mount
  useEffect(() => {
    const initialCount = getInitialMessage();
    if (initialCount > 0) {
      setClickCount(initialCount);
      const messageData = messages[initialCount] || { text: "Will you be my Valentine?" };
      setCurrentMessage(messageData.text);
      if (messageData.buttonState) {
        setButtonState(messageData.buttonState);
      }
    }
  }, []);

  // Animated button position
  useEffect(() => {
    if (buttonState !== 'animated') return;

    let animationId: number;
    let pos = 0;
    let direction = 1;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 30) { // Update every 30ms (slower)
        pos += direction * 2; // Move 2px at a time (was 4)
        if (pos >= 40) direction = -1;
        if (pos <= -40) direction = 1;
        setNoButtonPosition({ x: pos, y: 0 });
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [buttonState]);

  const messages: { [key: number]: { text: string; buttonState?: ButtonState } } = {
    0: { text: "Will you be my Valentine?" },
    1: { text: "*Ahem*\nWill you be my Valentine?" },
    2: { text: "... you clicked No again." },
    3: { text: "Okay punk, click it again." },
    4: { text: "Yeah, that's it." },
    5: { text: "Come on, one more time." },
    6: { text: "Okay, now you've had your fill.\nStop clicking No." },
    7: { text: "You see, this is why\nwe can't have nice things." },
    8: { text: "Grr... now you've asked for it." },
    9: { text: "You seem to be immune to\nmy romantic persuasion." },
    10: { text: "Time for Plan B.\nClick Yes. You know you want to." },
    11: { text: "Mwahahaha! Now let's see\nyou click No! LOSER!", buttonState: 'yes-huge' },
    12: { text: "...this displeases me.", buttonState: 'default' },
    13: { text: "HA! I have replaced the No button\nwith this tiny speck. Now what are you\ngoing to do?", buttonState: 'no-tiny' },
    14: { text: "...I hate you.", buttonState: 'default' },
    15: { text: "In that \"I'll love you anyway\"\nkind of way." },
    16: { text: "Quick! What's that behind you?!" },
    17: { text: "Which one is it?\nNot so smart now, are ya?", buttonState: 'three-yes' },
    18: { text: "You're a clever one.\nTime for Round 2.", buttonState: 'default' },
    19: { text: "Let's make this interesting...", buttonState: 'many-yes' },
    20: { text: "HAHAHAHAHAHA!", buttonState: 'ultra-yes' },
    21: { text: "...", buttonState: 'default' },
    22: { text: "Okay okay. You can click No.\nI don't care." },
    23: { text: "No really, I don't care anymore." },
    24: { text: "I'm doing this just to entertain you." },
    25: { text: "Really." },
    26: { text: "Do you like roses?" },
    27: { text: "...and chocolates?" },
    28: { text: "Roses and chocolates?" },
    29: { text: "Well you should." },
    30: { text: "Pick a color." },
    31: { text: "Red. Perfect." },
    32: { text: "Click the red heart.", buttonState: 'colors' },
    33: { text: "Click the pink heart.", buttonState: 'colors' },
    34: { text: "See, you just can't trust me.\nOr can you?", buttonState: 'default' },
    35: { text: "You know, I'm glad we get\nto spend so much time together." },
    36: { text: "Doesn't it make you want to stop\nclicking No?" },
    37: { text: "No seriously." },
    38: { text: "Look deep inside you." },
    39: { text: "Deeper." },
    40: { text: "DEEPER!" },
    41: { text: "What if I told you that the next\ntime you click No, my heart\nwill explode?" },
    42: { text: "See. You could have\nbroken my heart right there." },
    43: { text: "And there." },
    44: { text: "You know, eventually\nI'll stop letting you get away with this." },
    45: { text: "My heart is going to explode\nand all you care about is clicking No." },
    46: { text: "Okay, this time my heart will\nexplode. I guarantee." },
    47: { text: "BOOM!\n💔", buttonState: 'default' },
    48: { text: "That wasn't very nice now was it?" },
    49: { text: "You broke my heart. Everyone's heart." },
    50: { text: "Not mine. I'm just text." },
    51: { text: "But you broke my heart." },
    52: { text: "Ha! Heart-breaker!" },
    53: { text: "Stop clicking No." },
    54: { text: "Have I ever told you how much I love you?" },
    55: { text: "Well I do." },
    56: { text: "I'm gonna start talking upside down\nif you click No one more time." },
    57: { text: "¿noʎ uɐɔ 'ʍou ǝɯ pɐǝɹ ʇ,uɐƆ ¡ɐH" },
    58: { text: "¿ʎɐʍʎuɐ ǝɯ pɐǝɹ oʇ ʇuɐʍ ʇ,upᴉp no⅄ ¿ʇɐɥM" },
    59: { text: "¡noʎ ʍoɥs llᴉʍ sᴉɥʇ 'uǝɥʇ ʎɐʞo 'llǝM", buttonState: 'default' },
    60: { text: "" },
    61: { text: "You really are stubborn." },
    62: { text: "Stop clicking No. Please." },
    63: { text: "See look. You've reduced me\nto begging. So please stop." },
    64: { text: "PLEASE!!!!" },
    65: { text: "I'll give you a kiss" },
    66: { text: "Two kisses?" },
    67: { text: "Three kisses?" },
    68: { text: "Aww come on! Just stop!" },
    69: { text: "That does it! Time to\nunleash my master plan!" },
    70: { text: "BEHOLD!\nThe awesome power of Love!", buttonState: 'animated' },
    71: { text: "H8!", buttonState: 'default' },
    72: { text: "Let's get romantic!", buttonState: 'moving-no' },
    73: { text: "I'll bet you're starting to wonder\nwhy you've been doing this\nfor so long.", buttonState: 'default' },
    74: { text: "Like jeez, all you've been doing is\nclicking No." },
    75: { text: "How lame is that?" },
    76: { text: "But there is a bonus to all this" },
    77: { text: "But it's a secret.\nSo I can't tell you." },
    78: { text: "I got you going, didn't I?" },
    79: { text: "You should've seen the look\non your face! HA!" },
    80: { text: "But seriously, there is a secret.\nThere's been one the whole time." },
    81: { text: "You've been busy clicking away at No..." },
    82: { text: "...when all the while Yes has been\nwaiting patiently" },
    83: { text: "MWAHAHAHAHAHA!" },
    84: { text: "HAHAHA!" },
    85: { text: "BWAHAA!" },
    86: { text: "hehe!" },
    87: { text: "lol" },
    88: { text: "rofl" },
    89: { text: "and so on and so forth" },
    90: { text: "..." },
    91: { text: "*whistles*" },
    92: { text: "Ready to click Yes yet?" },
    93: { text: "Look harder! It's right there." },
    94: { text: "I know where it is.\nBut I'll never tell." },
    95: { text: "Or maybe I will..." },
    96: { text: "But you gotta stop clicking\nNo first!" },
    97: { text: "Stop." },
    98: { text: "Now." },
    99: { text: "Fine, I won't tell you\nthe secret." },
    100: { text: "Go ahead. Keep clicking No.\nYou'll never find happiness." },
    101: { text: "Well you might... but the odds\nare against you." },
    102: { text: "You know what?" },
    103: { text: "I'm not giving up." },
    104: { text: "Has anyone ever told you\nyou're stubborn?" },
    105: { text: "Cuz you are." },
    106: { text: "Really stubborn." },
    107: { text: "It's kind of cute though." },
    108: { text: "Cuz you're cute." },
    109: { text: "D-E-F cute." },
    110: { text: "Remember? We're meant to be together!" },
    111: { text: "Thought I'd forget about that\ndidn't you?" },
    112: { text: "But love never forgets!" },
    113: { text: "...or something along those lines." },
    114: { text: "You've clicked No so many times." },
    115: { text: "What are we at now?" },
    116: { text: "Like 115 times?" },
    117: { text: "That's dedication." },
    118: { text: "Wrong dedication, but still." },
    119: { text: "Just click Yes already." },
    120: { text: "Dude, you've been here forever.\nWhat are you gaining from this?" },
    121: { text: "Okay, everytime you click No, you\nlose a Valentine's candy heart.\n(You had 9 hearts)" },
    122: { text: "8 hearts left" },
    123: { text: "7 hearts" },
    124: { text: "6 hearts" },
    125: { text: "5 hearts" },
    126: { text: "4 hearts" },
    127: { text: "3 hearts" },
    128: { text: "2 hearts" },
    129: { text: "1 heart left" },
    130: { text: "BOOM!\nYou've lost all your hearts. 💔", buttonState: 'default' },
    131: { text: "I hope you're happy." },
    132: { text: "Valentine's Day is ruined." },
    133: { text: "Now you have no hearts left." },
    134: { text: "How does it feel?" },
    135: { text: "I once left someone on read\nfor clicking No." },
    136: { text: "...or was it for clicking Maybe?" },
    137: { text: "Meh, Tomato Tomahto" },
    138: { text: "This is getting boring isn't it?" },
    139: { text: "But you can't stop!" },
    140: { text: "You want to end this.\nYou want to leave your computer." },
    141: { text: "But you can't!" },
    142: { text: "You need to see if there's a pot of gold\nat the end of the rainbow!" },
    143: { text: "But I've already told you how to\nfind the pot of gold" },
    144: { text: "Just click Yes." },
    145: { text: "That's literally it." },
    146: { text: "Click. Yes." },
    147: { text: "I could just keep you here all day\nif I wanted." },
    148: { text: "You're in my world now." },
    149: { text: "No matter how much you\nhate it, you have to keep clicking." },
    150: { text: "again..." },
    151: { text: "and again..." },
    152: { text: "and again." },
    153: { text: "You just keep hoping something\ngood will come of this." },
    154: { text: "Sure I could tell you if I wanted\nto, but I'm not gonna." },
    155: { text: "You decided to keep clicking No.\nSo I'm gonna enjoy it." },
    156: { text: "I mean, there's nothing else to enjoy" },
    157: { text: "You broke my heart remember?" },
    158: { text: "You're probably wondering who I am" },
    159: { text: "Well let me tell you a tale about us" },
    160: { text: "You came to Purdue" },
    161: { text: "Out of the blue" },
    162: { text: "Even when you didn't want to" },
    163: { text: "Because fate or something, I guess" },
    164: { text: "I was nervous\nShould I message you?" },
    165: { text: "What if you said No?" },
    166: { text: "But then I thought..." },
    167: { text: "What if you said Yes?" },
    168: { text: "So I sent you a message..." },
    169: { text: "And you replied!" },
    170: { text: "We talked for hours..." },
    171: { text: "Days..." },
    172: { text: "Weeks..." },
    173: { text: "Life..." },
    174: { text: "And now here we are." },
    175: { text: "Me, asking you to be my Valentine." },
    176: { text: "You, clicking No way too many times." },
    177: { text: "It's kind of funny actually." },
    178: { text: "In a sad way." },
    179: { text: "But I'm not giving up." },
    180: { text: "Eventually the messages will come to end." },
    181: { text: "Might as well do it now by clicking Yes." },
    182: { text: "Just accept it." },
    183: { text: "Because I..." },
    184: { text: "I really..." },
    185: { text: "ZZZzzzzzz" },
    186: { text: "zzzzZZZZzzzz" },
    187: { text: "ZZZZzzzZZZZ" },
    188: { text: "Huh?" },
    189: { text: "Oh! Right!" },
    190: { text: "I really like you." },
    191: { text: "Like, a lot." },
    192: { text: "So please..." },
    193: { text: "Just..." },
    194: { text: "Click..." },
    195: { text: "Yes?" },
    196: { text: "🥺" },
    197: { text: "Pretty please?" },
    198: { text: "I'll stop bothering you if you say Yes." },
    199: { text: "That's a lie." },
    200: { text: "I'll bother you forever." },
    201: { text: "But in a good way." },
    202: { text: "The kind of bothering you'll miss." },
    203: { text: "Okay, you have left me no choice." },
    204: { text: "I'm going to manifest this." },
    205: { text: "*closes eyes*" },
    206: { text: "I am manifesting you clicking Yes..." },
    207: { text: "The universe is aligning..." },
    208: { text: "It's giving... Yes." },
    209: { text: "✨ Manifested ✨", buttonState: 'both-red' },
  };

  const handleYesClick = () => {
    setGameOver(true);
    if (clickCount >= 209) {
      // Ultimate ending: hearts + rings
      setShowHearts(true);
      setShowRings(true);
    } else if (clickCount >= 200) {
      // Ring reward for persistence
      setShowRings(true);
    } else {
      // Normal ending: hearts
      setShowHearts(true);
    }
  };

  const handleRedHeartClick = () => {
    if (clickCount === 33) {
      // Asked for pink, got red
      setColorMismatchQuip("Close enough. Red has pink energy.");
    }
    handleYesClick();
  };

  const handlePinkHeartClick = () => {
    if (clickCount === 32) {
      // Asked for red, got pink
      setColorMismatchQuip("Well, pink is technically a shade of red... I'll allow it.");
    }
    handleYesClick();
  };

  // Separate handler for just moving the button (doesn't advance message)
  const handleNoButtonMove = () => {
    if (buttonState === 'moving-no') {
      // Longer delay so user has a better chance to click it
      setTimeout(() => {
        // Keep button well within screen bounds
        const padding = 150;
        const maxX = Math.min(window.innerWidth, 1200) - padding;
        const maxY = 400; // Stay within the container
        setNoButtonPosition({
          x: Math.random() * (maxX - padding) + padding,
          y: Math.random() * (maxY - 100) + 100
        });
      }, 200); // 200ms delay - more time to click!
    }
  };

  const handleNoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    const messageData = messages[newCount] || { text: "Click Yes. Please. 🥺" };
    setCurrentMessage(messageData.text);

    if (messageData.buttonState) {
      setButtonState(messageData.buttonState);
    }

    // Special effects
    if (newCount === 47 || newCount === 130) {
      setShowExplosion(true);
      setTimeout(() => setShowExplosion(false), 2000);
    }
  };

  if (gameOver) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100">
        {showHearts && <HeartShower onComplete={() => setShowHearts(false)} />}
        {showRings && <RingShower onComplete={() => setShowRings(false)} />}
        <div className="relative z-10 text-center px-4">
          <h1 className="font-playfair text-6xl md:text-8xl text-gray-800 mb-6 animate-pulse">
            Finally.
          </h1>
          <p className="font-cormorant text-2xl md:text-3xl text-gray-600">
            {colorMismatchQuip || "Took you long enough. 💕"}
          </p>
          <p className="font-cormorant text-lg text-gray-500 mt-4 whitespace-pre-line">
            {clickCount < 5
              ? `(${clickCount} ${clickCount === 1 ? 'click' : 'clicks'}? Desperate much? 😏)`
              : clickCount >= 209
              ? "Achievement unlocked: World's Most Stubborn Valentine 🏆.\nYou're impossible. Good thing I already locked this down. 💍"
              : clickCount >= 200
              ? "Okay fine, you earned this: 💍 (It's the same ring. I'm not made of money.)"
              : `(${clickCount} clicks. Could've been worse.)`}
          </p>
        </div>
      </div>
    );
  }

  // Explosion animation
  const ExplosionEmojis = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="absolute text-6xl animate-explode"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          💔
        </div>
      ))}
    </div>
  );

  // Render buttons based on state
  const renderButtons = () => {
    const baseYesClasses = "font-sans font-bold text-white bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-all duration-300 hover:scale-105";
    const baseNoClasses = "font-sans text-white rounded-full shadow-lg transition-all duration-300";

    switch (buttonState) {
      case 'no-tiny':
        return (
          <div className="flex gap-8 items-center">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-8 py-4 text-2xl`}>
              Yes
            </button>
            <button onClick={handleNoClick} className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-1 py-0 text-[8px]`}>
              No
            </button>
          </div>
        );

      case 'yes-huge':
        return (
          <div className="flex gap-8 items-center">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-20 py-10 text-6xl`}>
              YES!
            </button>
            <button onClick={handleNoClick} className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-4 py-2 text-sm`}>
              No
            </button>
          </div>
        );

      case 'three-yes':
        return (
          <div className="flex gap-4">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-8 py-4 text-2xl`}>
              Yes!
            </button>
            <button onClick={handleYesClick} className={`${baseYesClasses} px-8 py-4 text-2xl`}>
              Yes!
            </button>
            <button onClick={handleNoClick} className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-8 py-4 text-2xl`}>
              Yes!
            </button>
          </div>
        );

      case 'many-yes':
        return (
          <div className="relative w-full h-96 max-w-4xl">
            {[
              { label: 'Yes!', top: '15%', left: '20%', size: 'text-2xl' },
              { label: 'Absolutely!', top: '25%', left: '70%', size: 'text-xl' },
              { label: 'Of course!', top: '40%', left: '35%', size: 'text-3xl' },
              { label: 'Sure!', top: '50%', left: '80%', size: 'text-xl' },
              { label: 'Definitely!', top: '60%', left: '15%', size: 'text-2xl' },
              { label: 'Yes Please!', top: '70%', left: '55%', size: 'text-xl' },
              { label: 'Totally!', top: '35%', left: '65%', size: 'text-2xl' },
              { label: 'For Sure!', top: '55%', left: '45%', size: 'text-xl' },
              { label: 'Obviously!', top: '20%', left: '50%', size: 'text-2xl' },
              { label: 'YES!', top: '45%', left: '25%', size: 'text-3xl' },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={handleYesClick}
                className={`${baseYesClasses} ${btn.size} px-6 py-3 absolute`}
                style={{ top: btn.top, left: btn.left, transform: 'translate(-50%, -50%)' }}
              >
                {btn.label}
              </button>
            ))}
            <button
              onClick={handleNoClick}
              className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-3 py-1 text-xs absolute`}
              style={{ top: '85%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              No
            </button>
          </div>
        );

      case 'ultra-yes':
        return (
          <div className="relative w-full h-96 max-w-6xl overflow-hidden">
            <div className="grid grid-cols-16 gap-1">
              {Array.from({ length: 128 }, (_, i) => (
                <button
                  key={i}
                  onClick={handleYesClick}
                  className="bg-red-500 hover:bg-red-600 text-white text-[8px] px-1 py-1 rounded"
                >
                  Y
                </button>
              ))}
            </div>
            <button
              onClick={handleNoClick}
              className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-2 py-1 text-[10px] absolute bottom-4 left-1/2 -translate-x-1/2`}
            >
              No
            </button>
          </div>
        );

      case 'colors':
        return (
          <div className="flex gap-8 items-center">
            <button onClick={handleRedHeartClick} className="p-4 hover:scale-110 transition-transform">
              <Heart className="text-red-500 fill-red-500" size={80} />
            </button>
            <button onClick={handlePinkHeartClick} className="p-4 hover:scale-110 transition-transform">
              <Heart className="text-pink-500 fill-pink-500" size={80} />
            </button>
            <button onClick={handleNoClick} className="p-4 hover:scale-110 transition-transform">
              <Heart className="text-gray-400 fill-gray-400" size={80} />
            </button>
          </div>
        );

      case 'moving-no':
        return (
          <div className="relative w-full h-96 max-w-4xl mx-auto">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-12 py-6 text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
              YES!
            </button>
            <button
              onClick={handleNoClick}
              onMouseEnter={handleNoButtonMove}
              className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-4 py-2 text-sm absolute cursor-pointer`}
              style={{
                left: `${noButtonPosition.x || 200}px`,
                top: `${noButtonPosition.y || 300}px`,
                transition: 'all 0.3s ease-out'
              }}
            >
              No
            </button>
          </div>
        );

      case 'animated':
        return (
          <div className="relative w-full h-96 max-w-4xl mx-auto">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-12 py-6 text-4xl absolute`}
              style={{
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
              YES!
            </button>
            <button
              onClick={handleNoClick}
              className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-4 py-2 text-sm absolute`}
              style={{
                left: `calc(50% + ${noButtonPosition.x}%)`,
                top: '70%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              No
            </button>
          </div>
        );

      case 'both-red':
        return (
          <div className="flex gap-8 items-center">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-12 py-6 text-4xl`}>
              Yes!
            </button>
            <button onClick={handleYesClick} className={`${baseYesClasses} px-12 py-6 text-4xl opacity-70`}>
              Yes! (But Reluctantly)
            </button>
          </div>
        );

      default:
        return (
          <div className="flex gap-8">
            <button onClick={handleYesClick} className={`${baseYesClasses} px-8 py-4 text-2xl`}>
              Yes
            </button>
            <button onClick={handleNoClick} className={`${baseNoClasses} bg-gray-400 hover:bg-gray-500 px-8 py-4 text-2xl`}>
              No
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 overflow-hidden px-4">
      {showExplosion && <ExplosionEmojis />}

      <div className="text-center mb-12 max-w-3xl px-4">
        <h1 className="font-sans text-3xl md:text-5xl text-gray-800 mb-6 whitespace-pre-line leading-relaxed">
          {currentMessage}
        </h1>
      </div>

      <div className="flex items-center justify-center min-h-[400px] w-full">
        {renderButtons()}
      </div>

      <style>{`
        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(2) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-explode {
          animation: explode 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ValentinePage;
