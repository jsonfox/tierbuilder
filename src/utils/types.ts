import React from "react";
import { z } from "zod"

export type InputEvent = MouseEvent | TouchEvent | KeyboardEvent;
export type StateFunc = React.Dispatch<React.SetStateAction<boolean>>;
export type AnyFunc = (...args: any[]) => any;
export type Ref = React.RefObject<any>;
export type Nodes = JSX.Element | JSX.Element[];
export type TbItem = { imageUrl: string, name: string };
export type TbRow = { name: string, color: string, items: TbItem[] };
export const createItem = (imageUrl: string, name: string = 'Item'): TbItem => ({ imageUrl, name });
export const createRow = (name: string, color: string, items: TbItem[] = []): TbRow => ({ name, color, items });

// Schema validation
// export const EncodedSchema = z.object({

// })