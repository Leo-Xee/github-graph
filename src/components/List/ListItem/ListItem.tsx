import { Repo } from "api";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import * as S from "./style";

dayjs().format();
dayjs.locale("ko");
dayjs.extend(relativeTime);

type ListItemProps = {
  repo: Repo;
};

function ListItem({ repo }: ListItemProps) {
  return (
    <Link href={`/${repo.full_name}/issues`}>
      <S.Article>
        <S.Name>{repo.full_name}</S.Name>
        <S.Description>{repo.description}</S.Description>
        <S.Info>
          <span>{`${repo.open_issues_count} issues `}</span>
          <span>{dayjs(repo.updated_at).fromNow()}</span>
        </S.Info>
      </S.Article>
    </Link>
  );
}

export default ListItem;
