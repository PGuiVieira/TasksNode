import fs from 'node:fs';
import {parse} from 'csv';

async function fetchDataAndSend() {
  const config = {
    columns: true, // Indica que a primeira linha contém cabeçalhos
    delimiter: ',', // Delimitador utilizado no CSV
    trim: true, // Remove espaços em branco das células
  };
  try {
    const csvFilePath = 'tasks.csv';
    const readStream = fs.createReadStream(csvFilePath, 'utf8');

    readStream.pipe(parse(config))
      .on('data', async (record) => {

        const apiUrl = 'http://localhost:3333/tasks';
        
       
        console.log(record.title)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(record),
        });

       
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        console.log('Resposta do servidor para linha:', record, responseData);
      })
      .on('end', () => {
        console.log('Leitura do arquivo CSV concluída.');
      });

  } catch (err) {
    console.error('Erro:', err);
  }
}

fetchDataAndSend()
