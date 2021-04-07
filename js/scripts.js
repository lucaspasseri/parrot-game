let numeroDeCartas = 
prompt("Bem-vindo, com quantas cartas você gostaria de jogar? O Número inserido deve ser par entre 4 e 14.");

while(!(numeroDeCartas % 2 === 0 && numeroDeCartas > 3 && numeroDeCartas < 15)){
    numeroDeCartas = 
    prompt("Bem-vindo, com quantas cartas você gostaria de jogar? O Número inserido deve ser par entre 4 e 14.");
}

