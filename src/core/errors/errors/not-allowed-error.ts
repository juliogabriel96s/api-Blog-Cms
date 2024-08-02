import { UseCaseError } from "../use-case-error";

export class NotAllowedError extends Error implements UseCaseError{
    constructor(){
        super("Not allowed error.")
        this.name = "Not allowed error."
    }
}