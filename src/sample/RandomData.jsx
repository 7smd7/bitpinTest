function randomDate(start = new Date(2012, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function createData(id) {
  const side = (Math.random()>0.5) ? 'خرید': 'فروش';
  const price = Math.random() * 100;
  const amount = Math.random() * 100;
  const date = randomDate()
  const cost = price * amount;
  return {
    id, date, side, price, amount, cost,
  };
}

export default function RandomData(id,count){
  const data = [];

  for (let i = 1; i < count; i++){
    data.push(createData(id))
  }

  return data;
};