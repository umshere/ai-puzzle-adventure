import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

interface GameCanvasProps {
  levelData: {
    levelId: string;
    layout: number[][];
    obstacles?: { x: number; y: number; type: string }[];
    difficultyRating: number;
  };
  onScoreUpdate?: (score: number) => void;
  onGameComplete?: () => void;
}

interface ParticleEmitterConfig {
  lifespan: { min: number; max: number };
  speed: { min: number; max: number };
  angle: { min: number; max: number };
  rotate: { min: number; max: number };
  scale: { start: number; end: number };
  alpha: { start: number; end: number };
  blendMode: number;
  quantity: number;
  tint?: number[];
}

type CollisionCallback = (
  obj1: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile,
  obj2: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile
) => void;

const createParticleEffect = (scene: Phaser.Scene, options: {
  x: number;
  y: number;
  particleCount?: number;
  lifespan?: { min: number; max: number };
  speed?: { min: number; max: number };
  scale?: { start: number; end: number };
  tint?: number[];
}) => {
  const config: ParticleEmitterConfig = {
    lifespan: options.lifespan || { min: 300, max: 500 },
    speed: options.speed || { min: -100, max: 100 },
    angle: { min: 0, max: 360 },
    rotate: { min: 0, max: 360 },
    scale: options.scale || { start: 0.5, end: 0 },
    alpha: { start: 1, end: 0 },
    blendMode: Phaser.BlendModes.ADD,
    quantity: options.particleCount || 10,
    tint: options.tint
  };

  try {
    return scene.add.particles(options.x, options.y, 'pixel', config);
  } catch (error) {
    console.error('Failed to create particle effect:', error);
    return null;
  }
};

