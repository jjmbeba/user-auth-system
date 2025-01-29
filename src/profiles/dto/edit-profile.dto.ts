import { IsOptional, IsString } from "class-validator";

export class EditProfileDto {
    @IsString()
    @IsOptional()
    bio?:string;

    @IsString()
    @IsOptional()
    image?:string;
}