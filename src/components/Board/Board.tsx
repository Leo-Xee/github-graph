import React, { useEffect } from "react";
import { GoLocation } from "react-icons/go";
import { BiBuildings } from "react-icons/bi";
import { AiOutlineMail, AiOutlineLink } from "react-icons/ai";
import { useGetUserLazyQuery } from "@/graphql/generated";

import * as S from "./Board.style";

type BoardProps = {
  username: string;
};

function Board({ username }: BoardProps) {
  const [getUser, { data, loading }] = useGetUserLazyQuery({ variables: { username } });

  useEffect(() => {
    if (username) {
      getUser();
      console.log("fetch");
    }
  }, [username]);

  console.log(username, data);

  return (
    <S.Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <S.Profile>
            <S.ImageWrapper>
              <img src={data?.user?.avatarUrl} alt="Avatar" />
            </S.ImageWrapper>
            <S.Info>
              <h1>
                {data?.user?.login}
                <span> ({data?.user?.name})</span>
              </h1>
              <ul>
                {data?.user?.company && (
                  <li>
                    <BiBuildings size={18} />
                    <p>{data?.user?.company}</p>
                  </li>
                )}
                {data?.user?.location && (
                  <li>
                    <GoLocation size={16} />
                    <p>{data?.user?.location}</p>
                  </li>
                )}
                {data?.user?.email && (
                  <li>
                    <AiOutlineMail size={16} />
                    <a href={`mailto:${data?.user?.email}`}>{data?.user?.email}</a>
                  </li>
                )}
                {data?.user?.websiteUrl && (
                  <li>
                    <AiOutlineLink size={16} />
                    <a href={data?.user?.websiteUrl} target="_blank" rel="noreferrer noopener">
                      {data?.user?.websiteUrl}
                    </a>
                  </li>
                )}
              </ul>
            </S.Info>
          </S.Profile>
          <div>Tab</div>
        </div>
      )}
    </S.Container>
  );
}

export default Board;
