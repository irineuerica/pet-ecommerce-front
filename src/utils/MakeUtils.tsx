export const MaskUtils = {
  format(value: string, pattern: string) {
    let values;

    if (value === undefined || value === null) {
      return value;
    }

    const output = [];

    if (pattern === '$') {
      const val = Math.abs(Number(String(Number(value).toFixed(2)).replace(/(?!^-)[^0-9]/g, '')));

      values = val.toString().split('').reverse();

      const len = values.length > 2 ? values.length : 3;

      for (let c = 0; c < len; c++) {
        const thousand = c - 2;

        if (c === 2) {
          output.push(',');
        } else if (thousand > 0 && thousand % 3 === 0) {
          output.push('.');
        }

        if (c in values) {
          output.push(values[c]);
        } else {
          output.push('0');
        }
      }

      return `${output.reverse().join('')}`;
    }

    values = value
      .toString()
      .replace(/(?!^-)[^0-9]/g, '')
      .split('');

    const chars = pattern.split('');

    for (let i = 0; i < chars.length; i++) {
      if (i > values.length - 1) {
        break;
      }

      if (values[i].match(/[0-9]/) && chars[i] === '9') {
        output.push(values[i]);

        continue;
      }

      output.push(chars[i]);

      values.reverse().push('-');

      values.reverse();
    }

    return output.join('');
  },
};

export const emailMask = (email: string) => {
  const maskedEmail: string[] = email.replace(/([^@.])/g, '*').split('');
  let previous = '';

  for (let i = 0; i < maskedEmail.length; i++) {
    if (i <= 1 || previous === '.' || previous === '@') {
      maskedEmail[i] = email[i];
    }
    previous = email[i];
  }
  return maskedEmail.join('');
};

export const phoneMask = (phoneNumber: string) => {
  const celularComMascara = MaskUtils.format(phoneNumber, '(99) 9 9999 9999');
  const dddNumeroCelular = celularComMascara.slice(0, 5);

  const numeroDeCelularNormalizado = `${dddNumeroCelular} * **** ${celularComMascara.slice(11, 16)}`;

  return numeroDeCelularNormalizado;
};
