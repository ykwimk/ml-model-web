export const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (result && typeof result === 'string') {
        resolve(result.split(',')[1]);
      } else {
        reject(new Error('FileReader error'));
      }
    };

    reader.onerror = () => {
      reject(new Error('FileReader failed'));
    };

    reader.readAsDataURL(file);
  });
};
