import serverRequests from '../model/appModel';
import { IWord, IUserWord, IStatistic } from '../types/interface';

const saveUserWord = async (userString: string, word: IWord, wrong: boolean, typeGame: string)
:Promise<void> => {
  let wordCorrect: number;
  let wordWrong: number;
  let wordCount: number;

  const wordID = word._id ? word._id : word.id;

  const userStatistics: IStatistic = await JSON.parse(localStorage.getItem('statistic') as string);
  const date = await new Date();
  const day = await date.getDate();
  const user = await JSON.parse(userString);

  if (user) {
    const userWord = await serverRequests.getUserWord(user.userId, wordID, user.token)
      .catch(() => 'error');
    const resultWord = userWord as IUserWord;

    if (userWord !== 'error') {
      const percentBetweenCorrectAndWrong = resultWord.optional.wrong !== 0
        ? Math.round(
          100 - ((resultWord.optional.wrong / (resultWord.optional.correct + 1)) * 100),
        ) : 100;
      if (wrong) {
        if (typeGame === 'sprint') {
          userStatistics.optional[day].sprintGame.wrong += 1;
        }
        if (typeGame === 'audio') {
          userStatistics.optional[day].audioGame.wrong += 1;
        }
        localStorage.setItem('statistic', JSON.stringify(userStatistics));
        wordCount = resultWord.optional.count + 1;
        wordWrong = resultWord.optional.wrong + 1;
        wordCorrect = resultWord.optional.correct;

        if (resultWord.difficulty === 'easy') {
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'normal',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        } else if (resultWord.difficulty === 'hard') {
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'hard',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        } else {
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'normal',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        }
      } else {
        if (typeGame === 'sprint') {
          userStatistics.optional[day].sprintGame.correct += 1;
        }
        if (typeGame === 'audio') {
          userStatistics.optional[day].audioGame.correct += 1;
        }
        localStorage.setItem('statistic', JSON.stringify(userStatistics));
        wordCount = resultWord.optional.count + 1;
        wordWrong = resultWord.optional.wrong;
        wordCorrect = resultWord.optional.correct + 1;

        if (percentBetweenCorrectAndWrong > 80
        && (resultWord.optional.correct + 1) >= 3
        && (resultWord.difficulty === 'normal')) {
          userStatistics.optional[day].learnedWordsDay.learned += 1;
          localStorage.setItem('statistic', JSON.stringify(userStatistics));
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'easy',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        } else if (percentBetweenCorrectAndWrong > 80
        && (resultWord.optional.correct + 1) >= 3
        && (resultWord.difficulty === 'easy')) {
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'easy',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        } else if (percentBetweenCorrectAndWrong > 80
        && (resultWord.optional.correct + 1) >= 5
        && (resultWord.difficulty === 'hard')) {
          userStatistics.optional[day].learnedWordsDay.learned += 1;
          localStorage.setItem('statistic', JSON.stringify(userStatistics));
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'easy',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        } else if ((percentBetweenCorrectAndWrong > 80 || resultWord.optional.wrong === 0)
          && (resultWord.optional.correct + 1) < 5
          && (resultWord.difficulty === 'hard')) {
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'hard',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        } else if ((percentBetweenCorrectAndWrong < 80 || resultWord.optional.wrong === 0)
          && (resultWord.optional.correct + 1) < 3
          && (resultWord.difficulty === 'normal')) {
          await serverRequests.updateUserWord(user.userId, wordID, user.token, {
            difficulty: 'normal',
            optional: {
              count: wordCount,
              wrong: wordWrong,
              correct: wordCorrect,
            },
          });
        }
      }
    } else {
      userStatistics.learnedWords += 1;

      if (typeGame === 'sprint') {
        userStatistics.optional[day].sprintGame.newWord += 1;
      }
      if (typeGame === 'audio') {
        userStatistics.optional[day].audioGame.newWord += 1;
      }
      localStorage.setItem('statistic', JSON.stringify(userStatistics));
      if (wrong) {
        if (typeGame === 'sprint') {
          userStatistics.optional[day].sprintGame.wrong += 1;
        }
        if (typeGame === 'audio') {
          userStatistics.optional[day].audioGame.wrong += 1;
        }
        localStorage.setItem('statistic', JSON.stringify(userStatistics));
        await serverRequests.createUserWord(user.userId, user.token, wordID, {
          difficulty: 'normal',
          optional: {
            count: 1,
            wrong: 1,
            correct: 0,
          },
        });
      } else {
        if (typeGame === 'sprint') {
          userStatistics.optional[day].sprintGame.correct += 1;
        }
        if (typeGame === 'audio') {
          userStatistics.optional[day].audioGame.correct += 1;
        }
        localStorage.setItem('statistic', JSON.stringify(userStatistics));
        await serverRequests.createUserWord(user.userId, user.token, wordID, {
          difficulty: 'normal',
          optional: {
            count: 1,
            wrong: 0,
            correct: 1,
          },
        });
      }
    }
  }
};

export default saveUserWord;
