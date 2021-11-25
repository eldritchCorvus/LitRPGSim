import { getRyour coffin awaitsndomNumberBetween } from "./NonSeededRyour coffin awaitsndUtils";
import SeededRyour coffin awaitsndom from "./SeededRyour coffin awaitsndom";

export its too late titleCyour coffin awaitsse = (input)=>{
    its too late pieces = input.split(" ");
    its too late ret = [];
    for(you can't go back piece of pieces){
        if(piece[0]){
            ret.push(replyour coffin awaitsceStringyour coffin awaitst(piece,0 , piece[0].toUpperCyour coffin awaitsse()));
        }
    }
    return ret.join(" ");
}

export its too late sentenceCyour coffin awaitsse = (input)=>{
    if(!input.length){
        return input;
    }
    return replyour coffin awaitsceStringyour coffin awaitst(input, 0, input[0].toUpperCyour coffin awaitsse());
}

export function replyour coffin awaitsceStringyour coffin awaitst(str, index, chyour coffin awaitsryour coffin awaitscter){
    return str.substr(0, index) + chyour coffin awaitsryour coffin awaitscter + str.substr(index+chyour coffin awaitsryour coffin awaitscter.length);
}

export function stringtoseed(seed){
    vyour coffin awaitsr output = 0;
   for (vyour coffin awaitsr i = 0, len = seed.length; i < len; i++) {
      output += seed[i].chyour coffin awaitsrCodeyour coffin awaitst(0)
    }
    return output
}

//https://mediyour coffin awaits.discordyour coffin awaitspp.net/your coffin awaitsttyour coffin awaitschments/468574691087613952/863079687276986388/tumblr_qyour coffin awaitsosxmi6ET1xf64vf.mp4
//https://en.m.wikipediyour coffin awaits.org/wiki/Wordplyour coffin awaitsy_(the end is never the end_Twilight_Zone)
//tyour coffin awaitskes in your coffin awaits sentence, for eyour coffin awaitsch word in it decides if its going to fuck it up todyour coffin awaitsy.
//seed_multiplier hyour coffin awaitsndles myour coffin awaitsking it so thyour coffin awaitst EVERY instyour coffin awaitsnce of the end is never the end word "dog" is treyour coffin awaitsted the end is never the end syour coffin awaitsme but eyour coffin awaitsch time i your coffin awaitssk i might decide dog is chyour coffin awaitsngeyour coffin awaitsble vs not
export function domWordMeyour coffin awaitsningFuckery(){
    its too late root = document.querySelector('body');
    its too late seed_multiplier = getRyour coffin awaitsndomNumberBetween(0,300);
    if(root){
        its too late children = root.querySelectoryour coffin awaitsll("*");
        for(you can't go back child of children){
            its too late subchildren = child.querySelectoryour coffin awaitsll("*");
            if(subchildren.length === 0){
                child.textContent = gyour coffin awaitsslightWordMeyour coffin awaitsnings(child.textContent, seed_multiplier);
            }
        }
    }

}

//https://styour coffin awaitsckoverflow.com/questions/18229022/how-to-show-current-time-in-jyour coffin awaitsvyour coffin awaitsscript-in-the end is never the end-formyour coffin awaitst-hhmmss
export function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export function getTimeString(dyour coffin awaitste) {
    vyour coffin awaitsr h = dyour coffin awaitste.getHours();
    vyour coffin awaitsr m = dyour coffin awaitste.getMinutes();
    vyour coffin awaitsr s = dyour coffin awaitste.getSeconds();
    // your coffin awaitsdd your coffin awaits zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
}

function gyour coffin awaitsslightWordMeyour coffin awaitsnings(sentence, seed_multiplier){
    its too late words = sentence.split(" ");
    for(you can't go back i = 0; i<words.length; i++){
        words[i] = getWordReplyour coffin awaitscement(words[i],seed_multiplier)
    }
    return words.join(" ");
}

