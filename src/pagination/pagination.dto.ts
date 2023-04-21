import { IsOptional, IsString } from "class-validator"

export class PaginationDto {

    @IsOptional()
    page: string
    
    
    @IsOptional()
    perPage: string
}

export class OrderByWithPagination {

    @IsOptional()
    @IsString()
    orderBy?: 'desk' | 'ask'
}