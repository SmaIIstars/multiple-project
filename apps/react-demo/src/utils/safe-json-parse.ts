export default (
  text: string,
  errCallback: (err: any, ...args: any[]) => any = (err) => {
    throw new Error(err);
  }
) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return errCallback(err);
  }
};
