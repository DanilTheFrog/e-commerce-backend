import { IsEmail, IsString, MinLength } from "class-validator";


export class AuthDto {

    @IsEmail()
    email: string;

    @MinLength(8, {
        message: "Minimum 8 chars required"
    })
    @IsString()
    password: string;
}