const fs = require('fs');
const path = require('path');

class CalculateService {
  execute(request, response) {
    const { num1, num2, operacao } = request.body;

    if (!num1 || !num2 || !operacao) {
      return response.status(400).json({
        mensagem: "Parâmetros inválidos, por favor forneça num1, num2 e operacao na sua requisição"
      });
    }

    if (isNaN(num1) || isNaN(num2)) {
      return response.status(400).json({
        mensagem: "num1 e num2 precisam ser números válidos"
      });
    }

    const operacaoTypes = ['soma', 'subtracao', 'divisao', 'multiplicacao'];

    const isOperacaoValid = operacaoTypes.includes(String(operacao).toLowerCase());

    if (!isOperacaoValid) {
      return response.status(400).json({
        mensagem: "operacao precisa ser soma, subtracao, divisao ou multiplicacao"
      });
    }

    let result;

    switch (operacao) {
      case 'soma':
        result = num1 + num2;
        break;
      case 'subtracao':
        result = num1 - num2;
      break;
      case 'divisao':
        result = num1 / num2;
      break;
      case 'multiplicacao':
        result = num1 * num2;
      break;
      default:
        return response.status(400).json({
          message: "aviso: a api permitiu a pasagem de uma operação inválida"
        });
    }

    const fileWithCalcQuantityPath = path.resolve(__dirname ,'..', 'arquivoComQuatidade.txt');
    if (!fs.existsSync(fileWithCalcQuantityPath)) {
      fs.writeFile(fileWithCalcQuantityPath, "1", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('arquivo criado.')
        }
      });

      return response.status(200).json({mensagem: `O resultado da sua operaçõe é ${result}`});
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
        const newFileNumberValue = floorOfFileNumber + 1;

        fs.writeFileSync(fileWithCalcQuantityPath, String(newFileNumberValue));

        return response.status(200).json({mensagem: `O resultado da sua operação é ${result}`});
      } else {
        fs.writeFileSync(fileWithCalcQuantityPath, "1");

        return response.status(200).json({mensagem: `O resultado da sua operação é ${result}`});
      }
    }
  }
}

module.exports = CalculateService;