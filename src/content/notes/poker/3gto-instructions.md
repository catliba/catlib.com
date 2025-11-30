---
title: "Generalized GTO Instructions"
tags: ["poker"]
date: "11/26/25"
category: "Poker"
---

Divided by SRP, 3!, 4! pots as well as pre flop agressor or caller as well as position. 

<details>
<summary><strong>Definitions</strong></summary>

**Single Raised Pot (SPR)**: Preflop action consists of one raiser and everyone else either calls or folds. We then go to a flop.
**3 Bet Pot (3BP or 3!)**: Preflop action where there is one raiser and then another guy raises that on top. We then go to the flop.
**In Position (IP)**: We are last to act 
**Single Broadway Disconnected**: One broadway card and 2 non broadway cards. Disconnected means that the other two cards are also very spread apart from each other.
    - Q63, K22, J63
    - technically A and T are also broadway cards but they have their own category below
**Double Broadway**: Two broadway cards on the flop.
    - KJ4, KJ9, AJ6
**Triple Broadway**: Three broadway cards.
    - AQK, AKJ, AQT
**10-9 High Disconnected**: A ten or nine along with some low cards.
    - T52, T96, T55
**Ace High Disconnected**: Ace with random disarrayed number cards
**Ace High Wheel Board**: Ace with low cards.
**Monotone Board**: Same suit flop.
**10-9 High Connected**: Higher middling cards with straight possibilities.
    - T98, 987, 986
**8-2 High Connected**: Also known as code red. Low and connected cards with straight possibilities. 
    - 876, 754, 542
**8-2 High Disconnected**: Low and disconnected
    - 752, 932, 863
**10-2 High Paired**: Paired number cards
    - 882, 443, 995
**Top Pair Good Kicker+ (TPGK+)**: You have Top pair with a good kicker or better
**Semi-Bluffs**: You have a draw such as a gutshot or straight draw or flush draw
**Middling Showdown Value (SDV)**: You have top pair with a bad kicker or middle or bottom pair
**Trash**: No draw and no pair
**Flush Draw Blocker**: Offsuit hand containing one card that blocks and existing flush draw

</details>

<details>
<summary><strong>SRP IP PRF</strong></summary>

On the flop, we assume opponent checks to us. I will look into how we deal against a donk later. But here we are either betting or checking. 
    - Betting hands: Any # (1,2,3) broadway flop (not including wheel boards), T9 High Boards also cbet, Disconnected boards also bet
    - Checking hands: Wheel board, Monotone board, Low connected board

We are essentially betting the vast majority of our range.

On the turn, we want to check back our middling SDV and trash and barrel our TPTK+ and semi-bluffs.  
Note that having TPTK late position is much stronger than TPTK EP. This means that late position having top pair second or even third kicker is considered very strong and can bet for value.  
Yes, bet all of your draws always on the turn. Note that a pair plus flush draw is middling SDV and not a semi bluff.  
How do we know when to barrel with some trash? You want a hand that blocks flush draws (like an Ace) and hands that unblock backdoor flushes. For instance if there is one club on the flop, you want to not hold any club in your hand. So a hand like AXs with no suit connection is a better choice. We barrel with trash more often EP than MP because we have much more natural draws as MP than as EP. 
We want to bet 125% of pot on brick turns and 75% on turns that bring a straight, flush, or paired board.

</details>

<details>
<summary><strong>SRP OOP PFR</strong></summary>

Unless it is BvB, we are going to be checking everything on the flop. Facing a stab, the flop texture and bet sizing dictates our calling, folding, and raising (C,F,R) frequencies. Typically, larger flop bets are underbluffed we should lay our hand down more often. 
- Low Disconnected: 
    - TPTK+ mix between XC/XR 50/50. 
    - BDFD with two overs and strong draws play agressively XR 75%
    - Medium SDV lean towards XC 75%
    - Fold air most of the time. Can consider calling with Ace.
- Low Connected:
    - This is a terrible flop for our range. Mainly we want to XC everything. XR open enders, vulnerable overpairs, and sets. 
- Ace High Disconnected:
    - This plays much differently from low disconnected as you do not have overpairs that need protection. 
    - Turn middling SDV that XC into a bluff. For example A84 with K8 we would XR bluff. When villian stabs on this board, he is usually just betting his ace or better so we are bluff catching his cbet.
    - TPTK+ XR 75%
    - BDFD/Strong Draws: XC 50%, XR 50%
    - Fold all air
- Single Broadway: Our range advantage so we can pressure villian's small stabs.
    - TPTK+ XC/XR 50/50
    - Medium SDV mainly XC 80%
    - Strong draws XC 75%. Raise your really really good ones the drier the board.
    - BDFD: XC/XR 50/50.
- Double Broadway: Mostly XC with our entire range here XC 90%
- Triple Broadway: Same as Double Broadway XC 90%+
- Monotone: XC 100% on everything except for air, which we fold. 

</details>

<details>
<summary><strong>SRP OOP PFC</strong></summary>

Players usually overfold facing a cbet and don't raise often enough. Note that we want to fold more against earlier positions.
- Low Disconnected: a lot of XR on low disconnected boards.
    - TPTK+ XR pure. 
    - BDFD with two overs and strong draws play agressively XR 75%. BDFD with a straight draw blocker always raises.
    - Medium SDV lean towards XC 75%. XR TPWK.
    - Fold air most of the time. Can consider calling with Ace.
- Low Connected: *Excellent* board for us. 
    - XR 75% on every TPTK, BDFD, Strong draw hand
    - Middle SDV call 100%
    - Air folds 75% unless two overs
- Ace High Disconnected: Polar raise board
    - TPTK+ and semi bluffs XC/XR 25/75. Semi bluffs include open enders, gutshots, flush draws. Raising draws more on rainbow boards.
    - Middling SDV XC 90%
    - BDFD & Air XF close to 100%
- Single Broadway: 
    - TPTK+ and strong draws XC/XR 25/75. Fastplay good hands. Heavily favor BDFD + straight equity. If unsure go for raise.
    - Medium SDV call pure
    - Air fold pure
- Double Broadway: Play defensively as not good for our range.
    - TPTK+ XR/XC 75/25
    - Medium SDV call 90%. Bottom pair raises a bit on rainbow.
    - Strong Draws XC/XR 75/25. 
    - Air XF  
- Triple Broadway: Mostly XC with our entire range here XC 90%
- Monotone: XC 100% on everything except for air, which we fold. 

</details>

<details>
<summary><strong>SRP IP PRC</strong></summary>

Punish opponent cbets aggressively. Stab often, bluff often.
- Low Disconnected:
- Low Connected: 
- Ace High Disconnected: 
- Single Broadway: 
- Double Broadway: 
- Triple Broadway:
- Monotone: XC 100% on everything except for air, which we fold. 


</details>