import { distance } from "fastest-levenshtein";

import { IProject } from "../interfaces";

const MINIMUM_SCORE = 2.5;

interface ICalculatedWordsRatios {
  [word: string]: number;
}

interface IScores {
  [id: number]: number;
}

const compareWithSentence = (
  sentence: string,
  calculatedWordsRatios: ICalculatedWordsRatios,
  term: string
): number[] => {
  const words = sentence.split(" ");

  return words.map((item) => {
    const word = item.toLowerCase();

    if (calculatedWordsRatios[word]) {
      return calculatedWordsRatios[word];
    }

    if (term.length < word.length && word.startsWith(term)) {
      return (calculatedWordsRatios[word] = 1 / MINIMUM_SCORE);
    }

    if (Math.abs(term.length - word.length) > 2) {
      return (calculatedWordsRatios[word] = 1000);
    }

    return (calculatedWordsRatios[word] = distance(term, word) / term.length);
  });
};

const calculateScore = (distancesRatios: number[]) => {
  return distancesRatios.reduce(
    (acc, distanceRatio) => {
      let itemScore: number;
      if (distanceRatio === 0) {
        itemScore = 100;
      } else {
        itemScore = 1 / distanceRatio;
      }

      if (itemScore >= MINIMUM_SCORE) {
        return {
          score: acc.score + itemScore,
          shouldInclude: true,
        };
      }

      return acc;
    },
    { shouldInclude: false, score: 0 }
  );
};

const findMatchingProjectsForTerm = (
  projects: IProject[],
  term: string
): IScores => {
  const currentTerm = term.trim().toLowerCase();
  const calculatedWordsRatios: ICalculatedWordsRatios = {};

  return projects.reduce((acc, project) => {
    const projectName = project.name.toLowerCase();

    const distancesRatios = compareWithSentence(
      `${projectName} ${project.description}`,
      calculatedWordsRatios,
      currentTerm
    );
    const { score, shouldInclude } = calculateScore(distancesRatios);

    if (shouldInclude) {
      return {
        ...acc,
        [project.id]: score,
      };
    }

    return acc;
  }, {});
};

export const findMatchingProjects = (
  projects: IProject[],
  searchTerm: string
) => {
  const terms = searchTerm.trim().toLowerCase().split(" ");

  const allScores = terms.map((term) =>
    findMatchingProjectsForTerm(projects, term)
  );
  const totalScores = allScores.reduce((acc, scores) => {
    Object.keys(scores).forEach((key) => {
      const id = Number(key);

      acc[id] = acc[id] ? acc[id] + scores[id] : scores[id];
    });

    return acc;
  });

  return projects
    .filter((project) => totalScores[project.id])
    .sort(
      (a: IProject, b: IProject) => (totalScores[a.id] - totalScores[b.id]) * -1
    );
};
