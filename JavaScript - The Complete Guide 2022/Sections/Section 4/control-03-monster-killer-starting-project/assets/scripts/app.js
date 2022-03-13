const ATTACK_VALUE = 10; //caps lock indicates its a global variable
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER__STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Maximum life for you and the monster", "100");
//prompt function returns the value the user entered
//it returns a string

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
    //add a new property dynamically which you can do in JS with the dot notation if you access a property that does not exist yet
  } else if (event === LOG_EVENT_PLAYER__STRONG_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but the bonus life saved you!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have a draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    //this means someone lost/won or there was a draw
    reset();
  }
}

function attackMonster(attackMode) {
  const maxDamage =
    attackMode === MODE_ATTTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    attackMode === MODE_ATTTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER__STRONG_ATTACK;
  // if (attackMode === MODE_ATTTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER__STRONG_ATTACK
  // }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  //"Handler" to indicate its attacked to an event handler
  attackMonster(MODE_ATTTACK);
}

function strongAttackHandler() {
  //"Handler" to indicate its attacked to an event handler
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    //if we apply HEAL_VALUE we would at least go up to initial health - maybe higher
    alert("You can't heal to more than max your initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
    //we heal player back to initial health but not above that
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
