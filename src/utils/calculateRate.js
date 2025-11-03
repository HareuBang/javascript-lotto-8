const calculateRate = (lottoTicket, winningResult) => {
  const amount = lottoTicket.getAmount();
  const winning = winningResult.filter((result) => result.count > 0);

  const totalWinningAmount = winning.reduce(
    (result, { prize, count }) => result + prize * count,
    0
  );

  const rate = ((totalWinningAmount / amount) * 100).toFixed(2);

  return parseFloat(rate);
};

export default calculateRate;
