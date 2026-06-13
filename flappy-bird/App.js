import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BIRD_SIZE = 40;
const GRAVITY = 2;
const JUMP_FORCE = -12;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const PIPE_SPEED = 3;
const PIPE_SPAWN_INTERVAL = 2000;

function Bird({ y }) {
  return (
    <Animated.View
      style={[
        styles.bird,
        { transform: [{ translateY: y }] },
      ]}
    >
      <Text style={styles.birdEmoji}>🐦</Text>
    </Animated.View>
  );
}

function Pipe({ x, topHeight }) {
  const bottomY = topHeight + PIPE_GAP;
  const bottomHeight = SCREEN_HEIGHT - bottomY;

  return (
    <>
      {/* Top pipe */}
      <View
        style={[
          styles.pipe,
          {
            left: x,
            top: 0,
            height: topHeight,
          },
        ]}
      >
        <View style={styles.pipeEnd} />
      </View>
      {/* Bottom pipe */}
      <View
        style={[
          styles.pipe,
          {
            left: x,
            top: bottomY,
            height: bottomHeight,
          },
        ]}
      >
        <View style={[styles.pipeEnd, { position: 'absolute', top: 0 }]} />
      </View>
    </>
  );
}

export default function App() {
  const [gameState, setGameState] = useState('idle'); // idle | playing | gameover
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [birdY, setBirdY] = useState(SCREEN_HEIGHT / 2);
  const [pipes, setPipes] = useState([]);
  const birdVelocity = useRef(0);
  const animationFrame = useRef(null);
  const pipeTimer = useRef(null);
  const scoredPipes = useRef(new Set());

  const resetGame = () => {
    setBirdY(SCREEN_HEIGHT / 2);
    setPipes([]);
    setScore(0);
    birdVelocity.current = 0;
    scoredPipes.current = new Set();
  };

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const jump = () => {
    if (gameState === 'idle') {
      startGame();
      birdVelocity.current = JUMP_FORCE;
    } else if (gameState === 'playing') {
      birdVelocity.current = JUMP_FORCE;
    } else if (gameState === 'gameover') {
      startGame();
    }
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (pipeTimer.current) clearInterval(pipeTimer.current);
      return;
    }

    // Spawn pipes
    pipeTimer.current = setInterval(() => {
      const minHeight = 80;
      const maxHeight = SCREEN_HEIGHT - PIPE_GAP - 80;
      const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
      const id = Date.now();

      setPipes((prev) => [
        ...prev,
        { x: SCREEN_WIDTH, topHeight, id, scored: false },
      ]);
    }, PIPE_SPAWN_INTERVAL);

    const gameLoop = () => {
      // Update bird
      birdVelocity.current += GRAVITY;
      setBirdY((prev) => {
        const newY = prev + birdVelocity.current;

        // Check floor/ceiling collision
        if (newY <= 0 || newY + BIRD_SIZE >= SCREEN_HEIGHT) {
          setGameState('gameover');
          setScore((s) => {
            setBestScore((b) => Math.max(b, s));
            return s;
          });
          return prev;
        }
        return newY;
      });

      // Update pipes
      setPipes((prev) => {
        const birdLeft = SCREEN_WIDTH / 2 - BIRD_SIZE / 2;
        const birdRight = birdLeft + BIRD_SIZE;

        const updated = prev
          .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
          .filter((pipe) => pipe.x + PIPE_WIDTH > -10);

        // Check collisions and scoring
        for (const pipe of updated) {
          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + PIPE_WIDTH;

          // Score
          if (pipeRight < birdLeft && !scoredPipes.current.has(pipe.id)) {
            scoredPipes.current.add(pipe.id);
            setScore((s) => s + 1);
          }

          // Collision
          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            setBirdY((currentBirdY) => {
              if (
                currentBirdY < pipe.topHeight ||
                currentBirdY + BIRD_SIZE > pipe.topHeight + PIPE_GAP
              ) {
                setGameState('gameover');
                setScore((s) => {
                  setBestScore((b) => Math.max(b, s));
                  return s;
                });
              }
              return currentBirdY;
            });
          }
        }

        return updated;
      });

      animationFrame.current = requestAnimationFrame(gameLoop);
    };

    animationFrame.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      if (pipeTimer.current) clearInterval(pipeTimer.current);
    };
  }, [gameState]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <StatusBar hidden />

        {/* Background gradient effect */}
        <View style={styles.sky} />
        <View style={styles.ground} />

        {/* Pipes */}
        {pipes.map((pipe) => (
          <Pipe key={pipe.id} x={pipe.x} topHeight={pipe.topHeight} />
        ))}

        {/* Bird */}
        <View
          style={[
            styles.birdContainer,
            { top: birdY },
          ]}
        >
          <Text style={styles.birdEmoji}>🐦</Text>
        </View>

        {/* Score */}
        {gameState === 'playing' && (
          <Text style={styles.score}>{score}</Text>
        )}

        {/* Start screen */}
        {gameState === 'idle' && (
          <View style={styles.overlay}>
            <Text style={styles.title}>Flappy Bird</Text>
            <Text style={styles.subtitle}>Toca para jugar</Text>
          </View>
        )}

        {/* Game over screen */}
        {gameState === 'gameover' && (
          <View style={styles.overlay}>
            <Text style={styles.gameOverTitle}>Game Over</Text>
            <Text style={styles.finalScore}>Puntaje: {score}</Text>
            <Text style={styles.bestScore}>Mejor: {bestScore}</Text>
            <Text style={styles.restart}>Toca para reiniciar</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4EC0CA',
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: '#4EC0CA',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.2,
    backgroundColor: '#DED895',
  },
  birdContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - BIRD_SIZE / 2,
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birdEmoji: {
    fontSize: 32,
  },
  pipe: {
    position: 'absolute',
    width: PIPE_WIDTH,
    backgroundColor: '#73BF2E',
    borderColor: '#5A9A1F',
    borderWidth: 2,
  },
  pipeEnd: {
    position: 'absolute',
    bottom: 0,
    left: -4,
    right: -4,
    height: 24,
    backgroundColor: '#73BF2E',
    borderColor: '#5A9A1F',
    borderWidth: 2,
    borderRadius: 4,
  },
  score: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameOverTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4444',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bestScore: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  restart: {
    fontSize: 20,
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
