const texto = document.getElementById("texto")

var selectVoice = null

function carregarVoz() {
    const vozes = window.speechSynthesis.getVoices();

    // Tente encontrar vozes femininas específicas em português do Brasil
    selectVoice = vozes.find((voz) =>
        voz.lang === "pt-BR" &&
        (
            voz.name.toLowerCase().includes("maria") ||
            voz.name.toLowerCase().includes("female") ||
            voz.name.toLowerCase().includes("mulher")
        )
    );

    // Fallback: qualquer voz pt-BR
    if (!selectVoice) {
        selectVoice = vozes.find((voz) => voz.lang === "pt-BR");
    }

    if (selectVoice) {
        console.log("Voz selecionada:", selectVoice.name);
    } else {
        console.log("Nenhuma voz pt-BR encontrada.");
    }
}

window.speechSynthesis.onvoiceschanged = carregarVoz
function speak(mensagem) {
    const fala = new SpeechSynthesisUtterance(mensagem)
    fala.lang = "pt-BR"
    if (selectVoice) {
        fala.voice = selectVoice
    }
    const imagem = document.getElementById("SofIA");
    imagem.classList.add("speaking");

    fala.onend = () => {
        imagem.classList.remove("speaking");
    };
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


    } else if (comando.includes("gmail") || comando.includes("e-mail") || comando.includes("abra o e-mail") || comando.includes("abra o gmail")) {
        speak("abrindo o e-mail")
        window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")

    } else if (comando.includes("spotify") || comando.includes("abra o spotify")) {
        speak("abrindo o spotify")
        window.open("spotify:", "_self")

    } else if (comando.includes("whatsapp") || comando.includes("zap") || comando.includes("zap zap")) {
        speak("abrindo o Whatsapp")
        window.open("https://web.whatsapp.com", "_blank")

    } else if (comando.includes("netflix") || comando.includes("cinema") || comando.includes("pipoca")) {
        speak("abrindo a Netflix")
        window.open("https://www.netflix.com/browse", "_blank")

    } else if (comando.includes("steam") || comando.includes("jogos") || comando.includes("games")) {
        speak("abrindo a Steam")
        window.open("steam:", "_self")

    } else if (comando.includes("quais suas funções") || comando.includes("comandos")) {
        speak("Aqui estão meus principais comandos:")
        const commandsHTML = `
        <div class="commands-box">
            <div class="commands-title">Comandos Disponíveis</div>
            <ul class="commands-list">
                <li class="command-item">"Youtube"</li>
                <li class="command-item">"Netflix"</li>
                <li class="command-item">"Steam"</li>
                <li class="command-item">"Whatsapp"</li>
                <li class="command-item">"Spotify"</li>
                <li class="command-item">"Gmail" ou "E-mail"</li>
                <li class="command-item">"Instagram"</li>
                <li class="command-item">"Horário" ou "Que horas são"</li>
                <li class="command-item">"Bandeiras" ou "Geografia"</li>
            </ul>
        </div>
    `;
        document.getElementById("description").innerHTML = commandsHTML;
    } else if (comando.includes("bandeiras") || comando.includes("IA") || comando.includes("geografia")) {
        speak("abrindo a GeografIA")
        window.open("https://lucasdevt.github.io/Bandeiras/", "_blank")
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