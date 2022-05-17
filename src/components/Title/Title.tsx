import * as S from "./style";

type TitleProps = {
  title: string;
  description: string;
};

function Title({ title, description }: TitleProps) {
  return (
    <header>
      <S.Heading>{title}</S.Heading>
      <S.Description>{description}</S.Description>
    </header>
  );
}

export default Title;
