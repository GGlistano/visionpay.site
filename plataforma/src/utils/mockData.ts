import { User, Survey } from '../types';

export const generateMockUser = (email: string): User => {
  const baseUser: User = {
    id: `user_${email.replace('@', '_').replace('.', '_')}`,
    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    email,
    phone: '+258 84 123 4567',
    country: 'Moçambique',
    registeredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    lastLogin: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    balance: 200 + Math.floor(Math.random() * 300), // Start with $200 + bonuses
    trustScore: Math.floor(Math.random() * 30) + 35,
    hasCompletedOnboarding: Math.random() > 0.5,
    dailyLoginStreak: Math.floor(Math.random() * 15) + 1,
    surveysCompleted: Math.floor(Math.random() * 10) + 2,
    paymentMethods: {
      paypal: { email: '', verified: false },
      mpesa: { name: '', phone: '', verified: false },
      emola: { name: '', phone: '', verified: false },
      bankAccount: { nib: '', holderName: '', verified: false }
    }
  };

  return baseUser;
};

export const mockSurveys: Survey[] = [
  {
    id: 'survey_1',
    companyName: 'Coca-Cola',
    logoUrl: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.50,
    title: 'Preferências de Bebidas',
    description: 'Ajude-nos a entender as preferências dos consumidores por refrigerantes',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência você bebe refrigerantes?',
        options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente', 'Nunca'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Qual sabor você prefere?',
        options: ['Cola', 'Limão', 'Laranja', 'Guaraná', 'Outro'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais influencia sua escolha de bebida?',
        options: ['Sabor', 'Preço', 'Marca', 'Considerações de saúde', 'Disponibilidade'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'O que faria você mudar para uma marca diferente de refrigerante?',
        required: true
      }
    ]
  },
  {
    id: 'survey_2',
    companyName: 'Netflix',
    logoUrl: 'https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.75,
    title: 'Hábitos de Streaming',
    description: 'Compartilhe suas preferências de visualização para melhorar nosso conteúdo',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Quantas horas você assiste conteúdo de streaming diariamente?',
        options: ['Menos de 1 hora', '1-2 horas', '3-4 horas', '5+ horas'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que gênero você mais assiste?',
        options: ['Drama', 'Comédia', 'Ação', 'Documentário', 'Reality TV'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Qual dispositivo você mais usa para streaming?',
        options: ['Smart TV', 'Smartphone', 'Tablet', 'Computador', 'Console de jogos'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que tipo de conteúdo você gostaria de ver mais em nossa plataforma?',
        required: true
      }
    ]
  },
  {
    id: 'survey_3',
    companyName: 'Amazon',
    logoUrl: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 4.25,
    title: 'Experiência de E-commerce',
    description: 'Ajude-nos a melhorar sua experiência de compras online',
    estimatedTime: 5,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência você compra online?',
        options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Algumas vezes por ano', 'Raramente'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'O que mais importa ao comprar online?',
        options: ['Preço', 'Entrega rápida', 'Avaliações do produto', 'Política de devolução', 'Confiança na marca'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como prefere receber suas encomendas?',
        options: ['Entrega em casa', 'Ponto de recolha', 'Entrega no escritório', 'Cacifo', 'Sem preferência'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'O que melhoraria sua experiência de compras online?',
        required: true
      }
    ]
  },
  {
    id: 'survey_4',
    companyName: 'McDonald\'s',
    logoUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 1.95,
    title: 'Preferências de Fast Food',
    description: 'Ajude-nos a entender suas preferências alimentares',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência come em restaurantes de fast food?',
        options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente', 'Nunca'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'A que horas costuma visitar restaurantes de fast food?',
        options: ['Pequeno-almoço', 'Almoço', 'Jantar', 'Madrugada', 'Qualquer hora'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que influencia sua escolha de restaurante de fast food?',
        options: ['Preço', 'Velocidade', 'Sabor', 'Localização', 'Opções saudáveis'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que novo item de menu gostaria de ver em restaurantes de fast food?',
        required: true
      }
    ]
  },
  {
    id: 'survey_5',
    companyName: 'Samsung',
    logoUrl: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.25,
    title: 'Tecnologia Mobile',
    description: 'Pesquisa sobre uso de smartphones e preferências tecnológicas',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Há quanto tempo tem o seu smartphone atual?',
        options: ['Menos de 6 meses', '6 meses a 1 ano', '1-2 anos', '2-3 anos', 'Mais de 3 anos'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Qual funcionalidade é mais importante para si?',
        options: ['Câmara', 'Bateria', 'Velocidade', 'Armazenamento', 'Design'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Onde costuma comprar smartphones?',
        options: ['Loja física', 'Online', 'Operadora', 'Mercado usado', 'Não tenho preferência'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que funcionalidade gostaria de ver em futuros smartphones?',
        required: true
      }
    ]
  },
  {
    id: 'survey_6',
    companyName: 'Vodacom',
    logoUrl: 'https://images.pexels.com/photos/33999/pexels-photo-33999.jpg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.75,
    title: 'Serviços de Telecomunicações',
    description: 'Avalie nossos serviços e ajude-nos a melhorar',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Qual serviço usa mais frequentemente?',
        options: ['Chamadas', 'SMS', 'Internet móvel', 'M-Pesa', 'Todos igualmente'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como avalia a qualidade da rede?',
        options: ['Excelente', 'Boa', 'Razoável', 'Fraca', 'Muito fraca'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza num operador?',
        options: ['Preços baixos', 'Cobertura', 'Velocidade', 'Atendimento', 'Promoções'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que serviço gostaria que oferecêssemos?',
        required: true
      }
    ]
  },
  {
    id: 'survey_7',
    companyName: 'Shoprite',
    logoUrl: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.25,
    title: 'Experiência de Compras',
    description: 'Partilhe a sua experiência nas nossas lojas',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência visita as nossas lojas?',
        options: ['Diariamente', 'Semanalmente', 'Quinzenalmente', 'Mensalmente', 'Raramente'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que secção visita mais?',
        options: ['Frescos', 'Mercearia', 'Roupas', 'Eletrodomésticos', 'Farmácia'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como avalia o atendimento?',
        options: ['Excelente', 'Muito bom', 'Bom', 'Razoável', 'Precisa melhorar'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'O que podemos fazer para melhorar sua experiência?',
        required: true
      }
    ]
  },
  {
    id: 'survey_8',
    companyName: 'Standard Bank',
    logoUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 4.50,
    title: 'Serviços Bancários',
    description: 'Pesquisa sobre serviços bancários e financeiros',
    estimatedTime: 5,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Que serviços bancários usa mais?',
        options: ['Conta corrente', 'Poupanças', 'Crédito', 'Mobile banking', 'Transferências'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como prefere fazer transações?',
        options: ['Balcão', 'ATM', 'Mobile banking', 'Internet banking', 'Agente'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza num banco?',
        options: ['Taxas baixas', 'Conveniência', 'Segurança', 'Atendimento', 'Tecnologia'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que novo serviço bancário gostaria de ter?',
        required: true
      }
    ]
  },
  {
    id: 'survey_9',
    companyName: 'Movitel',
    logoUrl: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.95,
    title: 'Conectividade e Internet',
    description: 'Avalie nossos serviços de internet e conectividade',
    estimatedTime: 4,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Quantos GB usa por mês?',
        options: ['Menos de 1GB', '1-5GB', '5-10GB', '10-20GB', 'Mais de 20GB'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Para que usa mais a internet?',
        options: ['Redes sociais', 'Trabalho', 'Entretenimento', 'Comunicação', 'Estudos'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como avalia a velocidade da internet?',
        options: ['Muito rápida', 'Rápida', 'Adequada', 'Lenta', 'Muito lenta'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'O que melhoraria em nossos serviços de internet?',
        required: true
      }
    ]
  },
  {
    id: 'survey_10',
    companyName: 'Millennium BIM',
    logoUrl: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.85,
    title: 'Banca Digital',
    description: 'Pesquisa sobre uso de serviços bancários digitais',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência usa banca digital?',
        options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Raramente', 'Nunca'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que funcionalidade usa mais?',
        options: ['Consulta de saldo', 'Transferências', 'Pagamentos', 'Histórico', 'Investimentos'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como avalia a segurança da banca digital?',
        options: ['Muito segura', 'Segura', 'Razoável', 'Insegura', 'Muito insegura'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que funcionalidade gostaria de ter na banca digital?',
        required: true
      }
    ]
  },
  // Continue with more surveys to reach 25 total...
  {
    id: 'survey_11',
    companyName: 'Coca-Cola',
    logoUrl: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.15,
    title: 'Novos Sabores',
    description: 'Teste de aceitação para novos sabores de refrigerantes',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Estaria disposto a experimentar novos sabores?',
        options: ['Definitivamente sim', 'Provavelmente sim', 'Talvez', 'Provavelmente não', 'Definitivamente não'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que sabor gostaria de ver?',
        options: ['Frutas tropicais', 'Especiarias', 'Sabores locais', 'Combinações únicas', 'Versões light'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Onde gostaria de encontrar novos produtos?',
        options: ['Supermercados', 'Lojas de conveniência', 'Restaurantes', 'Máquinas de venda', 'Online'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que sabor único sugeriria para Moçambique?',
        required: true
      }
    ]
  },
  {
    id: 'survey_12',
    companyName: 'Uber',
    logoUrl: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.45,
    title: 'Mobilidade Urbana',
    description: 'Pesquisa sobre transporte e mobilidade nas cidades',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Qual meio de transporte usa mais?',
        options: ['Carro próprio', 'Transporte público', 'Uber/Bolt', 'Moto', 'A pé'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Em que situações usa aplicativos de transporte?',
        options: ['Trabalho diário', 'Saídas noturnas', 'Emergências', 'Chuva', 'Conveniência'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza no transporte?',
        options: ['Preço', 'Rapidez', 'Segurança', 'Conforto', 'Disponibilidade'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Como podemos melhorar o transporte na sua cidade?',
        required: true
      }
    ]
  },
  {
    id: 'survey_13',
    companyName: 'Zap Imoveis',
    logoUrl: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 4.75,
    title: 'Mercado Imobiliário',
    description: 'Pesquisa sobre preferências habitacionais e imobiliárias',
    estimatedTime: 5,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Que tipo de habitação prefere?',
        options: ['Apartamento', 'Casa', 'Condomínio', 'Vivenda', 'Não tenho preferência'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Onde procura imóveis?',
        options: ['Online', 'Imobiliárias', 'Indicações', 'Jornais', 'Redes sociais'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza numa habitação?',
        options: ['Localização', 'Preço', 'Tamanho', 'Segurança', 'Infraestruturas'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que funcionalidade gostaria num site de imóveis?',
        required: true
      }
    ]
  },
  {
    id: 'survey_14',
    companyName: 'Mcel',
    logoUrl: 'https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.65,
    title: 'Serviços Móveis',
    description: 'Avaliação dos nossos serviços de telecomunicações',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Há quanto tempo é nosso cliente?',
        options: ['Menos de 1 ano', '1-3 anos', '3-5 anos', '5-10 anos', 'Mais de 10 anos'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como avalia nosso atendimento ao cliente?',
        options: ['Excelente', 'Muito bom', 'Bom', 'Razoável', 'Precisa melhorar'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Que promoção mais aprecia?',
        options: ['Dados grátis', 'Minutos grátis', 'SMS grátis', 'Descontos', 'Bónus de recarga'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que novo serviço gostaria que oferecêssemos?',
        required: true
      }
    ]
  },
  {
    id: 'survey_15',
    companyName: 'Nando\'s',
    logoUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.35,
    title: 'Experiência Gastronómica',
    description: 'Partilhe sua experiência nos nossos restaurantes',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência nos visita?',
        options: ['Semanalmente', 'Mensalmente', 'Ocasionalmente', 'Primeira vez', 'Raramente'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Qual seu prato favorito?',
        options: ['Frango inteiro', 'Meio frango', 'Espetadas', 'Wraps', 'Saladas'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como avalia o ambiente do restaurante?',
        options: ['Excelente', 'Muito bom', 'Bom', 'Razoável', 'Precisa melhorar'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que novo prato gostaria de ver no menu?',
        required: true
      }
    ]
  },
  // Add more surveys to reach 25 total
  {
    id: 'survey_16',
    companyName: 'Edgars',
    logoUrl: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.15,
    title: 'Moda e Vestuário',
    description: 'Pesquisa sobre tendências de moda e preferências',
    estimatedTime: 4,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Onde costuma comprar roupas?',
        options: ['Lojas físicas', 'Online', 'Mercados', 'Outlets', 'Todas as opções'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'O que mais valoriza ao comprar roupa?',
        options: ['Qualidade', 'Preço', 'Estilo', 'Marca', 'Conforto'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Que estilo prefere?',
        options: ['Casual', 'Formal', 'Desportivo', 'Trendy', 'Clássico'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que tipo de roupa gostaria de ver mais nas lojas?',
        required: true
      }
    ]
  },
  {
    id: 'survey_17',
    companyName: 'Game Stores',
    logoUrl: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.95,
    title: 'Gaming e Entretenimento',
    description: 'Pesquisa sobre hábitos de gaming e entretenimento digital',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Quantas horas joga por semana?',
        options: ['Menos de 5h', '5-10h', '10-20h', '20-30h', 'Mais de 30h'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que plataforma prefere?',
        options: ['PlayStation', 'Xbox', 'PC', 'Nintendo', 'Mobile'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Que género de jogos prefere?',
        options: ['Ação', 'Aventura', 'Desporto', 'Estratégia', 'RPG'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que jogo gostaria de ver lançado?',
        required: true
      }
    ]
  },
  {
    id: 'survey_18',
    companyName: 'Farmácia do Povo',
    logoUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.85,
    title: 'Saúde e Bem-estar',
    description: 'Pesquisa sobre cuidados de saúde e farmácia',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência visita farmácias?',
        options: ['Semanalmente', 'Mensalmente', 'Quando necessário', 'Raramente', 'Nunca'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'O que mais procura numa farmácia?',
        options: ['Medicamentos', 'Produtos de higiene', 'Suplementos', 'Cosméticos', 'Consultas'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como prefere ser atendido?',
        options: ['Balcão tradicional', 'Auto-atendimento', 'Consulta farmacêutica', 'Online', 'Entrega ao domicílio'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que serviço gostaria de ter numa farmácia?',
        required: true
      }
    ]
  },
  {
    id: 'survey_19',
    companyName: 'Hollard Seguros',
    logoUrl: 'https://images.pexels.com/photos/1028726/pexels-photo-1028726.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 4.15,
    title: 'Seguros e Proteção',
    description: 'Pesquisa sobre necessidades de seguros e proteção',
    estimatedTime: 5,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Que tipo de seguro considera mais importante?',
        options: ['Automóvel', 'Saúde', 'Habitação', 'Vida', 'Viagem'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como prefere contratar seguros?',
        options: ['Presencialmente', 'Online', 'Por telefone', 'Através de corretor', 'App móvel'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza num seguro?',
        options: ['Preço baixo', 'Cobertura ampla', 'Atendimento rápido', 'Reputação da empresa', 'Facilidade de uso'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que tipo de seguro gostaria que oferecêssemos?',
        required: true
      }
    ]
  },
  {
    id: 'survey_20',
    companyName: 'Telecine',
    logoUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.55,
    title: 'Entretenimento e Cinema',
    description: 'Pesquisa sobre preferências de entretenimento e cinema',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência vai ao cinema?',
        options: ['Semanalmente', 'Mensalmente', 'Ocasionalmente', 'Raramente', 'Nunca'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que género de filme prefere?',
        options: ['Ação', 'Comédia', 'Drama', 'Terror', 'Documentário'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Como prefere assistir filmes?',
        options: ['Cinema', 'Streaming', 'TV', 'Tablet/Smartphone', 'Todas as opções'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que tipo de filme gostaria de ver mais?',
        required: true
      }
    ]
  },
  {
    id: 'survey_21',
    companyName: 'Barclays',
    logoUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 4.35,
    title: 'Serviços Financeiros Premium',
    description: 'Pesquisa sobre serviços bancários premium e investimentos',
    estimatedTime: 5,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Que produtos financeiros mais usa?',
        options: ['Conta corrente', 'Cartão de crédito', 'Investimentos', 'Seguros', 'Empréstimos'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como gere as suas finanças?',
        options: ['App bancário', 'Internet banking', 'Presencialmente', 'Consultor financeiro', 'Várias formas'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'Que tipo de investimento prefere?',
        options: ['Baixo risco', 'Risco moderado', 'Alto risco', 'Diversificado', 'Não invisto'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que serviço financeiro gostaria de ter?',
        required: true
      }
    ]
  },
  {
    id: 'survey_22',
    companyName: 'Bolt',
    logoUrl: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.25,
    title: 'Mobilidade Sustentável',
    description: 'Pesquisa sobre transporte sustentável e mobilidade urbana',
    estimatedTime: 4,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Usa transportes partilhados?',
        options: ['Frequentemente', 'Ocasionalmente', 'Raramente', 'Nunca', 'Primeira vez'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que meio de transporte prefere para distâncias curtas?',
        options: ['A pé', 'Bicicleta', 'Scooter', 'Transporte público', 'Carro'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza no transporte?',
        options: ['Sustentabilidade', 'Economia', 'Rapidez', 'Conforto', 'Segurança'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Como podemos tornar o transporte mais sustentável?',
        required: true
      }
    ]
  },
  {
    id: 'survey_23',
    companyName: 'Continente',
    logoUrl: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 2.45,
    title: 'Compras e Consumo',
    description: 'Pesquisa sobre hábitos de compra e consumo',
    estimatedTime: 3,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Quando prefere fazer compras?',
        options: ['Manhã', 'Tarde', 'Noite', 'Fins de semana', 'Qualquer hora'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como planeia as suas compras?',
        options: ['Lista detalhada', 'Lista básica', 'Mentalmente', 'Não planeio', 'App móvel'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais influencia suas compras?',
        options: ['Preço', 'Qualidade', 'Marca', 'Promoções', 'Necessidade'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que produto gostaria de encontrar mais facilmente?',
        required: true
      }
    ]
  },
  {
    id: 'survey_24',
    companyName: 'Fitness Hut',
    logoUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.65,
    title: 'Fitness e Bem-estar',
    description: 'Pesquisa sobre hábitos de exercício e bem-estar',
    estimatedTime: 4,
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Com que frequência pratica exercício?',
        options: ['Diariamente', 'Várias vezes por semana', 'Semanalmente', 'Ocasionalmente', 'Nunca'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Que tipo de exercício prefere?',
        options: ['Musculação', 'Cardio', 'Aulas de grupo', 'Desportos', 'Atividades ao ar livre'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais o motiva a exercitar-se?',
        options: ['Saúde', 'Estética', 'Bem-estar mental', 'Socialização', 'Competição'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que atividade gostaria de ver no ginásio?',
        required: true
      }
    ]
  },
  {
    id: 'survey_25',
    companyName: 'Worten',
    logoUrl: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    reward: 3.75,
    title: 'Tecnologia e Eletrodomésticos',
    description: 'Pesquisa sobre preferências tecnológicas e eletrodomésticos',
    estimatedTime: 4,
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Que produto tecnológico compra mais?',
        options: ['Smartphones', 'Computadores', 'Eletrodomésticos', 'Gaming', 'Audio/Video'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Como se informa antes de comprar?',
        options: ['Reviews online', 'Amigos/família', 'Vendedores', 'Comparadores', 'Redes sociais'],
        required: true
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'O que mais valoriza num produto tecnológico?',
        options: ['Funcionalidades', 'Preço', 'Marca', 'Design', 'Garantia'],
        required: true
      },
      {
        id: 'q4',
        type: 'text',
        question: 'Que produto tecnológico gostaria de ver no mercado?',
        required: true
      }
    ]
  }
];

export const onboardingQuestions = [
  {
    id: 'objective',
    type: 'text' as const,
    question: 'Qual o seu principal objetivo trabalhando conosco?',
    placeholder: 'Ex: Complementar minha renda, trabalhar de casa, etc.',
    required: true
  },
  {
    id: 'experience',
    type: 'multiple-choice' as const,
    question: 'Você já trabalhou com plataformas como Appen, Swagbucks ou Toluna?',
    options: ['Sim, tenho experiência', 'Já ouvi falar, mas nunca usei', 'Não, é minha primeira vez'],
    required: true
  },
  {
    id: 'availability',
    type: 'multiple-choice' as const,
    question: 'Quanto tempo você pode dedicar diariamente?',
    options: ['Menos de 30 minutos', '30 minutos a 1 hora', '1 a 2 horas', 'Mais de 2 horas'],
    required: true
  },
  {
    id: 'device',
    type: 'multiple-choice' as const,
    question: 'Qual dispositivo você mais utiliza?',
    options: ['Smartphone', 'Computador/Laptop', 'Tablet', 'Uso todos igualmente'],
    required: true
  },
  {
    id: 'motivation',
    type: 'multiple-choice' as const,
    question: 'O que mais te motiva a participar de pesquisas?',
    options: ['Recompensa financeira', 'Influenciar produtos e serviços', 'Passar tempo livre', 'Aprender sobre marcas'],
    required: true
  }
];