const texto = document.getElementById("texto")

function speak(mensagem) {
    const fala = new SpeechSynthesisUtterance(mensagem)
    fala.lang = "pt-BR"
    window.speechSynthesis.speak(fala)
}

function executarComando(comando) {
    if (comando.includes("olá sofia") || comando.includes("oi") || comando.includes("olá")) {
        speak("olá meu nome é sofia, sua assistente virtual, como posso ajudar?")
    } else if (comando.includes("horário") || comando.includes("que horas são")) {
        const datanow = new Date();
        const hora = datanow.toLocaleTimeString("pt-BR");
        speak("agora são exatamente" + hora)

    } else if (comando.includes("youtube") || comando.includes("abra o youtube") || comando.includes("yt")) {

        speak("abrindo o youtube")
        window.open("https://www.youtube.com", "_blank")

    } else if (comando.includes("instagram") || comando.includes("abra o instagram") || comando.includes("insta")) {
        speak("abrindo o instagram")
        window.open("https://www.instagram.com", "_blank")

        
    } else if (comando.includes("gmail") || comando.includes("e-mail") || comando.includes("abra o e-mail")|| comando.includes("abra o gmail")) {
        speak("abrindo o e-mail")
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")

    } else if (comando.includes("spotify") || comando.includes("abra o spotify")){
        speak("abrindo o spotify")
        window.open("spotify:", "_self")

    } else if (comando.includes("whatsapp") || comando.includes("zap") || comando.includes("zap zap")){
        speak("abrindo o Whatsapp")
        window.open("https://web.whatsapp.com", "_blank")

    } else if (comando.includes("netflix") || comando.includes("cinema") || comando.includes("pipoca")){
        speak("abrindo a Netflix")
        window.open("https://www.netflix.com/browse", "_blank")
    
    //else if (comando.includes("quais suas funções")||comando.includes("comandos")){

    }else if (comando.includes("steam") || comando.includes("jogos") || comando.includes("games")){
        speak("abrindo a Steam")
        window.open("steam:", "_self")

    }

}
function reconhecimento() {
    const voz = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    voz.lang = "pt-BR";
    voz.continuous = true;
    voz.interimResults = true;
    texto.textContent = "estou escutando atenciosamente";
    let finalTranscription = "";
    voz.onresult = (event) => {
        let tempTranscription = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const resultados = event.results[i];
            if (resultados.isFinal) {
                const comando = resultados[0].transcript.toLowerCase();
                finalTranscription += comando + " ";
                executarComando(comando)
            } else {
                tempTranscription += resultados[0].transcript

            }
        }
        texto.textContent = finalTranscription + tempTranscription
    }
    voz.onerror = (event) => {
        texto.textContent = "erro: " + event.error
    }
    voz.start()
}