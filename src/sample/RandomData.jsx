function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function createData(priceNow) {
  const side = (Math.random()>0.5) ? 'خرید': 'فروش';
  const price = priceNow * (1+(Math.random()-0.5)/2);
  const amount = parseInt(Math.random() * 1000)/10;
  const date = randomDate()
  const cost = price * amount;
  return {
    date, side, price, amount, cost,
  };
}

export default function RandomData(priceNow,count){
  const data = [];

  for (let i = 1; i < count; i++){
    data.push(createData(priceNow))
  }

  return data;
};