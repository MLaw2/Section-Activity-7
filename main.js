//our prototype scene
class scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    //global variables
    won = false;
    lose = false;

    create() {
        //ground
        let ground = this.add.rectangle(100,700, 1000, 100, '0x000000');
        this.physics.add.existing(ground);
        ground.body.setCollideWorldBounds(true);
        ground.body.gravity.y = 0;
        
        // victory condition
        let victory = this.add.rectangle(700, 100, 100, 800, "0x000000");
        this.physics.add.existing(victory);
        victory.body.setCollideWorldBounds(true);
        // ground.body.setGravity(0,0);
        victory.body.allowGravity = false;

        // player
        let player = this.add.rectangle(100,500,100,300,'0xff0000');
        player.setScale(0.2);
        this.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);
        player.body.setVelocityX(50);

        //player input: just a jump
        this.input.keyboard.on("keydown", (event) => {
            switch (event.key) {
                /*case "a":
                    player.setVelocityX(-250);
                    break;
                case "d":
                    player.setVelocityX(250);
                    break;*/
                case "w": //jump
                    console.log("any input?");
                    if (player.body.touching.down) {
                        console.log("w");
                        player.body.setVelocityY(-230);
                    }
            }
        })

        // slug
        let slugs = this.physics.add.group();
        slugs.add(this.add.rectangle(700,500,50,50,'0xffff00'));
        slugs.add(this.add.rectangle(400,500,50,50,'0xffff00'));

        slugs.getChildren().forEach( (slug)=> {
            slug.body.setVelocityX(-50); 
            slug.body.gravity.y = 0;
            this.physics.add.collider(slug, ground);

        });
        
        this.physics.add.overlap(player, slugs, ()=>{ // checks collision with slug
            if (player.body.touching.down) {
                console.log("you lose!");
            }
            
        });
        
        // player collider
        this.physics.add.collider(player, ground);

        this.physics.add.overlap(player, victory, ()=>{
            if(player.body.touching.down){
                console.log("victory!");
            }
        })


        // victory section
        
    }

    update() {
    }

}

//create game object
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        debug: true,
      }
    },
    scene: [scene1]
  };

let game = new Phaser.Game(config);