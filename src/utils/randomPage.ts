const randomPage = (): number => {
  const maxPage = 29;
  return Math.floor(Math.random() * maxPage);
};

export default randomPage;
