import {
  IsNotEmpty,
  IsString,
  Length,
  IsDecimal,
  IsUUID,
} from 'class-validator';

export class CreateProductDTO {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  @IsDecimal({}, { message: 'Price must be a valid decimal number' })
  price: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 5000)
  description: string;
}
