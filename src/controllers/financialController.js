import jwt from "jsonwebtoken";
import connection from "../database.js";
import * as financialRepository from "../repositories/financialRepository.js";
import * as financialService from "../services/financialService.js";
async function postFinancialEvent(req, res) {
  try {
    const { value, type } = req.body;
    const user = req.locals;
    if (!value || !type) {
      return res.sendStatus(400);
    }

    if (!["INCOME", "OUTCOME"].includes(type)) {
      return res.sendStatus(400);
    }

    if (value < 0) {
      return res.sendStatus(400);
    }

    financialRepository.insertFinancialEvent({ id: user.id, value, type });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getFinancialEvents(req, res) {
  try {
    const user = req.locals;

    const events = await financialRepository.selectFinancialEvents({
      id: user.id,
    });

    res.send(events);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getFinancialEventsSum(req, res) {
  try {
    const user = req.locals;

    const sum = await financialService.financialSum({ id: user.id });

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export { postFinancialEvent, getFinancialEvents, getFinancialEventsSum };
