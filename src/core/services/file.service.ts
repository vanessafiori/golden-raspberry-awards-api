import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class FileService {

  async convertCsvToJson(path: string ): Promise<any[]> {
    if (!fs.existsSync(path)) {
      throw new Error(`Arquivo CSV não encontrado em: ${path}`);
    }

    return new Promise((resolve, reject) => {
      const resultados: any[] = [];

      const timeout = setTimeout(() => {
        reject(new Error('Tempo limite ao tentar processar o CSV'));
      }, 10000);

      fs.createReadStream(path)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => resultados.push(data))
        .on('end', () => {
          resolve(resultados);
        })
        .on('error', (err) => {
          console.error('Erro ao ler o CSV:', err);

          reject(
            new Error('Erro ao ler o arquivo CSV: ' + err.message),
          );
        });
    });
  }

}