const GameCanvas: React.FC<GameCanvasProps> = ({
  levelData,
  onScoreUpdate,
  onGameComplete,
}) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const gameRef = useRef<Phaser.Game | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;

    class GameScene extends Phaser.Scene {
      private player!: Phaser.Physics.Arcade.Sprite;
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      private score: number = 0;
      private scoreText!: Phaser.GameObjects.Text;
      private tiles!: Phaser.Physics.Arcade.StaticGroup;
      private obstacles!: Phaser.Physics.Arcade.Group;
      private collectibles!: Phaser.Physics.Arcade.Group;
      private goal!: Phaser.GameObjects.Rectangle;
      private levelText!: Phaser.GameObjects.Text;
      private difficultyText!: Phaser.GameObjects.Text;

      constructor() {
        super({ key: 'GameScene' });
      }

      preload(): void {
        // Create a 1x1 pixel texture for particles
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, 1, 1);
        graphics.generateTexture('pixel', 1, 1);
        graphics.destroy();
      }

      create(): void {
        // Set up world
        const { width, height } = this.cameras.main;
        
        // Create gradient background
        const gradient = this.add.graphics();
        gradient.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x16213e, 0x16213e, 1);
        gradient.fillRect(0, 0, width, height);
        
        // Initialize physics groups
        this.tiles = this.physics.add.staticGroup();
        this.obstacles = this.physics.add.group();
        this.collectibles = this.physics.add.group();
        
        // Create player
        this.player = this.physics.add.sprite(width / 2, height / 2, 'pixel');
        this.player.setDisplaySize(32, 32);
        this.player.setCircle(16);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);
        this.player.setTint(0x3b82f6);
        
        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Initialize HUD elements
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
          fontSize: '24px',
          color: '#ffffff',
          fontFamily: '"Inter", sans-serif',
          backgroundColor: '#00000066',
          padding: { x: 12, y: 8 },
        }).setScrollFactor(0);
        
        this.levelText = this.add.text(width / 2, 20, `Level ${levelData.levelId}`, {
          fontSize: '20px',
          color: '#ffffff',
          fontFamily: '"Inter", sans-serif',
          backgroundColor: '#00000066',
          padding: { x: 12, y: 8 },
        }).setOrigin(0.5, 0).setScrollFactor(0);
        
        this.difficultyText = this.add.text(width - 20, 20, `Difficulty: ${levelData.difficultyRating}/10`, {
          fontSize: '18px',
          color: '#ffffff',
          fontFamily: '"Inter", sans-serif',
          backgroundColor: '#00000066',
          padding: { x: 12, y: 8 },
        }).setOrigin(1, 0).setScrollFactor(0);
        
        // Create goal
        this.goal = this.add.rectangle(width - 50, height - 50, 32, 32, 0x10b981);
        
        // Set up level based on levelData
        const tileSize = 32;
        const offsetX = (width - tileSize * levelData.layout[0].length) / 2;
        const offsetY = (height - tileSize * levelData.layout.length) / 2;
        
        // Create walls based on layout
        for (let y = 0; y < levelData.layout.length; y++) {
          for (let x = 0; x < levelData.layout[y].length; x++) {
            if (levelData.layout[y][x] === 1) {
              const tile = this.add.rectangle(
                offsetX + x * tileSize + tileSize / 2,
                offsetY + y * tileSize + tileSize / 2,
                tileSize - 2,
                tileSize - 2,
                0x4f46e5
              );
              this.tiles.add(tile);
            }
          }
        }
        
        // Add collectibles
        for (let i = 0; i < 5; i++) {
          let x, y;
          do {
            x = Math.floor(Math.random() * levelData.layout[0].length);
            y = Math.floor(Math.random() * levelData.layout.length);
          } while (levelData.layout[y][x] === 1);
          
          const collectible = this.add.circle(
            offsetX + x * tileSize + tileSize / 2,
            offsetY + y * tileSize + tileSize / 2,
            tileSize / 6,
            0xf59e0b
          );
          
          this.collectibles.add(collectible);
          
          // Add pulse animation
          this.tweens.add({
            targets: collectible,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
        
        // Add obstacles if available
        if (levelData.obstacles) {
          levelData.obstacles.forEach(obstacle => {
            const obstacleObj = this.add.rectangle(
              offsetX + obstacle.x * tileSize + tileSize / 2,
              offsetY + obstacle.y * tileSize + tileSize / 2,
              tileSize / 2,
              tileSize / 2,
              0xef4444
            );
            
            this.obstacles.add(obstacleObj);
            
            // Warning pulse animation
            this.tweens.add({
              targets: obstacleObj,
              scaleX: 1.2,
              scaleY: 1.2,
              duration: 500,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut'
            });
          });
        }
        
        // Set up collisions and overlaps
        this.physics.add.collider(this.player, this.tiles);
        
        this.physics.add.overlap(
          this.player,
          this.collectibles,
          this.collectItem,
          undefined,
          this
        );
        
        this.physics.add.overlap(
          this.player,
          this.obstacles,
          this.hitObstacle,
          undefined,
          this
        );
        
        this.physics.add.overlap(
          this.player,
          this.goal,
          this.reachGoal,
          undefined,
          this
        );
      }

      collectItem: CollisionCallback = (
        _: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile,
        collectible: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Tilemaps.Tile
      ) => {
        const collectedItem = collectible as Phaser.GameObjects.Shape;
        
        const particles = createParticleEffect(this, {
          x: collectedItem.x,
          y: collectedItem.y,
          particleCount: 10,
          tint: [0xf59e0b]
        });
        
        collectedItem.destroy();
        this.score += 100;
        this.scoreText.setText(`Score: ${this.score}`);
        
        if (onScoreUpdate) {
          onScoreUpdate(this.score);
        }

        if (particles) {
          this.time.delayedCall(500, () => {
            particles.destroy();
          });
        }
      }

      hitObstacle: CollisionCallback = () => {
        this.score = Math.max(0, this.score - 50);
        this.scoreText.setText(`Score: ${this.score}`);
        
        this.cameras.main.shake(200, 0.005);
        
        // Player hit effect
        this.tweens.add({
          targets: this.player,
          alpha: 0.5,
          duration: 100,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            this.player.setAlpha(1);
          }
        });
        
        if (onScoreUpdate) {
          onScoreUpdate(this.score);
        }
      }

      reachGoal: CollisionCallback = () => {
        this.score += 500;
        this.scoreText.setText(`Score: ${this.score}`);
        
        const { width, height } = this.cameras.main;
        
        // Create celebration particles
        const particles = createParticleEffect(this, {
          x: width / 2,
          y: height / 2,
          particleCount: 20,
          lifespan: { min: 1000, max: 2000 },
          speed: { min: -100, max: 100 },
          tint: [0x4f46e5, 0x10b981, 0x3b82f6]
        });
        
        // Show completion message
        const completionContainer = this.add.container(width / 2, height / 2);
        
        const completionBg = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8)
          .setOrigin(0.5);
        
        const completionText = this.add.text(0, -40, 'Level Complete!', {
          fontSize: '32px',
          color: '#ffffff',
          fontFamily: '"Inter", sans-serif',
        }).setOrigin(0.5);
        
        const scoreText = this.add.text(0, 20, `Final Score: ${this.score}`, {
          fontSize: '24px',
          color: '#ffffff',
          fontFamily: '"Inter", sans-serif',
        }).setOrigin(0.5);
        
        completionContainer.add([completionBg, completionText, scoreText]);
        completionContainer.setAlpha(0);
        completionContainer.setScale(0.8);
        
        // Animate completion message
        this.tweens.add({
          targets: completionContainer,
          alpha: 1,
          scale: 1,
          duration: 500,
          ease: 'Back.easeOut'
        });
        
        // Disable player movement
        this.player.setVelocity(0, 0);
        this.player.setImmovable(true);
        
        if (onGameComplete) {
          onGameComplete();
        }
        
        if (onScoreUpdate) {
          onScoreUpdate(this.score);
        }

        if (particles) {
          this.time.delayedCall(2000, () => {
            particles.destroy();
          });
        }
      }

      update(): void {
        if (!this.cursors || !this.player) return;
        
        const speed = 200;
        const targetX = this.cursors.left.isDown ? -speed : this.cursors.right.isDown ? speed : 0;
        const targetY = this.cursors.up.isDown ? -speed : this.cursors.down.isDown ? speed : 0;
        
        this.player.setVelocityX(targetX);
        this.player.setVelocityY(targetY);
        
        if (targetX !== 0 || targetY !== 0) {
          const angle = Math.atan2(targetY, targetX);
          this.player.setRotation(angle);
        }
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: canvasRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      scene: GameScene,
      backgroundColor: '#1a1a2e',
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [levelData, onScoreUpdate, onGameComplete]);

  return (
    <div className="relative">
      <div 
        ref={canvasRef} 
        className="game-container bg-gray-900 rounded-lg overflow-hidden shadow-xl"
        style={{ height: '600px', width: '100%' }}
      />
      
      {showTutorial && (
        <div className="tutorial-overlay" onClick={() => setShowTutorial(false)}>
          <div className="tutorial-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            
            <div className="tutorial-step">
              <p className="mb-2">🎮 Use <strong>arrow keys</strong> to move your character</p>
            </div>
            
            <div className="tutorial-step">
              <p className="mb-2">💫 Collect yellow orbs for points</p>
            </div>
            
            <div className="tutorial-step">
              <p className="mb-2">⚠️ Avoid red obstacles</p>
            </div>
            
            <div className="tutorial-step">
              <p className="mb-2">🎯 Reach the green goal to complete the level</p>
            </div>
            
            <button
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setShowTutorial(false)}
            >
              Start Playing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
