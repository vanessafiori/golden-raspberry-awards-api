export const ERROR_MESSAGES = {
    MOVIE: {
      INIT_PROCESSING_ERROR: 'Erro ao processar os filmes na inicialização.',
      SAVE_ERROR: 'Ocorreu um erro ao salvar os filmes no banco de dados.',
      LIST_ERROR: 'Ocorreu um erro ao listar os filmes.'
    },
    FILE: {
      CSV_NOT_FOUND: 'Arquivo CSV não encontrado em: ',
      CSV_PROCESSING_TIMEOUT: 'Tempo limite ao tentar processar o CSV.',
      CSV_READ_ERROR: 'Erro ao ler o arquivo CSV.',
    },
} as const;