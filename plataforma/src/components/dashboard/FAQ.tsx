import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'Como aumentar meu Score de Confiança?',
      answer: 'Seu Score de Confiança aumenta através de várias ações: +10% por login diário consecutivo, +15% por responder todas as pesquisas disponíveis no dia, +5% por assistir conteúdo de treinamento, e +20% por enviar comprovantes de atividade (quando solicitado). Mantenha-se ativo na plataforma para aumentar seu score gradualmente. O score máximo de 85% só pode ser atingido após pelo menos 3 dias de atividade consistente.'
    },
    {
      question: 'Quanto tempo o saque demora?',
      answer: 'Saques via PayPal são processados em 1-3 dias úteis após a aprovação. Para M-Pesa e E-Mola, o processamento leva de 1-3 dias úteis, pois as autoridades locais fazem rastreamento para evitar financiamento de crimes e lavagem de dinheiro, conforme regulamentações de Moçambique. Transferências bancárias podem levar até 5 dias úteis devido aos procedimentos de compliance bancário.'
    },
    {
      question: 'Como funcionam os saques via M-Pesa e E-Mola?',
      answer: 'Para M-Pesa e E-Mola, seu saldo em USD será convertido para Metical na taxa de câmbio atual do Banco de Moçambique. O processamento leva 1-3 dias úteis pois as autoridades locais fazem verificações de segurança para prevenir lavagem de dinheiro e financiamento de atividades ilícitas. As autoridades locais fazem rastreamento rigoroso para evitar financiamento de crimes. Taxa de 2% sobre o valor sacado. Valor mínimo: $5.00 USD.'
    },
    {
      question: 'Quais empresas estão participando?',
      answer: 'Trabalhamos com grandes marcas globais como Coca-Cola, Netflix, Amazon, McDonald\'s, Samsung, Apple, Google, Microsoft, e muitas outras. Também temos empresas locais como Vodacom, Shoprite, Standard Bank, Movitel, e Millennium BIM. As pesquisas variam conforme a disponibilidade e seu perfil demográfico. Novas empresas são adicionadas regularmente.'
    },
    {
      question: 'O que fazer se não receber pesquisas?',
      answer: 'Se não há pesquisas disponíveis, isso é normal! As empresas enviam pesquisas em intervalos de 8-24 horas para garantir qualidade e evitar saturação de respostas. Durante esse período, você pode: assistir vídeos de treinamento (+5% no score), fazer login diário (+10% no score), ou completar seu perfil para receber pesquisas mais direcionadas. As próximas empresas enviarão pesquisas em breve.'
    },
    {
      question: 'Posso sacar via PayPal?',
      answer: 'Sim! PayPal é nosso método principal de pagamento internacional. Você precisa ter um Score de Confiança de pelo menos 85% e um saldo mínimo de $10.00. A taxa do PayPal é de $0.50 por transação. O processamento leva 1-3 dias úteis após aprovação.'
    },
    {
      question: 'Por que preciso esperar entre pesquisas?',
      answer: 'O intervalo entre pesquisas (8-24 horas) é necessário porque as empresas enviam pesquisas em lotes programados, não continuamente. Isso garante que você dê respostas pensadas e não automáticas, permite que novas empresas programem suas pesquisas, mantém a qualidade dos dados, e evita saturação de respostas. Este tempo também ajuda a construir seu Score de Confiança.'
    },
    {
      question: 'Meus dados estão seguros?',
      answer: 'Absolutamente! Utilizamos criptografia de nível bancário para proteger seus dados. Nunca compartilhamos informações pessoais com terceiros sem sua autorização. As empresas recebem apenas dados agregados e anônimos das pesquisas. Seguimos todas as regulamentações de proteção de dados de Moçambique e internacionais.'
    },
    {
      question: 'Como funciona o sistema de recompensas?',
      answer: 'Cada pesquisa tem um valor fixo baseado na complexidade e tempo estimado. Valores variam de $1.50 a $5.00 por pesquisa. Bônus adicionais são dados por: completar sequências de pesquisas, manter login diário, e alcançar metas mensais. Seu saldo é atualizado imediatamente após cada pesquisa concluída.'
    },
    {
      question: 'Por que o Score de 85% demora para atingir?',
      answer: 'O Score de Confiança de 85% é projetado para ser atingido gradualmente ao longo de pelo menos 3 dias de atividade consistente. Isso nos ajuda a validar que você é um usuário genuíno e comprometido, não alguém tentando explorar o sistema. É uma medida de segurança que protege tanto você quanto nossa plataforma, garantindo um ambiente confiável para todos.'
    },
    {
      question: 'Verificação de métodos de pagamento M-Pesa e E-Mola',
      answer: 'Todos os métodos de pagamento M-Pesa e E-Mola passam por verificação manual que leva até 8 horas. Durante este período, as autoridades locais fazem rastreamento para evitar financiamento de crimes e lavagem de dinheiro, conforme exigido pelas regulamentações de Moçambique. Após a verificação, seu método será marcado como "Verificado" e estará pronto para uso.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Perguntas Frequentes</h2>
        <p className="text-slate-600 text-sm md:text-base">
          Encontre respostas para as dúvidas mais comuns
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-lg">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 text-sm md:text-base pr-4">{item.question}</h3>
              {openItem === index ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-slate-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-slate-500 flex-shrink-0" />
              )}
            </button>
            
            {openItem === index && (
              <div className="px-4 md:px-6 pb-3 md:pb-4">
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-lg p-4 md:p-6">
        <h3 className="font-semibold text-slate-900 mb-2 text-sm md:text-base">Ainda tem dúvidas?</h3>
        <p className="text-slate-600 mb-4 text-sm md:text-base">
          Nossa equipe de suporte está sempre pronta para ajudar.
        </p>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm md:text-base">
          Entrar em Contato
        </button>
      </div>
    </div>
  );
};

export default FAQ;