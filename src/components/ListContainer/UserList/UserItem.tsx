import { User } from "api";
import React, { forwardRef } from "react";
import { BiBuildings } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

import * as S from "./UserItem.style";

type UserItemProps = {
  user: User | null;
};

const UserItem = forwardRef<HTMLLIElement, UserItemProps>(({ user }, ref) => {
  const isTooLong = (user?.company?.length && user?.company?.length > 20) || false;

  return (
    <S.Container ref={ref}>
      <a href={`https://github.com/${user?.login}`} target="_blank" rel="noreferrer noopener">
        <S.ImageWrapper>
          <img src={user?.avatarUrl} alt="Avatar" />
        </S.ImageWrapper>
        <S.Info>
          <h2>
            {user?.login}
            {user?.name && <span> ({user?.name})</span>}
          </h2>
          <p>{user?.bio}</p>
          <S.InfoList isFlexColumn={isTooLong}>
            {user?.company && (
              <li>
                <BiBuildings size={18} />
                {user?.company}
              </li>
            )}
            {user?.location && (
              <li>
                <GoLocation size={16} />
                {user?.location}
              </li>
            )}
          </S.InfoList>
        </S.Info>
      </a>
    </S.Container>
  );
});

export default UserItem;
