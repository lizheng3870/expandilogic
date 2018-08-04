# Gaia Project





### Demo webpage for Game Map and Players 
map_players_show_on_webpage

```
how to start demo webpage
cd map_players_show_on_webpage
npm install
npm start


```

```
this is a react website to show the game map and players.
the data comes from firebase.
listen the paths of
game/[gid]/players
game/[gid]/players

even load data  or listen data change will reload webpage.

for example: current is game id 2
firebase.database().ref('game/2/mapboard');
firebase.database().ref('game/2/players');


```




### Game Logic

src/logic


### TestCase for Game Logic

src/tests

### Driver for Demo

src/driver

```
cd dist/driver
node driver.js

keep pressing enter button will demo data change on webapge

how it works?
drive saves game data to firebase by call game.saveGame()

as you can see. In driver code, Game initialize with gid = 2. like  let g = new Game(2) . that make sure driver share same firebase path with demo webpage.


```
