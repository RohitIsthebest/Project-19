var gameState = "play"

var yard,yardimg
var jerry,jerryanimation

var tom,tomimg

var jerrytom,jerrytomimg

var flowersgroup,flowerimg,flowerimg1,obstacle,flower2

var fireimg

var restart,restartimg

var invisibleGround,invisibleGround2



function preload(){
    yardimg = loadImage("yard.png")

    jerryanimation = loadAnimation("startrunjerry.png","jerrymidrun.png","jerrysuperrun.png")
    tomimg = loadImage("tomrun.png")

    flowerimg = loadImage("flower.png")
    flowerimg1 = loadImage("flowerss.png")

    fireimg = loadImage("fir.png")

    jerrytomimg = loadImage("tomcatchjerry.png")

    restartimg = loadImage("restart.png")


}


function setup(){
    createCanvas(windowWidth,windowHeight)
  

    yard = createSprite(200,200)
    yard.addImage("yard",yardimg)
    yard.velocityX = -4

    jerry = createSprite(600,windowHeight - 100)
    jerry.addAnimation("run",jerryanimation)
    jerry.scale = 0.2
    jerry.setCollider("rectangle",0,0,600,600)

    tom = createSprite(150,windowHeight - 120)
    tom.addImage("tomrun",tomimg)
    tom.scale = 0.2

    restart = createSprite(800,windowHeight - 500)
    restart.addImage(restartimg)
    restart.scale = 0.1

    
    jerrytom = createSprite(700,windowHeight - 150)
    jerrytom.addImage("over",jerrytomimg)
    jerrytom.scale = 0.5

 

    invisibleGround = createSprite(800,windowHeight - 30,windowWidth,10)
    invisibleGround.visible = false

    invisibleGround2 = createSprite(800,300,windowWidth,10)
    invisibleGround2.visible = false
    
    flowersgroup = new Group()


}

function draw(){
    background(11)
   

    if(gameState == "play"){
        if(keyDown("space")){
            jerry.velocityY = -15
        }
    
        jerry.velocityY = jerry.velocityY + 0.5

        restart.visible = false
        jerrytom.visible = false
    
        yard.visible = true
        tom.visible = true
        jerry.visible = true


        if(yard.x < 0 ){
            yard.x = width/4;
          }
          spawnobstacles()
          spawnotherflower()

          if(jerry.isTouching(flowersgroup)){
              gameState = "end"
          }

       
        
    }

    if(gameState == "end"){

        fill("yellow")
        stroke("yellow")
        textSize(40)
        text("Game Over",700,windowHeight - 400)
        

        restart.visible = true
        jerrytom.visible = true

   
        yard.visible = false
        tom.visible = false
        jerry.visible = false

       
        flowersgroup.destroyEach()
        

      

    }

    if(mousePressedOver(restart)){
        console.log("over")
        reset()
    }

        jerry.collide(invisibleGround2)
        jerry.collide(invisibleGround)

   drawSprites()
}

function spawnobstacles(){
    if(frameCount % 450 == 0){
        obstacle = createSprite(windowWidth - 1,windowHeight - 100)
        obstacle.lifetime = 1000
        obstacle.scale = 0.3
        obstacle.velocityX = -4
        tom.depth = obstacle.depth + 1

        var rand = Math.round(random(1,2))
        switch(rand){
            case 1 : obstacle.addImage("flower",flowerimg)
            break
            case 2 : obstacle.addImage("fire",fireimg)
            break
            default : break
        }


        flowersgroup.add(obstacle)

    }
}


function spawnotherflower(){
    if(frameCount % 750 == 0){
        flower2 = createSprite(windowWidth - 1,windowHeight - 120)
        flower2.addImage("flower1",flowerimg1)
        flower2.lifetime = 1000
        flower2.scale = 0.2
        flower2.velocityX = -4
        tom.depth = flower2.depth + 1
        
        flowersgroup.add(flower2)
     
    }
}

function reset(){
    gameState = "play"
    restart.visible = false
    jerrytom.visible = false
    yard.visible = true
    tom.visible = true
    jerry.visible = true

}