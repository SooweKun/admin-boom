export class CreateCardDto {
  ico: string;
  name: string;
  desc: string;
  bonus: number;
  link: string;
  margin: number;
  percent: number;
  /** Виден ли букмекер в приложении. Если не передан — карточка создаётся видимой. */
  isVisible?: boolean;
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
  isVisible?: boolean;
  advantages?: string[];
}
