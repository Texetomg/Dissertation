export const computeSma = (data, windowSize) => {
  let r_avgs = []

  for (let i = 0; i <= data.prices.length - windowSize; i+=windowSize){
    let curr_avg = 0.00
    let t = i + windowSize
    for (let k = i; k < t && k <= data.prices.length; k++){
      curr_avg += data.prices[k] / windowSize
    }

    r_avgs.push({ set: data.prices.slice(i, i + windowSize), avg: curr_avg, timestamp: data.timesstamps[i] })
  }
console.log(data, r_avgs)
  return r_avgs;
}