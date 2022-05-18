import { Repo, RepoList } from "api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

/**
 * 키워드로 레포지토리 리스트 조회
 */

const getRepoListByKeyword = async (keyword: string, pageNumber = 1): Promise<RepoList> => {
  try {
    if (keyword) {
      const res = await axios.get<RepoList>(
        `https://api.github.com/search/repositories?q=${keyword}&page=${pageNumber}`,
      );
      return res.data;
    }
    throw new Error("키워드 없음");
  } catch {
    throw new Error("에러 발생");
  }
};

const useFetchRepoList = (keyword: string, pageNumber: number): UseQueryResult<Repo[]> => {
  return useQuery<RepoList, AxiosError<AxiosResponse>, Repo[]>(
    ["keyword", keyword],
    () => getRepoListByKeyword(keyword, pageNumber),
    {
      enabled: !!keyword,
      select: (data) => data?.items.filter((item) => item.open_issues_count),
    },
  );
};

export default useFetchRepoList;
