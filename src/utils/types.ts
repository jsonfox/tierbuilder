import React from "react";
import rand from 'randexp'
import RandExp from "randexp";
// import { z } from "zod"

export type InputEvent = MouseEvent | TouchEvent | KeyboardEvent;
export type StateFunc = React.Dispatch<React.SetStateAction<boolean>>;
export type AnyFunc = (...args: any[]) => any;
export type Ref = React.RefObject<any>;
export type Nodes = JSX.Element | JSX.Element[];
export type TbItem = { imageUrl: string, key: string };
export type TbRow = { name: string, color: string, items: TbItem[] };
export const createItem = (imageUrl: string): TbItem => ({ imageUrl, key: new RandExp(/\w{5}/i).gen() });
export const createRow = (name: string, color: string, items: TbItem[] = []): TbRow => ({ name, color, items });

// Schema validation
// export const EncodedSchema = z.object({

// })