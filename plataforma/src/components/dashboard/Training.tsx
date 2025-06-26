import React from 'react';
import { Play, ExternalLink, BookOpen, Award } from 'lucide-react';

const Training: React.FC = () => {
  const trainingVideos = [
    {
      title: 'Como Funciona o Swagbucks',
      description: 'Aprenda sobre uma das maiores plataformas de pesquisas do mundo',
      duration: '8:45',
      thumbnail: 'https://images.pexels.com/photos/5077045/pexels-photo-5077045.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      completed: false
    },
    {
      title: 'Toluna: Dicas e Estratégias',
      description: 'Maximize seus ganhos na plataforma Toluna',
      duration: '12:30',
      thumbnail: 'https://images.pexels.com/photos/5439381/pexels-photo-5439381.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      completed: true
    },
    {
      title: 'Appen: Trabalho Online Profissional',
      description: 'Como trabalhar profissionalmente com a Appen',
      duration: '15:20',
      thumbnail: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      completed: false
    },
    {
      title: 'Maximizando seus Ganhos',
      description: 'Estratégias avançadas para aumentar sua renda',
      duration: '18:15',
      thumbnail: 'https://images.pexels.com/photos/5477857/pexels-photo-5477857.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      completed: false
    }
  ];

  const articles = [
    {
      title: 'Guia Completo: Pesquisas Remuneradas',
      description: 'Tudo que você precisa saber sobre o mercado de pesquisas online',
      readTime: '5 min',
      category: 'Guia'
    },
    {
      title: 'Evitando Golpes em Plataformas Online',
      description: 'Como identificar e evitar sites fraudulentos',
      readTime: '3 min',
      category: 'Segurança'
    },
    {
      title: 'Tributação de Renda Online',
      description: 'Informações importantes sobre impostos e declaração',
      readTime: '7 min',
      category: 'Financeiro'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Centro de Treinamento</h2>
        <p className="text-slate-600">
          Aprenda com os melhores para maximizar seus ganhos
        </p>
      </div>

      {/* Video Training */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Vídeos de Treinamento</h3>
          <span className="text-sm text-slate-500">+5% no Score por vídeo assistido</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingVideos.map((video, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                    <Play className="w-6 h-6 text-slate-800 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                {video.completed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <Award className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 mb-2">{video.title}</h4>
                <p className="text-slate-600 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Artigos e Guias</h3>
        
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-6 h-6 text-slate-600 mt-1" />
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-slate-900">{article.title}</h4>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{article.description}</p>
                    <p className="text-slate-500 text-xs">{article.readTime} de leitura</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4">💡 Dicas Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-slate-700">
              <strong>Seja consistente:</strong> Faça login diariamente para manter sua sequência
            </p>
            <p className="text-sm text-slate-700">
              <strong>Respostas honestas:</strong> Empresas valorizam feedback genuíno
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-700">
              <strong>Complete o perfil:</strong> Receba pesquisas mais direcionadas
            </p>
            <p className="text-sm text-slate-700">
              <strong>Paciência:</strong> Qualidade é mais importante que velocidade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;