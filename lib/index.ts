import {config, DotenvConfigOptions} from "dotenv";
import Ajv, {Options, SchemaObject} from "ajv";

export function validateEnv(jsonSchema: SchemaObject, ajvOptions: Options = defaultTypeBoxAjvOptions): void {
    const ajv = new Ajv(ajvOptions);
    if(!ajv.validate(jsonSchema, process.env)) {
        let errorMsg = [`Your env file didn't pass the validation: ${ajv.errorsText()}`];
        const required = jsonSchema['required'];
        if(required && required.length) {
            errorMsg.push(`All required properties are: ${required}`);
        }
        throw new Error(errorMsg.join('\n'));
    }
}

export function loadAndValidateEnv(jsonSchema: SchemaObject, dotenvOptions?: DotenvConfigOptions, ajvOptions?: Options): void {
    config(dotenvOptions);
    validateEnv(jsonSchema, ajvOptions);
}

export const defaultTypeBoxAjvOptions: Options = {
    useDefaults: true,
    keywords: [
        'kind',
        'modifier'
    ]
};
