import * as S from "./style";

function SkeletonList() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, idx) => (
        <S.Container key={idx}>
          <S.Name />
          <S.Desc />
          <S.Info>
            <S.Issue />
            <S.Date />
          </S.Info>
        </S.Container>
      ))}
    </div>
  );
}

export default SkeletonList;
