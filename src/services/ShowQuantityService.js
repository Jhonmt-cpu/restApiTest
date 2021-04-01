const fs = require('fs');
const path = require('path');

class ShowQuantityService {
  execute(request, response) {
    const fileWithCalcQuantityPath = path.resolve(__dirname ,'..', 'arquivoComQuatidade.txt');
    if (!fs.existsSync(fileWithCalcQuantityPath)) {
      fs.writeFile(fileWithCalcQuantityPath, "0", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('arquivo criado.')
        }
      });

      return response.status(200).json({mensagem: "Quantidade de operações realizadas: 0"});
    } else {
      const fileData = fs.readFileSync(fileWithCalcQuantityPath, {
        encoding: 'utf-8',
      });
      
      const floorOfFileNumber = Math.floor(Number(fileData))

      const fileNumberIsvalid = 
        floorOfFileNumber !== Infinity &&
        String(floorOfFileNumber) === fileData &&
        floorOfFileNumber >= 0;

      if (fileNumberIsvalid) {
        return response.status(200).json({mensagem: `Quantidade de operações realizadas: ${floorOfFileNumber}`});
      } else {
        fs.writeFileSync(fileWithCalcQuantityPath, "0");

        return response.status(200).json({mensagem: "Quantidade de operações realizadas: 0"});
      }
    }
  }
}

module.exports = ShowQuantityService;