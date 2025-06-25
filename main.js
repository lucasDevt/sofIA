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
        document.querySelector('.carrossel-container').style.display = 'none';
        document.querySelector('.comandos').style.display = 'flex';
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

    } else if (comando.includes("promoção") || comando.includes("descontos") || comando.includes("preços")) {
        speak("estes são os jogos em promoção no momento")
        carregarJogos()
        document.querySelector('.comandos').style.display = 'none';

    } else if (comando.includes("quem é ")
        || comando.includes("o que é")
        || comando.includes("pesquisar")
        || comando.includes("pesquise")
        || comando.includes("explique sobre")
        || comando.includes("busque sobre")
        || comando.includes("pesquise sobre")) {
        let termo = comando
            .replace("quem é", "")
            .replace("o que é", "")
            .replace("pesquisar", "")
            .replace("pesquise", "")
            .replace("explique sobre", "")
            .replace("busque sobre", "")
            .replace("pesquise sobre", "")
            .trim()
        if(termo.length>0){
            speak("pesquisando por:"+termo)
            buscarWikipedia(termo)
        }else {
            speak("por favor me diga o que gostaria que eu pesquisasse")
        }    
    }

}

async function buscarWikipedia(pergunta) {
    const termoPesquisa = pergunta
        .toLowerCase()
        .replace("quem é", "")
        .replace("o que é", "")
        .replace("pesquisar", "")
        .replace("procure sobre", "")
        .replace("explique", "")
        .trim();

    if (!termoPesquisa) {
        speak("Não entendi o que deseja pesquisar.");
        return;
    }

    
    const buscaUrl = `https://pt.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(termoPesquisa)}&limit=1&namespace=0&format=json&origin=*`;

    try {
        const buscaResposta = await fetch(buscaUrl);
        const buscaData = await buscaResposta.json();

        const tituloEncontrado = buscaData[1][0]; 

        if (!tituloEncontrado) {
            speak("Não encontrei resultados para " + termoPesquisa);
            return;
        }

        
        const resumoUrl = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(tituloEncontrado)}`;
        const resumoResposta = await fetch(resumoUrl);
        const resumoData = await resumoResposta.json();

        if (resumoData.extract) {
            speak(resumoData.extract);
        } else {
            speak("Não consegui encontrar um resumo sobre " + tituloEncontrado);
        }
    } catch (error) {
        speak("Houve um erro ao buscar na Wikipedia.");
        console.error("Erro Wikipedia:", error);
    }
}

async function carregarJogos() {
    document.querySelector('.carrossel-container').style.display = 'flex';
    const url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&onSale=1';
    try {
        const resposta = await fetch(url);
        const jogos = await resposta.json();
        const steam = document.getElementById("carrosselJogos");
        console.log(jogos)
        jogos.forEach(jogo => {
            const logo = document.createElement("div");
            logo.className = "jogo";
            logo.innerHTML = `
            <img src = "${jogo.thumb}" alt = "imagem do jogo"><br>
            <strong>${jogo.title}</strong><br>
            <small><s>$${jogo.normalPrice}</s> ☛ <span style="color:green"> $${jogo.salePrice}</span></small><br>
            <a href = "https://www.cheapshark.com/redirect?dealID=${jogo.dealID}" target = "_blank"> visitar a página do jogo</a>
            `
            steam.appendChild(logo)
        })
    } catch (error) {
        alert("erro ao carregar os jogos")
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

function scrollCarrossel(direcao) {
    const carrossel = document.getElementById("carrosselJogos");
    const larguraCard = 220; // largura do card + gap
    carrossel.scrollLeft += direcao * larguraCard;
}
