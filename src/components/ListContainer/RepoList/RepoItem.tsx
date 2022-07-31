import React, { forwardRef } from "react";
import { TbGitFork, TbStar } from "react-icons/tb";

import { Repo } from "api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as S from "./RepoItem.style";
import "dayjs/locale/ko";

dayjs().format();
dayjs.locale("ko");
dayjs.extend(relativeTime);

type RepoItemProps = {
  repo: Repo | null;
};

const RepoItem = forwardRef<HTMLLIElement, RepoItemProps>(({ repo }, ref) => {
  const { username } = useParams();

  return (
    <S.Container ref={ref}>
      <a
        href={`https://github.com/${username}/${repo?.name}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <S.Info>
          <h2>{repo?.name}</h2>
          <p>{repo?.description}</p>
        </S.Info>
        <S.InfoList>
          {repo?.primaryLanguage && (
            <S.InfoItem>
              {repo?.primaryLanguage?.color && (
                <S.LanguageColor color={repo?.primaryLanguage?.color} />
              )}
              <span>{repo?.primaryLanguage?.name}</span>
            </S.InfoItem>
          )}
          {repo?.stargazerCount !== 0 && (
            <S.InfoItem>
              <TbStar size={15} />
              <span>{repo?.stargazerCount}</span>
            </S.InfoItem>
          )}
          {repo?.forkCount !== 0 && (
            <S.InfoItem>
              <TbGitFork size={15} />
              <span>{repo?.forkCount}</span>
            </S.InfoItem>
          )}
          {repo?.pushedAt && <S.InfoItem>{dayjs(repo?.pushedAt).fromNow()}에 수정됨</S.InfoItem>}
          {repo?.updatedAt && <S.InfoItem>{dayjs(repo?.updatedAt).fromNow()}에 수정됨</S.InfoItem>}
        </S.InfoList>
      </a>
    </S.Container>
  );
});

export default RepoItem;
