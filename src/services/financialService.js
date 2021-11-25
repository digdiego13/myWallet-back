import jwt from "jsonwebtoken";
import connection from "../database.js";
import * as financialRepository from "../repositories/financialRepository.js";

async function financialSum({ id }) {
  const events = await financialRepository.selectFinancialEvents({ id });

  const sum = events.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );

  return sum;
}

export { financialSum };
