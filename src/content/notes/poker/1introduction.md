---
title: "Introduction"
tags: ["poker"]
date: "10/31/25"
category: "Poker"
---
##### What makes a winning player?
I wanted to jot down my notes and experience playing No Limit Texas Hold'em. In these notes, I'm going to assume knowledge of basic rules of the game as well as player position. I'll be sharing more so strategy and GTO knowledge.

First and foremost, if you want to win at this game, the most important thing even before sitting at the table is game selection. We want to be able to identify a table with players that are significantly softer than average. If there is no one obviously losing a lot of money, it's probably not a good game and YOU SHOULD GET OUTTA THERE.

Also, managing your emotions is the next most important thing in becoming a winning player. How is your game during a downswing? How do you feel about losing 50 buy-ins? Kings into aces 10 times in a row? On the flipside, what about when you're running good? Do you play looser, call more often, feel more entitled? Stick to a solid strategy and don't let emotion cloud your judgement. Don't take your past hands with that much weight. Emotional management requires your own self awareness and willingness to reflect.

Lastly, assuming all else is equal (soft and emotionally aware), skill and understanding the game is the final differentiating factor, which is what I will be documenting here in my notes.

DO NOT BE RESULTS ORIENTED.
##### Pick your own win-rate
Nothing in life is certain except death, taxes, and rake. A typical 200NL game rakes ~5bb/player. This means that after 100 hands, 30bb is being taken off the table. Now, ask yourself, "Who is losing 30bb per 100 hands?" This is why poker, while it is a skill game, it is more so a game of identifying bad players and taking their money. Studying does give you an edge yes, but not a 30bb/100hand edge. That's just unrealistic. Search for tables with high VPIP and low PFR stats.

##### Active and Passive Errors
Active errors are mistakes that involve you putting money in the pot such as betting raising and calling. Being too aggressive or too station-y are examples of active errors. In addition, continuation betting too often or over-bluffing the river are more specific examples of active errors.

Passive errors are mistakes caused by doing nothing too often. This includes overfolding and over checking or missing value and bluffs. Not continuation betting enough or under-bluffing the river are some specific examples.

Humans are naturally risk adverse. No one wants to lose hundreds to thousands of dollars. This is why you should try go for it more often and make more active errors than passive errors. Making an active error can lead to folds since the opponent can make a passive error. We want to force our opponents to do something. We want to hit the ball and put it in their court to see what they will do.

##### How to think like a solver
How do solvers arrive at the output it shows? Oftentimes what we humans think is flawed, and this section will shed some light on what we should be asking ourselves during the middle of a hand.  
Human logic usually follows the process of intention, action, then result. "I want to represent strength to make my opponent fold." "I want to value bet to get called." "I want to get folds from Ace High and pairs are going to call anyways so I will use this size."
However, poker isn't about the result. It is about maximizing EV. If you have value, your goal isn't to get called but rather get called with the highest EV size. A 70% pot sized bet called 50% of the time is worse than a 300% pot sized bet getting called 20% of the time. So achieved the result you want doesn't necessarily mean you're playing good. A more extreme example: is it better to be called 100% of the time value betting 1% of the pot or 10% of the time betting 500% of the pot. 
Thinking in EV is the first step. Next, we seperate the EV from value EV and bluff EV. 
For Value EV, you need to find the perfect betting size where it is not too big that villian only calls with nutted hands but not too weak where you lose value. For example, if you have 99 and villian range is 55-JJ, villian calls only 88-JJ vs 200% pot then you have 33% equity which is -EV. However, you bet 150% pot and get called with 66-JJ you have 60% equity, or 30% pot and get called with everything for 67%. Obviously, 150% pot sized bet is the best. Usually, we want our bets to have over 50% equity, and our massive value bets to be as close as 100% as possible. Equities are closer on the flop and turn, that is why most money is made on the river. On earlier street, while we are ahead and should value bet, we are not piling in large sums of money until later streets. Would you rather gamble with 80/20 or 100/0? This is why we play tight on Monotone Flops.  
What the process looks like:
1. Determine villian's range accurately.
2. What does top 30% range look like? 50%? 75%?
3. Which of these ranges has the best ratio of equity when called relative to the related bet size versus your hand?
4. Execute bet with your selected value hands and associated bluffs.
Need to start by fully understanding preflop ranges and follow it up by looking at river betting thresholds and defense thresholds versus different sizes. Get away from thinking "I want to bet x size to get called by top pair" as we completely ignore your equity when called (TPTK will have a different EWC than a set). Or "I'm going to bluff x size to fold out these hands (ignoring % of range)." Does it meet MDF? Overall, intention > action > result should be eliminated long term. Solves never start with an intention, they simply assess the reality of the situation.

##### Vocab
**Voluntary Put in Pot (VPIP)**: The frequency at which a player plays a hand preflop by putting in some chips.
**BB**: Big blind, in a 200NL game, the blinds are 1/2 so 1bb is $2.