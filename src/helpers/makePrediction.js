import * as tf from '@tensorflow/tfjs'
import { normalizeTensor, unNormalizeTensor } from './trainModel'

export const makePredictions = (X, model, dict_normalize) => {
/*   const predictedResults = model.predict(tf.tensor2d(X, [X.length, X[0].length]).div(tf.scalar(10))).mul(10)

  return Array.from(predictedResults.dataSync()) */

  X = tf.tensor2d(X, [X.length, X[0].length]);
  const normalizedInput = normalizeTensor(X, dict_normalize["inputMax"], dict_normalize["inputMin"]);
  const model_out = model.predict(normalizedInput);
  const predictedResults = unNormalizeTensor(model_out, dict_normalize["labelMax"], dict_normalize["labelMin"]);

  return Array.from(predictedResults.dataSync());
}

