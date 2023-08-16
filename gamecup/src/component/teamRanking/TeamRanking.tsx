import { useEffect, useState } from "react";
import User from "../../model/User";
import Team from "../../model/teams/Team";

interface Props {
  teams: Team[];
  points: number[];
}

enum SortType {
  ASC,
  DESC,
  NORMAL
};

const sort2arrays = (
  arr1: any[], arr2: any[],
  compare: (a: any, b: any) => number
) => {
  console.debug("sort2arrays: start", arr1, arr2);
  const swap = (arr: any[], i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };
  for (let i = 0; i < arr1.length; i++) { // TODO use better sorting algorithm
    let min = i;
    for (let j = i + 1; j < arr1.length; j++) {
      if (compare(arr1[j], arr1[min]) < 0) {
        min = j;
      }
    }
    swap(arr1, i, min);
    swap(arr2, i, min);
  }
  console.debug("sort2arrays: sorted", arr1, arr2);
}

const TeamRanking = ({teams, points}: Props) => {
  const [sorting, setSorting] = useState<SortType>(SortType.DESC);
  const [sortedTeams, setSortedTeams] = useState<Team[]>(teams);
  const [sortedPoints, setSortedPoints] = useState<number[]>(points);
  
  useEffect(() => {
    switch (sorting) {
      case SortType.ASC:
        sort2arrays(points, teams, (a, b) => a - b);
        break;
      case SortType.DESC:
        sort2arrays(points, teams, (a, b) => b - a);
        break;
      case SortType.NORMAL:
        break;
    }
    setSortedTeams([...teams]);
    setSortedPoints([...points]);
  }, [sorting, points]);


  let listHtml: JSX.Element[] = [];
  for (let i = 0; i < sortedTeams.length; i++) {
    const team = sortedTeams[i];
    const pts = sortedPoints[i];
    listHtml.push(
      <div key={i} className="card p-3">
        <div className="row">
          <h4 className="col col-8">{team.getName()}</h4>
          <h4 className="col text-end">
            {pts}
          </h4>
        </div>
        <div className="row">
          {team.getPlayers().map((user: User, idx) =>
            <div key={idx} className="col">
              {user.getName()}
            </div>
          )}
        </div>
      </div>
    );
  }
  return <>
    <div className="form-floating">
      <select className="form-select" id="teamRankingOrder"
        value={sorting}
        onChange={(e) => setSorting(parseInt(e.target.value))}
      >
        <option value={SortType.DESC}>High first</option>
        <option value={SortType.ASC}>Low first</option>
        <option value={SortType.NORMAL}>No order</option>
      </select>
      <label htmlFor="teamRankingOrder">Ranking type</label>
    </div>
    <div className="card p-3 gap-4" style={{marginTop: "15px", maxHeight: '50vh', overflowX: 'scroll'}}>
      {listHtml}
    </div>
  </>;
};

export default TeamRanking;