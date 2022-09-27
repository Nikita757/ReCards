import joi from "joi";

export const usernameSchema = joi.string().pattern(/^[A-Za-z][A-Za-z0-9_]{4,20}$/);
export const passwordSchema = joi.string().pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{7,20}$/);
export const emailSchema = joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
