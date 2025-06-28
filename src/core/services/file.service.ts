import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ERROR_MESSAGES } from '../../common/constants/error.messages';

@Injectable()
export class FileService {

  private readonly logger = new Logger(FileService.name);

  async convertCsvToJson(path: string ): Promise<any[]> {
    if (!fs.existsSync(path)) {
      throw new Error(`${ERROR_MESSAGES.FILE.CSV_NOT_FOUND} ${path}`);
    }

    return new Promise((resolve, reject) => {
      const resultados: any[] = [];

      const timeout = setTimeout(() => {
        reject(new Error(ERROR_MESSAGES.FILE.CSV_PROCESSING_TIMEOUT));
      }, 10000);

      fs.createReadStream(path)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => resultados.push(data))
        .on('end', () => {
          resolve(resultados);
        })
        .on('error', (error) => {
          this.logger.error(ERROR_MESSAGES.FILE.CSV_READ_ERROR, error.stack);
          
          reject(
            new Error(ERROR_MESSAGES.FILE.CSV_READ_ERROR + error.message),
          );
        });
    });
  }

}