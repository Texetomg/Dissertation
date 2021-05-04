import * as tf from '@tensorflow/tfjs'

export const makePredictions = (X, model) => {
  const predictedResults = model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))).mul(10)

  return Array.from(predictedResults.dataSync())
}
