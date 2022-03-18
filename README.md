# dotenv-ajv

[![npm version](https://badge.fury.io/js/dotenv-ajv.svg)](https://badge.fury.io/js/dotenv-ajv)
[![npm downloads](https://badgen.net/npm/dt/dotenv-ajv)](https://badgen.net/npm/dt/dotenv-ajv)

dotenv-ajv is a JS/TS library use to load and validate your env files using JSON schema 

## Installation
`npm i dotenv-ajv`

## Usage

First create a `.env` file
```dosini
NODE_ENV=development
TOKEN=yourapptoken
```

Next create JSON schema using [typebox](https://github.com/sinclairzx81/typebox) in a `env.type.ts` file

```typescript
import {Static, Type} from "@sinclair/typebox"; // `npm i @sinclair/typebox` is required

export enum NodeEnv {
    dev= 'development',
    prod = 'production',
    staging = 'staging'
}

export const EnvSchema = Type.Object({
    NODE_ENV: Type.Enum(NodeEnv, {
        default: NodeEnv.dev
    }),
    PORT: Type.String({
        default: '3000'
    }),
    TOKEN: Type.String()
});

export type EnvType = Static<typeof EnvSchema>;

// Create this function if you want auto-complete
export function ENV(): EnvType {
    return process.env as EnvType;
}
```

Finally, in the `index.ts` load and validate your env file

```typescript
import {loadAndValidateEnv} from "dotenv-ajv";
import {EnvSchema, ENV} from "./env.type.ts";

loadAndValidateEnv(EnvSchema); // Throws an error if your .env file isn't valid

// Now you can use the ENV function
console.log(ENV().PORT); // 3000
console.log(ENV().NODE_ENV); // development
console.log(ENV().TOKEN); // yourapptoken
```
