var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["373fe074-c3d6-4c77-8452-392e26bd2148","d636ab60-f46c-4cf9-8f6a-c55b006bec70"],"propsByKey":{"373fe074-c3d6-4c77-8452-392e26bd2148":{"name":"dardo","sourceUrl":null,"frameSize":{"x":393,"y":162},"frameCount":1,"looping":true,"frameDelay":12,"version":"DONUvTG_3HuZb47jQAWGIaZ9cfqF7OZg","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":162},"rootRelativePath":"assets/373fe074-c3d6-4c77-8452-392e26bd2148.png"},"d636ab60-f46c-4cf9-8f6a-c55b006bec70":{"name":"raquete","sourceUrl":"assets/api/v1/animation-library/gamelab/KrCldlEIuzS6NvxFpNF8_84VvtWHa8Ye/category_video_games/ground_stone_broken.png","frameSize":{"x":380,"y":94},"frameCount":1,"looping":true,"frameDelay":2,"version":"KrCldlEIuzS6NvxFpNF8_84VvtWHa8Ye","categories":["video_games"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":380,"y":94},"rootRelativePath":"assets/api/v1/animation-library/gamelab/KrCldlEIuzS6NvxFpNF8_84VvtWHa8Ye/category_video_games/ground_stone_broken.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//Criação de variável de pontuação
var pontos = 0;

//Criar variável para estado do jogo
var estado = "início"; 

//Criação da primeira linha de tijolos(caixas)
var box1 = createSprite(25, 75, 50, 50);
box1.shapeColor="red";
var box2 = createSprite(75, 75, 50, 50);
box2.shapeColor="orange";
var box3 = createSprite(125, 75, 50, 50);
box3.shapeColor="red";
var box4 = createSprite(175, 75, 50, 50);
box4.shapeColor="orange";
var box5 = createSprite(225, 75, 50, 50);
box5.shapeColor="red";
var box6 = createSprite(275, 75, 50, 50);
box6.shapeColor="orange";
var box7 = createSprite(325, 75, 50, 50);
box7.shapeColor="red";
var box8 = createSprite(375, 75, 50, 50);
box8.shapeColor="orange";

//Criação da segunda linha de tijolos(caixas)
var box9 = createSprite(25, 125, 50, 50);
box9.shapeColor="orange";
var box10 = createSprite(75, 125, 50, 50);
box10.shapeColor="red";
var box11 = createSprite(125, 125, 50, 50);
box11.shapeColor="orange";
var box12 = createSprite(175, 125, 50, 50);
box12.shapeColor="red";
var box13 = createSprite(225,125, 50, 50);
box13.shapeColor="orange";
var box14 = createSprite(275, 125, 50, 50);
box14.shapeColor="red";
var box15 = createSprite(325, 125, 50, 50);
box15.shapeColor="orange";
var box16 = createSprite(375, 125, 50, 50);
box16.shapeColor="red";

//Criação e configuração da nossa bola (dardo)
var bola = createSprite(200,200,16,16);
bola.setAnimation("dardo");
bola.scale = 0.15;
bola.rotation = 270;

//Criação e configuração da nossa raquete
var raquete = createSprite(200,375,90,10);
raquete.setAnimation("raquete");
raquete.scale = 0.35;

//Criação dos sprites de borda
createEdgeSprites();

//Função que vê se a caixa será destruída
function destruir(caixa){
  if(bola.bounceOff(caixa)){
    caixa.destroy();
    pontos += 5;
  }
}


function draw() {
  background("cyan"); //Define o fundo como ciano
  
  //Faz o jogo iniciar caso o jogador aperte a tecla "enter"
  if(keyDown("enter")){
    if(estado==="início"){
      bola.velocityX = 5;
      bola.velocityY = 6;
      estado = "jogando";
    }
  }
  
  //Faz a IA da raquete
  raquete.x = bola.x;
  
  //Faz a bolinha bater e voltar nas paredes  e na raquete.
  bola.bounceOff(topEdge);
  bola.bounceOff(rightEdge);
  bola.bounceOff(leftEdge);
  bola.bounceOff(raquete);
  
  //Ve se a bolinha bateu na caixa
  destruir(box1);
  destruir(box2);
  destruir(box3);
  destruir(box4);
  destruir(box5);
  destruir(box6);
  destruir(box7);
  destruir(box8);
  destruir(box9);
  destruir(box10);
  destruir(box11);
  destruir(box12);
  destruir(box13);
  destruir(box14);
  destruir(box15);
  destruir(box16);
  
  //Ve se ganhou ou perdeu
  sera_que_perdeu();
  sera_que_ganhou();
  
  //Desenha os sprites
  drawSprites();
  
  //Escrever a pontuação
  textSize(35);
  textAlign(CENTER, CENTER);
  fill("black");
  textFont("Comic Sans MS");
  text("Points: "+pontos, 100, 24);
  
  if(estado==="perdeu"){
    perdeu_otario();
  }else if(estado==="ganhou"){
    ganhou_esperto();
  }
  
  
}


// Funçao para ver se o dardo caiu
function sera_que_perdeu(){
  if(bola.y>400){
    estado = "perdeu";
  }
}

//Função para ver se player ganhou
function sera_que_ganhou(){
  if(pontos===80){
    estado = "ganhou";
  }
}

//Caso perdeu, o que vai acontecer?
function perdeu_otario(){
  background("black");
  textSize(30);
  fill("white");
  text("VOCÊ PERDEU, PERDEDOR", 200, 200);
  textSize(20);
  text("Aperte space para reiniciar", 200,300);
}

//Caso ganhou, o que vai acontecer?
function ganhou_esperto(){
  background("gold");
  fill("green");
  text("CONGRATULATIONS", 200,200);
  textSize(20);
  text("Aperte space para reiniciar", 200,300);
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
