import LottoTicket from "./LottoTicket.js";

class LottoTicketFactory {
  static create(lottoInfo) {
    return new LottoTicket(lottoInfo);
  }
}

export default LottoTicketFactory;
