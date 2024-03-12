export default defineEventHandler((event) => {
  console.log(doTheMath(1, 2));
  return "<h1>Hi from the new route</h1>";
});
