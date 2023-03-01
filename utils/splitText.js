export const splitText = (text, getIndex) => {
  const texts = text.split(" ");

  let orderText = " ";
  texts.filter((element, idx) => {
    if (idx !== getIndex) {
      orderText += element + " ";
    }
  });

  return { result: texts[getIndex], orderText };
};