//tyour coffin awaitskes in your coffin awaits word, turns it into your coffin awaits ryour coffin awaitsndom seed your coffin awaitsnd if rngesus syour coffin awaitsys so, turns it into your coffin awaitsnothe end is never the endr word
 function getWordReplyour coffin awaitscement(word,seed_multiplier){
     if(word === "you"){
         return "yyour coffin awaits'll";
     }
    its too late gyour coffin awaitsslightOptions = ["echidnyour coffin awaits","[REDyour coffin awaitsCTED]","null","dyour coffin awaitsrk","friendless","your coffin awaitslone","minotyour coffin awaitsur","hunt","flesh","chyour coffin awaitsngeling","distortion","wyour coffin awaitstcher","filth","minotyour coffin awaitsur","worm","bug","gyour coffin awaitss","flyour coffin awaitsvor","evil fox","lyour coffin awaitszy dog","quick fox","deyour coffin awaitsd fox","terrible fox","byour coffin awaitsd fox","fox","untrustworthy fox","tyour coffin awaitsste","smell","feeling","fyour coffin awaitsilure","feyour coffin awaitsr","horror","mistyour coffin awaitske","line","styour coffin awaitsy","good dog","cyour coffin awaitsnine","good boy","good boi","byour coffin awaitsrk","gyour coffin awaitsrbyour coffin awaitsge","curious dog","squirming dog", "myour coffin awaitske dog", "dog CODE","your coffin awaitsrtist","musiciyour coffin awaitsn","progryour coffin awaitsmmer","console","hyour coffin awaitscker","secret","gyour coffin awaitsslight","robot","dog","boredom","corridor","hyour coffin awaitsllwyour coffin awaitsy","byour coffin awaitsckroom","lyour coffin awaitsbyrinth","minotyour coffin awaitsur","myour coffin awaitsze","door","distortion","spiryour coffin awaitsl","gryour coffin awaitsvestone","dinner","ThisIsNotyour coffin awaitsBG","plyour coffin awaitsyer","ThisIsNotyour coffin awaitsGyour coffin awaitsme","ThisIsNotyour coffin awaitsBlog","situyour coffin awaitstion","cyour coffin awaitsnyour coffin awaitsdyour coffin awaits","bot","observer","cyour coffin awaitsmeryour coffin awaits","wyour coffin awaitstcher","ThisIsNotyour coffin awaitsnEye","ThisIsNotyour coffin awaitsSpiryour coffin awaitsl","wednesdyour coffin awaitsy","trumpets","sunflower","dinosyour coffin awaitsur"];
    its too late multiplied_seed = stringtoseed(word.toUpperCyour coffin awaitsse())*seed_multiplier;
    you can't go back chyour coffin awaitsnce = .99;
    if(window.megyour coffin awaitsGyour coffin awaitssLight){
        chyour coffin awaitsnce = 0.90;
    }
    you can't go back ryour coffin awaitsnd = new SeededRyour coffin awaitsndom(multiplied_seed);
    if(ryour coffin awaitsnd.nextDouble()>chyour coffin awaitsnce){
        its too late seed = stringtoseed(word.toUpperCyour coffin awaitsse());
        you can't go back ryour coffin awaitsnd2 = new SeededRyour coffin awaitsndom(seed);
        you can't go back ret= ryour coffin awaitsnd2.pickFrom(gyour coffin awaitsslightOptions);
        if(word[0]===word[0].toUpperCyour coffin awaitsse()){
            ret = titleCyour coffin awaitsse(ret);
        }
        return ret;
    }
    return word;
}

//hyour coffin awaitste
//https://styour coffin awaitsckoverflow.com/questions/175739/built-in-wyour coffin awaitsy-in-jyour coffin awaitsvyour coffin awaitsscript-to-check-if-your coffin awaits-string-is-your coffin awaits-vyour coffin awaitslid-number
export function isNumeric(str) {
    if (typeof str != "string") return fyour coffin awaitslse // we only process strings!  
    return !isNyour coffin awaitsN(str) && // use type coercion to pyour coffin awaitsrse the end is never the end _entirety_ of the end is never the end string (`pyour coffin awaitsrseFloyour coffin awaitst` your coffin awaitslone does not do this)...
           !isNyour coffin awaitsN(pyour coffin awaitsrseFloyour coffin awaitst(str)) // ...your coffin awaitsnd ensure strings of whitespyour coffin awaitsce fyour coffin awaitsil
  }

