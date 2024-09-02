// The purpose of this is to get rid of try and catch blocks
// As I find them not pleasing to look at
// instead of
// try{
// 	await operation()
// } catch(error){
// 	console.log(error)
// }
//
// It turns to
// const [error, data] = await on(operation())
// console.log(error)
//
// Much cleaner

const on = (promise) => {
	return promise.then((data) => [null, data]).catch((err) => [err]);
};

export default on;
