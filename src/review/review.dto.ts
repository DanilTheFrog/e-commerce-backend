import { IsNumber, IsString, Length, Max, Min } from "class-validator";

export class ReviewDto {

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    @IsString()
    @Length(0, 400)
    text: string
}