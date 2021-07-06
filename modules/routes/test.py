
/* const a = tf.tensor([[1, 2], [3, 4]]);
 // Returns the multi dimensional array of values.
 a.array().then(array => console.log(array));
 // Returns the flattened data that backs the tensor.
 a.data().then(data => console.log(data));*/

/*const x = tf.tensor([1, 2, 3, 4]);
const y = x.square();  // equivalent to tf.square(x)
y.print();*/
/*
const a = tf.tensor([1, 2, 3, 4]);
const b = tf.tensor([10, 20, 30, 40]);
const y = a.add(b);  // equivalent to tf.add(a, b)
y.print();*/

// Create an arbitrary graph of layers, by connecting them
// via the apply() method.

/////Le modèle séquentiel
/*const model = tf.sequential({
 layers: [
   tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
   tf.layers.dense({units: 10, activation: 'softmax'}),
 ]
});*/



////Le modèle fonctionnel
// const input = tf.input({shape: [784]});
// const dense1 = tf.layers.dense({units: 32, activation: 'relu'}).apply(input);
// const dense2 = tf.layers.dense({units: 10, activation: 'softmax'}).apply(dense1);
// const model = tf.model({inputs: input, outputs: dense2});


// (async () => {
// 	const saveResult = await model.save('file://opt/nodejs/translator/data/tfjs/translation_en_fr_v1');

// 	//
// 	//const downloadedResult = await model.save('downloads://my-model');

//     // all of the script.... 

// })();
// //const model = await tf.loadLayersModel('localstorage://my-model-1');




const model = tf.sequential({
 layers: [
   tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
   tf.layers.dense({units: 10, activation: 'softmax'}),
 ]
});
model.compile({
  optimizer: 'sgd',
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy']
});

// Generate dummy data.
const data = tf.randomNormal([100, 784]);
const labels = tf.randomUniform([100, 10]);

function onBatchEnd(batch, logs) {
  //console.log('Accuracy', logs.acc);
}

// Train for 5 epochs with batch size of 32.
model.fit(data, labels, {
   epochs: 5,
   batchSize: 32,
   callbacks: {onBatchEnd}
 }).then(info => {
   //console.log('Final accuracy', info.history.acc);
 });

 const prediction = model.predict(tf.randomNormal([3, 784]));
//prediction.print();







# Python code to demonstrate
# checking of element existence
# using loops and in
 
# Initializing list
test_list = [ 'bonjouroo', 'cava', 'ceci', 'labas' ]

# max_encoder_seq_length = max([len(txt) for txt in input_texts])
print(max([len(i) for i in test_list]))


#test 2
input_characters = "rien, de ne pourra enerver!"
input_characters = sorted(list(input_characters))
num_encoder_tokens = len(input_characters)
print("Number of unique input tokens:", num_encoder_tokens)


input_token_index = dict([(char, i) for i, char in enumerate(input_characters)])
print(input_token_index)