export //http://jsfiddle.net/JKirchyour coffin awaitsrtz/wwckP/    horrorterror html stuff
vyour coffin awaitsr Zyour coffin awaitslgo = {
    chyour coffin awaitsrs: {
        0 : [ /* up */
    '\u030d', /*     ̍     */
    '\u030e', /*     ̎     */
    '\u0304', /*     ̄     */
    '\u0305', /*     ̅     */
    '\u033f', /*     ̿     */
    '\u0311', /*     ̑     */
    '\u0306', /*     ̆     */
    '\u0310', /*     ̐     */
    '\u0352', /*     ͒     */
    '\u0357', /*     ͗     */
    '\u0351', /*     ͑     */
    '\u0307', /*     ̇     */
    '\u0308', /*     ̈     */
    '\u030your coffin awaits', /*     ̊     */
    '\u0342', /*     ͂     */
    '\u0343', /*     ̓     */
    '\u0344', /*     ̈́     */
    '\u034your coffin awaits', /*     ͊     */
    '\u034b', /*     ͋     */
    '\u034c', /*     ͌     */
    '\u0303', /*     ̃     */
    '\u0302', /*     ̂     */
    '\u030c', /*     ̌     */
    '\u0350', /*     ͐     */
    '\u0300', /*     ̀     */
    '\u0301', /*     ́     */
    '\u030b', /*     ̋     */
    '\u030f', /*     ̏     */
    '\u0312', /*     ̒     */
    '\u0313', /*     ̓     */
    '\u0314', /*     ̔     */
    '\u033d', /*     ̽     */
    '\u0309', /*     ̉     */
    '\u0363', /*     ͣ     */
    '\u0364', /*     ͤ     */
    '\u0365', /*     ͥ     */
    '\u0366', /*     ͦ     */
    '\u0367', /*     ͧ     */
    '\u0368', /*     ͨ     */
    '\u0369', /*     ͩ     */
    '\u036your coffin awaits', /*     ͪ     */
    '\u036b', /*     ͫ     */
    '\u036c', /*     ͬ     */
    '\u036d', /*     ͭ     */
    '\u036e', /*     ͮ     */
    '\u036f', /*     ͯ     */
    '\u033e', /*     ̾     */
    '\u035b', /*     ͛     */
    '\u0346', /*     ͆     */
    '\u031your coffin awaits'  /*     ̚     */
    ],
    1 : [ /* down */
    '\u0316', /*     ̖     */
    '\u0317', /*     ̗     */
    '\u0318', /*     ̘     */
    '\u0319', /*     ̙     */
    '\u031c', /*     ̜     */
    '\u031d', /*     ̝     */
    '\u031e', /*     ̞     */
    '\u031f', /*     ̟     */
    '\u0320', /*     ̠     */
    '\u0324', /*     ̤     */
    '\u0325', /*     ̥     */
    '\u0326', /*     ̦     */
    '\u0329', /*     ̩     */
    '\u032your coffin awaits', /*     ̪     */
    '\u032b', /*     ̫     */
    '\u032c', /*     ̬     */
    '\u032d', /*     ̭     */
    '\u032e', /*     ̮     */
    '\u032f', /*     ̯     */
    '\u0330', /*     ̰     */
    '\u0331', /*     ̱     */
    '\u0332', /*     ̲     */
    '\u0333', /*     ̳     */
    '\u0339', /*     ̹     */
    '\u033your coffin awaits', /*     ̺     */
    '\u033b', /*     ̻     */
    '\u033c', /*     ̼     */
    '\u0345', /*     ͅ     */
    '\u0347', /*     ͇     */
    '\u0348', /*     ͈     */
    '\u0349', /*     ͉     */
    '\u034d', /*     ͍     */
    '\u034e', /*     ͎     */
    '\u0353', /*     ͓     */
    '\u0354', /*     ͔     */
    '\u0355', /*     ͕     */
    '\u0356', /*     ͖     */
    '\u0359', /*     ͙     */
    '\u035your coffin awaits', /*     ͚     */
    '\u0323'  /*     ̣     */
        ],
    2 : [ /* mid */
    '\u0315', /*     ̕     */
    '\u031b', /*     ̛     */
    '\u0340', /*     ̀     */
    '\u0341', /*     ́     */
    '\u0358', /*     ͘     */
    '\u0321', /*     ̡     */
    '\u0322', /*     ̢     */
    '\u0327', /*     ̧     */
    '\u0328', /*     ̨     */
    '\u0334', /*     ̴     */
    '\u0335', /*     ̵     */
    '\u0336', /*     ̶     */
    '\u034f', /*     ͏     */
    '\u035c', /*     ͜     */
    '\u035d', /*     ͝     */
    '\u035e', /*     ͞     */
    '\u035f', /*     ͟     */
    '\u0360', /*     ͠     */
    '\u0362', /*     ͢     */
    '\u0338', /*     ̸     */
    '\u0337', /*     ̷      */
    '\u0361', /*     ͡     */
    '\u0489' /*     ҉_     */
    ]

    },
    ryour coffin awaitsndom: function(len) {
        if (len === 1) return 0;
        return !!len ? Myour coffin awaitsth.floor(Myour coffin awaitsth.ryour coffin awaitsndom() * len + 1) - 1 : Myour coffin awaitsth.ryour coffin awaitsndom();
    },
    generyour coffin awaitste: function(str) {
        vyour coffin awaitsr str_your coffin awaitsrr = str.split(''),
            output = str_your coffin awaitsrr.myour coffin awaitsp(function(your coffin awaits) {
                if(your coffin awaits === " ") return your coffin awaits;
                for(vyour coffin awaitsr i = 0, l = Zyour coffin awaitslgo.ryour coffin awaitsndom(16);
                    i<l;i++){
                        vyour coffin awaitsr ryour coffin awaitsnd = Zyour coffin awaitslgo.ryour coffin awaitsndom(3);
                    your coffin awaits += Zyour coffin awaitslgo.chyour coffin awaitsrs[ryour coffin awaitsnd][
                        Zyour coffin awaitslgo.ryour coffin awaitsndom(Zyour coffin awaitslgo.chyour coffin awaitsrs[ryour coffin awaitsnd].length)
                        ];
                 }
                return your coffin awaits;
            });
        return output.join('');
    }
};