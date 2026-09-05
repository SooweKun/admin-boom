export class CreateCardDto {
  ico: string;
  name: string;
  desc: string;
  bonus: number;
  link: string;
  margin: number;
  percent: number;
  advantages: string[];
}

export class UpdateCardDto {
  ico?: string;
  name?: string;
  desc?: string;
  bonus?: number;
  link?: string;
  margin?: number;
  percent?: number;
  advantages?: string[];
}
