import { Client } from "colyseus.js";
import { ENDPOINT } from "../config/network";

export const colyseus = new Client(ENDPOINT);
