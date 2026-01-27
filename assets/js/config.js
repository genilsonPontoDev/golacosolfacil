/*
  Config central do front (quase produção)
  - Mantém os mocks/dados enquanto a API não entra
  - Coloque aqui textos, listas e parâmetros de UI
*/

(function () {
  "use strict";

  // FAQ completo (Landing + Dashboard)
  var FAQ = [
    {
      q: "O que é a campanha Golaço da Solfácil?",
      a: "A Golaço da Solfácil é uma campanha promocional onde integradores e clientes finais concorrem a prêmios ao realizar compras e financiamentos através da Solfácil. Quanto mais você compra, mais números da sorte você acumula — e mais chances de ganhar."
    },
    {
      q: "Qual é o período da campanha?",
      a: "A campanha é válida de 01/02/2026 a 30/04/2026. Compras e financiamentos feitos nesse período são elegíveis, desde que sejam faturados/formalizados até 10/05/2026. Ex.: comprou em 28/04, mas faturou em 12/05 → não entra."
    },
    {
      q: "Quem pode participar?",
      a: "Integradores Solfácil e clientes finais que realizarem compra através da Solfácil."
    },
    {
      q: "Onde eu acompanho meus números da sorte?",
      a: "Você acompanha tudo dentro da plataforma. Para integrador: Minha pontuação. Para cliente final: Área do cliente."
    },
    {
      q: "Como eu ganho números da sorte como integrador?",
      a: "A cada R$ 5.000 em compras faturadas (Loja Solfácil) ou financiamentos formalizados (Financiamento Solfácil), você ganha 1 número da sorte. Compras válidas: feitas até 30/04 e faturadas até 10/05."
    },
    {
      q: "Como funciona o cálculo dos números da sorte?",
      a: "O valor de cada compra é dividido por R$ 5.000 e o resultado é truncado (desconsidera casas decimais). Ex.: R$ 27.000 ÷ 5.000 = 5,4 → ganha 5 números."
    },
    {
      q: "Posso somar duas compras diferentes para dar R$ 5.000?",
      a: "Não. Os números da sorte são gerados por transação e não acumulam entre pedidos."
    },
    {
      q: "O que significa multiplicador x2 e x3?",
      a: "Você pode ganhar mais números ao usar condições específicas. x2 quando: compra via Combo Fácil (Loja + financiamento) ou pedido inclui módulos Hanersun, baterias ou equipamentos Sofar. x3 quando: Combo Fácil com módulos Hanersun, baterias ou equipamentos Sofar (equipamentos participantes)."
    },
    {
      q: "Como funciona o Combo Fácil?",
      a: "Combo Fácil é a compra na Loja Solfácil + financiamento Solfácil em uma mesma jornada. Além de facilitar a compra, o pedido ativa multiplicadores na campanha."
    },
    {
      q: "Os multiplicadores de 2x e 3x, como funcionam?",
      a: "No final da campanha, ao atingir R$ 500.000 ou R$ 1.000.000 em faturamento, seus números da sorte serão dobrados ou triplicados. Se faturar R$ 500.000–R$ 999.999 → categoria A dobra. Se faturar ≥ R$ 1.000.000 → categoria A triplica. Somente para sorteios destinados aos integradores."
    },
    {
      q: "Como funciona a trilha de faturamento?",
      a: "São sorteios que você desbloqueia ao atingir metas de faturamento acumulado durante a campanha. Ao atingir cada meta, você concorre também naquela categoria."
    },
    {
      q: "Quais são as metas para desbloquear categorias?",
      a: "Exemplos principais (trilha): R$ 20.000 (B), R$ 50.000 (C), R$ 100.000 (D), R$ 150.000 (E), R$ 200.000 (F), R$ 300.000 (G), R$ 400.000 (H), R$ 500.000 (I), R$ 1.000.000 (J). Ao desbloquear, você continua concorrendo nessa categoria até o final."
    },
    {
      q: "Quantos números existem por categoria?",
      a: "Para o integrador solar, o conjunto é de 0 a 999.999 por categoria, com numeração independente por categoria."
    },
    {
      q: "Como funciona o sorteio da campanha?",
      a: "O número vencedor é baseado no resultado oficial da Loteria Federal. A campanha usa esse resultado para formar um Número da Sorte Contemplado, que define o ganhador do sorteio."
    },
    {
      q: "Tenho dúvidas da campanha, com quem falo?",
      a: "Você pode entrar em contato por e-mail: contato@solfacil.com.br, falar com seu gerente de contas ou com o time de atendimento Solfácil."
    },
    {
      q: "Onde vejo quais prêmios eu já desbloqueei?",
      a: "Dentro de Minha pontuação, você pode ver: metas atingidas, sorteios desbloqueados, próximos prêmios e quanto falta para avançar na trilha."
    },
    {
      q: "Os prêmios são entregues fisicamente?",
      a: "Não. Todos os prêmios são entregues em formato de voucher, com valores equivalentes para resgate na loja parceira da campanha (Smash)."
    },
    {
      q: "O que é o “Kit Copa”?",
      a: "É um voucher de R$ 700, pensado como referência para bola + camisa (itens temáticos). O resgate acontece via loja parceira."
    },
    {
      q: "Quando acontecem os sorteios?",
      a: "As datas e regras completas ficam disponíveis no regulamento oficial. Os sorteios são realizados após o encerramento e consolidação dos números válidos do período."
    },
    {
      q: "Se eu cancelar um pedido, perco os números?",
      a: "Sim. Apenas compras faturadas/formalizadas dentro das regras entram na campanha. Cancelamentos e estornos não geram pontuação."
    },
    {
      q: "Como o cliente final ganha números da sorte?",
      a: "A cada compra realizada através da Solfácil, o cliente final ganha 1 número da sorte."
    },
    {
      q: "O cliente final também tem multiplicadores?",
      a: "Sim. x2 quando compra via Combo Fácil ou compra um sistema com baterias. x3 quando faz Combo Fácil + sistema com baterias."
    },
    {
      q: "O cliente final concorre aos mesmos prêmios do integrador?",
      a: "Não. O cliente final concorre aos prêmios destinados ao cliente, com regras próprias."
    },
    {
      q: "Por que meus números ainda não apareceram?",
      a: "Pode acontecer por: compra ainda não faturada, financiamento ainda não formalizado, compra fora do período da campanha, ou dados incorretos na consulta."
    },
    {
      q: "Como sei que meus números são válidos?",
      a: "Somente compras ou financiamentos que atendem aos critérios de data dentro do período, faturamento/formalização dentro do prazo e valor mínimo por transação aparecem como elegíveis no sistema."
    },
    {
      q: "Os números da sorte podem mudar?",
      a: "Sim. Eles podem ser atualizados caso haja ajustes de faturamento, cancelamentos ou correções cadastrais."
    },
    {
      q: "Onde posso ler o regulamento completo?",
      a: "Acesse o regulamento completo clicando em “Conferir regulamento”."
    }
  ];

  // Mock do dashboard (substituir por fetch/SSO depois)
  var DATA = {
    campaign: {
      subtitle: "Participe da campanha e acompanhe sua jornada em tempo real.",
      periodText: "Válida de 01/02/2026 a 30/04/2026 • Faturamento/formalização até 10/05/2026",
      endAt: "2026-05-10T23:59:59-03:00"
    },
    profiles: {
      integrador: {
        revenue: 600000,
        category: "Categoria A (Integrador)",
        luckyTotal: 2000,
        luckyNumbers: ["87106", "73432", "35452", "50709", "88722", "83794", "28610", "44196", "30336", "73911", "47972", "76250", "70354", "64898", "40342", "49207", "01714", "38580", "85281", "35123", "77916", "34923", "47432", "68472", "41354", "76122", "98638", "04411", "35428", "54792", "62046", "94425", "87414", "46744", "19267", "35093", "41052", "43581", "82634", "99317", "90097", "63721", "15878", "10186", "14051", "23612", "61466", "52633", "55092", "50042", "98437", "63677", "30685", "79877", "26212", "95738", "41650", "42974", "73224", "02145", "21181", "81044", "35055", "02427", "89009", "26901", "98680", "78568", "16381", "60887", "94857", "61638"],
        progressPercent: 60,
        track: {
          percent: 60,
          steps: [
            { label: "R$ 20k", hit: true },
            { label: "R$ 50k", hit: true },
            { label: "R$ 100k", hit: true },
            { label: "R$ 150k", hit: true },
            { label: "R$ 200k", hit: true },
            { label: "R$ 300k", hit: true },
            { label: "R$ 400k", hit: true },
            { label: "R$ 500k", hit: true },
            { label: "R$ 1M", hit: false }
          ]
        },
        achieved: ["R$ 20k", "R$ 50k", "R$ 100k", "R$ 150k", "R$ 200k", "R$ 300k", "R$ 400k", "R$ 500k"],
        unlocked: ["Kit Copa", "TV 55\"", "Bônus Loja (voucher)", "Prêmio Final (categoria A)"],
        nextPrizes: ["Falta R$ 400k para chegar em R$ 1.000.000", "Ao atingir R$ 1M, números da categoria A triplicam"],
        clientArea: {
          integratorText: "Você possui 2.000 números da sorte (demo).",
          finalText: "Você possui 18 clientes finais elegíveis (demo)."
        }
      },
      cliente: {
        revenue: 0,
        category: "Cliente final",
        luckyTotal: 7,
        luckyNumbers: ["02766", "14331", "20564", "10382", "90128", "07918", "39413", "49614", "07979", "89239", "61910", "42639", "89748", "92165", "65166", "15429", "21481", "94622", "31957", "06933", "56232", "21247", "15085", "49839"],
        progressPercent: 25,
        track: {
          percent: 25,
          steps: [
            { label: "Compra", hit: true },
            { label: "Combo Fácil", hit: false },
            { label: "Baterias", hit: false },
            { label: "x3", hit: false }
          ]
        },
        achieved: ["Compra registrada"],
        unlocked: ["Números de cliente final"],
        nextPrizes: ["Ative Combo Fácil para multiplicador", "Sistema com baterias pode gerar multiplicador"],
        clientArea: {
          integratorText: "Você está visualizando a área do cliente final (demo).",
          finalText: "Você possui 7 números da sorte (demo)."
        }
      }
    },
    marketing: [
      {
        id: "mkt-01",
        title: "Banner (Feed)",
        text: "Campanha Golaço Solfácil: participe e concorra a prêmios. Confira seus números na plataforma.",
        preview: "1080×1080 (mock)"
      },
      {
        id: "mkt-02",
        title: "Story",
        text: "Você já está participando do Golaço da Solfácil? Veja sua pontuação e seus números da sorte.",
        preview: "1080×1920 (mock)"
      },
      {
        id: "mkt-03",
        title: "Mensagem pronta",
        text: "Olá! A campanha Golaço da Solfácil está no ar. Acompanhe sua jornada e confira os prêmios na plataforma.",
        preview: "Texto (mock)"
      }
    ],
    winners: [
      { date: "2026-02-15", prize: "Kit Copa", winner: "Integrador • SP", number: "A-102334" },
      { date: "2026-03-10", prize: "TV 55\"", winner: "Integrador • MG", number: "A-778120" },
      { date: "2026-04-05", prize: "Voucher Smash", winner: "Cliente final • PR", number: "C-009812" }
    ]
  };

  // Ajustes de UI
  var UI = {
    faqInitial: 6,
    faqStep: 6
  };

  window.GS2D_CONFIG = window.GS2D_CONFIG || {};
  window.GS2D_CONFIG.faq = FAQ;
  window.GS2D_CONFIG.data = DATA;
  window.GS2D_CONFIG.ui = UI;
})();
