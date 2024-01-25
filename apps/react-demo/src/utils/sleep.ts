export default (delay: number) => {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
};
