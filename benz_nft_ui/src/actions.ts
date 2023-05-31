
import { createAction } from "@reduxjs/toolkit";

export const walletConnected = createAction("user/walletConnected");
export const authenticated = createAction("user/authenticated");
export const userNftFetched = createAction("user/userNftFetched");